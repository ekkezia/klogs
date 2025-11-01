import type { Metadata } from "next"
import { Kode_Mono, Syne_Mono } from "next/font/google"
import "./globals.css"
import Layout from "@/components/_ui/Layout"
import { MouseContextProvider } from "@/contexts/ mouse-context"
import { ThemeContextProvider } from "@/contexts/theme-context"
import { LogTitleContextProvider } from "@/contexts/log-title-context"

const bricolageGrotesque = Syne_Mono({
  display: "swap",
  preload: false,
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  weight: ["400"],
})

const monoton = Kode_Mono({
  display: "swap",
  preload: false,
  subsets: ["latin"],
  variable: "--font-monoton",
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "🗒️ klogs | @ekezia",
  description: "a log of coding projects concepted and created by Elizabeth Kezia Widjaja @ekezia",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${monoton.variable} ${bricolageGrotesque.variable}`}>
        <ThemeContextProvider>
          <MouseContextProvider>
            <LogTitleContextProvider>
              <Layout>{children}</Layout>
            </LogTitleContextProvider>
          </MouseContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  )
}
