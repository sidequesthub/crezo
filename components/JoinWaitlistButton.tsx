"use client";

import Script from "next/script";

const FORM_ID = "q4PyD5";
const FORM_URL = `https://tally.so/r/${FORM_ID}`;

declare global {
  interface Window {
    Tally?: { openPopup: (formId: string, options?: object) => void };
  }
}

/**
 * The one waitlist entry point. Opens the Tally form as a popup; if Tally's
 * script hasn't loaded (blocked, slow network), falls back to the form page.
 * The Script id dedupes, so several buttons load Tally once.
 */
export default function JoinWaitlistButton({ className }: { className?: string }) {
  function open() {
    if (window.Tally) {
      window.Tally.openPopup(FORM_ID, { width: 500, emoji: { text: "🚀", animation: "wave" } });
    } else {
      window.open(FORM_URL, "_blank", "noopener");
    }
  }

  return (
    <>
      <Script id="tally-embed" src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
      <button type="button" onClick={open} className={className}>
        Join Waitlist
      </button>
    </>
  );
}
