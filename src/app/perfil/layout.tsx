import type { ReactNode } from "react";

import { AppBottomNav } from "@/components/app-bottom-nav";
import { PerfilSessionProvider } from "@/components/perfil/perfil-session-provider";

export default function PerfilLayout({ children }: { children: ReactNode }) {
  return (
    <PerfilSessionProvider>
      <div className="min-h-screen bg-white text-gray-900">
        {children}
        <AppBottomNav active="perfil" />
      </div>
    </PerfilSessionProvider>
  );
}
