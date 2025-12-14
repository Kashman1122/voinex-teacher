// "use client"

// import { useEffect } from "react"
// import { useRouter, usePathname } from "next/navigation"

// export default function Home() {
//   const router = useRouter()
//   const pathname = usePathname()

//   useEffect(() => {
//     if (pathname !== "/") return

//     const redirect = async () => {
//       try {
//         const token = localStorage.getItem("authToken")
//         const targetRoute = token ? "/dashboard" : "/login"
        
//         console.log("[Home] Token exists:", !!token)
//         console.log("[Home] Redirecting to:", targetRoute)
        
//         await router.push(targetRoute)
//       } catch (error) {
//         console.error("[Home] Navigation error:", error)
//         window.location.href = "/login"
//       }
//     }

//     redirect()
//   }, [router, pathname])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center p-4">
//       <div className="text-center">
//         <div className="flex justify-center mb-8">
//           <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center animate-pulse">
//             <div className="w-12 h-12 border-4 border-primary-foreground border-t-transparent rounded-full animate-spin" />
//           </div>
//         </div>
//         <div className="space-y-2">
//           <h2 className="text-xl font-semibold text-foreground">Redirecting...</h2>
//           <p className="text-sm text-muted-foreground">Please wait</p>
//         </div>
//         <div className="flex justify-center gap-2 mt-6">
//           <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
//           <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
//           <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check for auth token
    const token = localStorage.getItem("authToken")
    
    // The middleware will handle the redirect, but we do it client-side too for faster UX
    if (token) {
      router.replace("/dashboard")
    } else {
      router.replace("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center animate-pulse">
            <div className="w-12 h-12 border-4 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">Loading...</h2>
          <p className="text-sm text-muted-foreground">Please wait</p>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}