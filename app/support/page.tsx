import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support | Crezo",
  description: "Get help with Crezo. WhatsApp, email, and answers to common questions.",
};

const WHATSAPP = "917871468369";
const EMAIL = "hello@crezo.studio";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background text-on-background">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="text-sm font-medium text-primary hover:text-primary-fixed"
        >
          ← Crezo
        </Link>

        <h1 className="mt-8 font-[family-name:var(--font-display,'Plus_Jakarta_Sans')] text-4xl font-extrabold tracking-tight sm:text-5xl">
          Support
        </h1>
        <p className="mt-3 text-[15px] text-on-surface-variant">
          Something broken, or an idea for what Crezo should do next? We read
          every message.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={`https://wa.me/${WHATSAPP}`}
            className="group rounded-2xl bg-surface-container-low p-6 transition hover:bg-surface-container-high"
          >
            <div className="text-lg font-bold text-on-surface">WhatsApp</div>
            <p className="mt-1 text-sm text-on-surface-variant">
              Usually the fastest way to reach a human.
            </p>
            <span className="mt-3 inline-block text-sm font-semibold text-primary">
              Message us →
            </span>
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="group rounded-2xl bg-surface-container-low p-6 transition hover:bg-surface-container-high"
          >
            <div className="text-lg font-bold text-on-surface">Email</div>
            <p className="mt-1 text-sm text-on-surface-variant">{EMAIL}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-primary">
              Write to us →
            </span>
          </a>
        </div>

        <p className="mt-6 text-sm text-on-surface-variant">
          We aim to reply within one working day.
        </p>

        <h2 className="mt-16 text-2xl font-bold text-on-surface">
          Common questions
        </h2>

        <div className="mt-6 space-y-4">
          <Faq
            q="Does Crezo upload my photos and videos?"
            a="No. The Asset Vault reads your camera roll so you can group items into folders, but it only ever stores a reference to each item, never the file itself. Your media stays on your device, and Crezo has no copy of it."
          />
          <Faq
            q="What happens to my folders if I delete a photo?"
            a="The folder simply stops showing that item, and Crezo tells you how many items are no longer on the device. Deleting a photo in your Photos app is always the real deletion; removing it from a Crezo folder never touches the file."
          />
          <Faq
            q="Do I need a GSTIN to use Crezo?"
            a="No. GST registration is only mandatory once your turnover crosses ₹20 lakh. Leave the field empty and your invoices are generated without GST."
          />
          <Faq
            q="How do I sign in?"
            a="With your Google account, or with your phone number and a one-time passcode. Both sign you into the same Crezo account if they share an email address."
          />
          <Faq
            q="How do I delete my account?"
            a="In the app, go to Profile → Privacy & security → Delete my account. This permanently removes every deal, content plan, invoice and vault folder, along with your login. Photos on your device are unaffected."
          />
          <Faq
            q="Is my data private?"
            a={
              <>
                Yes. Every record is scoped to your account and enforced at the
                database level, so no other account can read it. See our{" "}
                <Link
                  href="/privacy"
                  className="text-primary hover:text-primary-fixed"
                >
                  privacy policy
                </Link>{" "}
                for the detail.
              </>
            }
          />
        </div>

        <div className="mt-16 rounded-2xl bg-surface-container-low p-6">
          <h2 className="text-lg font-bold text-on-surface">
            Reporting a bug
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            The most useful bug report says what you were doing, what you
            expected, and what happened instead. Your app version is at the
            bottom of <strong className="text-on-surface">Profile → Help &amp; support</strong>, and including it
            helps a lot.
          </p>
        </div>

        <p className="mt-12 text-center text-sm text-on-surface-variant/60">
          Built for Indian creators, with rupees, GST and UPI at its core.
        </p>
      </div>
    </main>
  );
}

function Faq({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <details className="group rounded-2xl bg-surface-container-low p-5 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-on-surface">
        {q}
        <span className="text-primary transition group-open:rotate-45">+</span>
      </summary>
      <p className="mt-3 text-[15px] leading-relaxed text-on-surface-variant">
        {a}
      </p>
    </details>
  );
}
