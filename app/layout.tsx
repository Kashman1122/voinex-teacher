import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/providers/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Comprehensive admin dashboard with projects, AI usage, and subscriptions",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "https://www.voinex.in/static/vizcureot_real.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://www.voinex.in/static/vizcureot_real.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "https://www.voinex.in/static/vizcureot_real.png",
        type: "image/svg+xml",
      },
    ],
    apple: "https://www.voinex.in/static/vizcureot_real.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
