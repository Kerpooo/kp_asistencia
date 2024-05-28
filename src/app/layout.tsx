import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from '@clerk/nextjs'
import { esMX } from "@clerk/localizations"



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Kids Place App",
  description: "App Interna",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={esMX}>
      <html lang="es">
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased", inter.variable)}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
