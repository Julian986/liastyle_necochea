import { cookies } from "next/headers";

import { verifyPanelCookie } from "@/lib/panel-turnos-auth";

import { PanelLogin } from "../panel-login";
import { PanelVipPreviewClient } from "./panel-vip-preview-client";

export default async function PanelVipPage() {
  const cookieStore = await cookies();
  if (!verifyPanelCookie(cookieStore.get("panel_turnos_auth")?.value)) {
    return <PanelLogin />;
  }

  return <PanelVipPreviewClient />;
}
