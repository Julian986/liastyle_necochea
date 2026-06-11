import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel - Lia Style Necochea",
  manifest: "/manifest-panel.webmanifest",
};

export default function PanelTurnosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
