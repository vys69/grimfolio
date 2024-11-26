"use client";

import { TerminalButton } from "./TerminalButton";
import { KofiWidget } from "./KofiWidget";

export function BottomButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-10">
      <KofiWidget />
      <TerminalButton />
    </div>
  );
}