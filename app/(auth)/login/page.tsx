"use client"

import type React from "react"

import { useState } from "react"
import { redirect, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()
     console.log(data ,'jdfsd ')
      if (!response.ok) {
        setError(data.error || "Login failed")
        return
      }

      // Store token and redirect to dashboard
      localStorage.setItem("authToken", data.token)
      localStorage.setItem("teacherData", JSON.stringify(data.teacher))
      localStorage.setItem("teacherCode", data.teacher?.teacherCode || data.teacher?.teacher_code || "")

      console.log("[v0] Stored teacher code:", localStorage.getItem("teacherCode"))
      // redirect('/')
      router.push("/")
      console.log(data,"harsh ")
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error("[v0] Login error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="https://www.voinex.in/static/vizcureot_real.png"
            alt="Logo"
            width={120}
            height={48}
            className="object-contain"
          />
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-center">Teacher Login</CardTitle>
            <CardDescription className="text-center">Sign in to access your school dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  disabled={loading}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  disabled={loading}
                  className="bg-input border-border"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Register here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}




// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl
//   const token = request.cookies.get('authToken')?.value
  
//   // Root redirect
//   if (pathname === '/') {
//     const destination = token ? '/dashboard' : '/login'
//     return NextResponse.redirect(new URL(destination, request.url))
//   }
  
//   // Protected routes
//   const protectedRoutes = ['/dashboard', '/profile', '/settings', '/ai-usage']
//   const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  
//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }
  
//   // Public routes (redirect to dashboard if logged in)
//   const publicRoutes = ['/login', '/register']
//   const isPublic = publicRoutes.some(route => pathname.startsWith(route))
  
//   if (isPublic && token) {
//     return NextResponse.redirect(new URL('/dashboard', request.url))
//   }
  
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// }import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl
//   const token = request.cookies.get('authToken')?.value
  
//   // Root redirect
//   if (pathname === '/') {
//     const destination = token ? '/dashboard' : '/login'
//     return NextResponse.redirect(new URL(destination, request.url))
//   }
  
//   // Protected routes
//   const protectedRoutes = ['/dashboard', '/profile', '/settings', '/ai-usage']
//   const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  
//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }
  
//   // Public routes (redirect to dashboard if logged in)
//   const publicRoutes = ['/login', '/register']
//   const isPublic = publicRoutes.some(route => pathname.startsWith(route))
  
//   if (isPublic && token) {
//     return NextResponse.redirect(new URL('/dashboard', request.url))
//   }
  
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// }