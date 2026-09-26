import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Terms & Conditions — Zikriyon AI",
  description: "Terms and conditions for using Zikriyon AI.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-4xl font-medium text-ink md:text-5xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-sm text-slate">Last updated: 26 September 2026</p>

        <div className="mt-10 space-y-8 text-ink">
          <section>
            <h2 className="font-display text-2xl font-medium">1. Acceptance of Terms</h2>
            <p className="mt-3 text-slate">
              By accessing or using Zikriyon AI (&ldquo;the Service&rdquo;), you agree to these
              Terms &amp; Conditions. If you do not agree, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium">2. Who Can Use the Service</h2>
            <p className="mt-3 text-slate">
              The Service is intended for students of Class 9 and above preparing for JEE, NEET,
              and Board examinations. If you are under 18, you must have permission from a parent
              or guardian to use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium">3. Your Account</h2>
            <p className="mt-3 text-slate">
              You are responsible for maintaining the confidentiality of your account and for all
              activities that happen under your account. Notify us immediately if you suspect any
              unauthorised use.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium">4. Acceptable Use</h2>
            <p className="mt-3 text-slate">You agree not to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate">
              <li>Share your account with others or resell access to the Service</li>
              <li>Copy, record, or redistribute our classes, notes, or tests</li>
              <li>Post abusive, harmful, or misleading content in doubts or chats</li>
              <li>Attempt to hack, scrape, or disrupt the Service</li>
              <li>Use the Service for any illegal purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium">5. Content & Intellectual Property</h2>
            <p className="mt-3 text-slate">
              All classes, notes, tests, designs, and other materials on the Service are owned by
              Zikriyon AI or its licensors. You may use them only for your personal learning and
              not for any commercial purpose.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium">6. Payments & Refunds</h2>
            <p className="mt-3 text-slate">
              Some parts of the Service may be paid. Fees, refund policy, and duration of access
              will be clearly shown before you make any payment. Unless stated otherwise, fees are
              non-refundable once a batch or course has started.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium">7. Disclaimers</h2>
            <p className="mt-3 text-slate">
              The Service is provided &ldquo;as is&rdquo;. While we work hard to keep our content
              accurate and helpful, we do not guarantee any specific exam result or rank. Your
              success depends on your own effort and other factors beyond our control.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium">8. Limitation of Liability</h2>
            <p className="mt-3 text-slate">
              To the maximum extent permitted by law, Zikriyon AI is not liable for any indirect,
              incidental, or consequential damages arising from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium">9. Termination</h2>
            <p className="mt-3 text-slate">
              We may suspend or terminate your access to the Service if you violate these Terms
              or misuse the platform. You may stop using the Service and delete your account at
              any time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium">10. Changes to These Terms</h2>
            <p className="mt-3 text-slate">
              We may update these Terms from time to time. When we do, we will revise the
              &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the
              Service after changes means you accept the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium">11. Contact</h2>
            <p className="mt-3 text-slate">
              For questions about these Terms, contact us at:
            </p>
            <p className="mt-2 text-ink">
              <a
                href="mailto:zikriyonai@gmail.com"
                className="underline underline-offset-4 hover:text-amber"
              >
                zikriyonai@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-rule pt-6">
          <Link
            href="/"
            className="text-sm font-medium text-ink underline underline-offset-4 hover:text-slate"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
