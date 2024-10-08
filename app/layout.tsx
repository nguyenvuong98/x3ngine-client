'use client'
import "./globals.css";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { RoutePath } from "@/lib/router";

const publicRoutes = [
    RoutePath.LOGIN,
    RoutePath.REGISTER
  ]

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const pathName = usePathname()

    useEffect(() => {
        const accessToken = localStorage.getItem('access-token');

        if (!accessToken && !publicRoutes.includes(pathName as RoutePath)) {
          router.push(RoutePath.LOGIN); // Redirect to sign-in if not authenticated
        }

        if (accessToken && publicRoutes.includes(pathName as RoutePath)) {
          router.push(RoutePath.DASHBOARD); // Redirect to sign-in if not authenticated
        }
        console.log('pathName', pathName) }, 
    [pathName])
    return (
        <html lang="en">
            <body>
                {/* Layout UI */}
                <main>{children}</main>
            </body>
        </html>
    )
}