import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Crezo",
  description:
    "The rules for using Crezo: your account, your content, invoices, subscriptions, and our responsibilities.",
};

const UPDATED = "29 September 2026";

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-on-surface-variant">
          Last updated {UPDATED}
        </p>

        <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-on-surface-variant">
          <Section title="The short version">
            <p>
              Crezo is a business tool for creators: a content calendar, brand
              deal tracker, invoice generator and media organiser. Your data is
              yours. Use Crezo lawfully, keep your account secure, and check the
              documents you send to brands. We work hard to keep Crezo running,
              but we provide it as it is.
            </p>
          </Section>

          <Section title="Agreeing to these terms">
            <p>
              By creating an account or using the Crezo app or website, you
              agree to these terms and to our{" "}
              <Link
                href="/privacy"
                className="text-primary hover:text-primary-fixed"
              >
                Privacy Policy
              </Link>
              . If you do not agree, please do not use Crezo. You must be at
              least 18 years old, or have a parent or guardian&apos;s consent,
              to use Crezo.
            </p>
          </Section>

          <Section title="Your account">
            <p>
              You sign in with Google. You are responsible for activity on your
              account and for keeping access to your Google account secure.
              Tell us at{" "}
              <Mail /> if you believe someone else has accessed your account.
            </p>
          </Section>

          <Section title="Your content">
            <p>
              Everything you add — deals, content plans, invoices, profile
              details and media kit information — remains yours. You give us
              permission to store and display it only so that Crezo can work
              for you, for example to show your deals back to you or to
              publish the media kit link you choose to share. Photos and videos
              in the Asset Vault stay on your device; Crezo stores only a
              reference to them.
            </p>
          </Section>

          <Section title="Invoices and tax">
            <p>
              Crezo helps you prepare invoices, including GST fields where they
              apply. You are responsible for the accuracy of what you issue —
              amounts, GSTIN, tax rates, TDS and the details of the brand you
              bill — and for meeting your own tax and filing obligations.
              Crezo does not give tax, legal or financial advice.
            </p>
          </Section>

          <Section title="Subscriptions">
            <p>
              Some features may require a paid subscription. Prices and what
              each plan includes are shown in the app before you buy.
              Purchases made in the iOS app are processed by Apple, renew
              automatically unless you cancel at least 24 hours before the end
              of the current period, and are managed and refunded under
              Apple&apos;s terms from your Apple ID settings. Free trials, where
              offered, convert to a paid subscription unless cancelled before
              the trial ends.
            </p>
          </Section>

          <Section title="Acceptable use">
            <p>You agree not to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>use Crezo for anything unlawful or fraudulent, including issuing false invoices;</li>
              <li>upload content you do not have the right to use;</li>
              <li>try to access other users&apos; data, or probe, disrupt or overload our systems;</li>
              <li>copy, resell or reverse-engineer the service.</li>
            </ul>
            <p className="mt-3">
              We may suspend or close accounts that break these rules.
            </p>
          </Section>

          <Section title="Availability and changes to Crezo">
            <p>
              We aim to keep Crezo available and your data safe, but we cannot
              promise the service will be uninterrupted or error-free. We may
              add, change or remove features. If we ever shut Crezo down, we
              will give you reasonable notice and a way to export your data.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p>
              Crezo is provided &ldquo;as is&rdquo;. To the extent the law
              allows, we are not liable for indirect or consequential losses —
              such as lost deals, income or data — arising from your use of
              Crezo. Our total liability to you is limited to the amount you
              paid us in the 12 months before the claim. Nothing in these terms
              limits rights you have under Indian consumer protection law.
            </p>
          </Section>

          <Section title="Ending your use">
            <p>
              You can stop using Crezo and delete your account at any time from
              the app or by writing to <Mail />. Deleting your account removes
              your data as described in our Privacy Policy.
            </p>
          </Section>

          <Section title="Governing law">
            <p>
              These terms are governed by the laws of India, and disputes are
              subject to the jurisdiction of the courts of India.
            </p>
          </Section>

          <Section title="Changes to these terms">
            <p>
              If we change these terms in a way that materially affects you, we
              will notify you in the app before the change takes effect.
              Continuing to use Crezo after that means you accept the updated
              terms.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these terms: <Mail />
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Mail() {
  return (
    <a
      href="mailto:hello@crezo.studio"
      className="text-primary hover:text-primary-fixed"
    >
      hello@crezo.studio
    </a>
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
