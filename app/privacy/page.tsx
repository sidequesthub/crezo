import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Crezo",
  description:
    "What Crezo collects, why, and how to delete it. Your media never leaves your device.",
};

const UPDATED = "23 August 2026";

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-on-surface-variant">
          Last updated {UPDATED}
        </p>

        <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-on-surface-variant">
          <Section title="The short version">
            <p>
              Crezo is a business tool for creators. We store the business
              records you create — your deals, content plans, invoices and
              profile — so the app can show them back to you. We do not sell
              your data, we do not run advertising, and we do not track you
              across other apps or websites.
            </p>
            <Callout>
              Your photos and videos never leave your device. The Asset Vault
              organises media by storing a reference to each item, never the
              file itself.
            </Callout>
          </Section>

          <Section title="What we collect">
            <p className="mb-4">Only what the app needs to work:</p>
            <Table
              rows={[
                [
                  "Account",
                  "Your phone number or Google email address, used to sign you in and identify your account.",
                ],
                [
                  "Profile",
                  "Name, bio, niche and profile photo, if you add them. These appear on your invoices and media kit.",
                ],
                [
                  "Business records",
                  "Brand deals, deliverables, content plans, and invoices that you create in the app.",
                ],
                [
                  "Payment details",
                  "GSTIN, PAN, UPI ID, bank account number and IFSC, if you enter them. Stored so invoices can be generated with your payment information.",
                ],
                [
                  "Vault references",
                  "For each item you add to a folder, an identifier pointing at that photo or video on your device — roughly a hundred characters. Never the media itself.",
                ],
              ]}
            />
          </Section>

          <Section title="What we do not collect">
            <ul className="list-inside list-disc space-y-2">
              <li>Your photos, videos, or any file from your device</li>
              <li>Location data</li>
              <li>Contacts, calendar, or messages</li>
              <li>Advertising or cross-app tracking identifiers</li>
              <li>Analytics on how you use individual screens</li>
            </ul>
          </Section>

          <Section title="Photo library access">
            <p>
              The Asset Vault asks for read access to your photo library so it
              can display your camera roll and let you group items into folders.
              Access is read-only: Crezo never uploads, moves, modifies or
              deletes anything in your library.
            </p>
            <p className="mt-4">
              Folders exist inside Crezo only. Adding an item to a folder stores
              a reference to it — the original stays exactly where it is, and
              removing it from a folder does not touch the file. You can revoke
              photo access at any time in your device settings; the rest of the
              app continues to work.
            </p>
          </Section>

          <Section title="Where your data lives">
            <p>
              Business records are stored in a hosted PostgreSQL database
              operated by Supabase, protected by row-level security so that only
              your account can read your records. Data is encrypted in transit.
            </p>
            <p className="mt-4">
              If you sign in by phone, your number is passed to MSG91, our SMS
              provider, solely to deliver your one-time passcode. If you sign in
              with Google, Google provides us your name and email address. We
              use no other third-party processors.
            </p>
          </Section>

          <Section title="Deleting your data">
            <p>
              Open <strong className="text-on-surface">Profile → Privacy &amp; security → Delete
              my account</strong>. This permanently removes your profile, deals,
              deliverables, content plans, invoices, vault folders and your
              login. It cannot be undone, and it takes effect immediately.
            </p>
            <p className="mt-4">
              Photos and videos on your device are unaffected — we never had
              them.
            </p>
            <p className="mt-4">
              You can also email{" "}
              <a
                href="mailto:privacy@crezo.studio"
                className="text-primary hover:text-primary-fixed"
              >
                privacy@crezo.studio
              </a>{" "}
              and we will delete your account within 30 days.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              You can access, correct, export or delete your data at any time —
              most of it directly in the app, and the rest by writing to us.
              Under India&apos;s Digital Personal Data Protection Act you may
              also withdraw consent, in which case we delete your account.
            </p>
          </Section>

          <Section title="Children">
            <p>
              Crezo is a business tool and is not directed at children under 13.
              We do not knowingly collect data from them.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              If this policy changes in a way that materially affects you, we
              will notify you in the app before the change takes effect.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about privacy:{" "}
              <a
                href="mailto:privacy@crezo.studio"
                className="text-primary hover:text-primary-fixed"
              >
                privacy@crezo.studio
              </a>
              <br />
              Anything else:{" "}
              <a
                href="mailto:hello@crezo.studio"
                className="text-primary hover:text-primary-fixed"
              >
                hello@crezo.studio
              </a>
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-on-surface">{title}</h2>
      {children}
    </section>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 rounded-2xl bg-surface-container-low p-5 text-on-surface">
      {children}
    </p>
  );
}

function Table({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-surface-container-low">
      {rows.map(([label, body], i) => (
        <div
          key={label}
          className={`flex flex-col gap-1 p-5 sm:flex-row sm:gap-6 ${
            i > 0 ? "border-t border-white/5" : ""
          }`}
        >
          <div className="w-full shrink-0 font-semibold text-on-surface sm:w-44">
            {label}
          </div>
          <div>{body}</div>
        </div>
      ))}
    </div>
  );
}
