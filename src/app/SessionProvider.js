"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { MotionDiv } from "@/utils/MotionDiv";
import { usePathname } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { toast } from 'sonner';

export function AuthProvider({ children, session }) {
    const pathname = usePathname();

    React.useEffect(() => {
        // Only run this effect in the browser
        if (typeof window !== 'undefined') {
            // Check if the toast has already been shown
            const hasToastShown = sessionStorage.getItem('toastShown');

            if (!hasToastShown && session?.user) {
                // Display the toast
                toast.success(`Welcome Back, ${session.user.name}! You are currently logged in. Enjoy your time with us.`);
                // Set the flag in sessionStorage
                sessionStorage.setItem('toastShown', 'true');
            }
        }
    }, [session]);

    return (
        <SessionProvider session={session}>
                <MotionDiv
                    key={pathname}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    // exit={{ opacity: 0, y: 0 }}
                    transition={{ delay: 0.25 }}
                >
                    <SkeletonTheme baseColor="#18181b" highlightColor="#1e1e24" borderRadius={"0.5rem"}>
                        {children}
                    </SkeletonTheme>
                    <ProgressBar
                        height="3px"
                        color="#CA1313"
                        options={{ showSpinner: true }}
                    // shallowRouting // by enabling this progressbar does not show on query params change
                    />
                </MotionDiv>
        </SessionProvider>
    );
}
