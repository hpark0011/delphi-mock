"use client";

import { Dashboard } from "@/components/layouts/dashboard";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3defb6de-43b2-4f94-a176-53fbf2c88ac0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'studio/layout.tsx:10',message:'StudioLayout rendering',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  return (
    <Dashboard>
      <Dashboard.Sidebar />
      <Dashboard.Content fullWidth>
        <Dashboard.Main>{children}</Dashboard.Main>
      </Dashboard.Content>
    </Dashboard>
  );
}
