"use client";

import { useState } from "react";
import { TT_GREEN, TT_GREEN_LIGHT } from "./theme";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="mt-3 text-small font-medium transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ color: TT_GREEN_LIGHT, outlineColor: TT_GREEN }}
    >
      {copied ? "Copié !" : "Copier la citation"}
    </button>
  );
}
