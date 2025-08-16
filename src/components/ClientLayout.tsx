'use client'

import { AppProvider } from "@/components/providers";
import { LazyErrorNotifications } from "@/components/ui/LazyErrorNotifications";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <AppProvider>
      <ErrorBoundary>
        {children}
        <LazyErrorNotifications />
      </ErrorBoundary>
    </AppProvider>
  );
}