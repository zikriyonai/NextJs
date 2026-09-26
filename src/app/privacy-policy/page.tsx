import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Zikriyon AI",
  description: "How Zikriyon AI collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-display text-4xl font-medium text-ink md:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-slate">Last updated: 26 September 2026</p>

      <div className="mt-10 space-y-8 text-ink">
        <section>
          <h2 className="font-display text-2xl font-medium">1. About Us</h2>
          <p className="mt-3 text-slate">
            Zikriyon AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the
            website and application available at{" "}
            <Link href="/" className="text-ink underline underline-offset-4">
              zikriyonai.vercel.app
            </Link>
            . We provide live classes, doubt-solving support, and rank-tracking tests for
            students preparing for JEE, NEET, and Board examinations.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium">2. Information We Collect</h2>
          <p className="mt-3 text-slate">
            When you sign in with Google, we receive basic profile information such as your
            name, email address, and profile picture. We also collect information you
            voluntarily provide, such as:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate">
            <li>Your exam preference (JEE, NEET, or Boards) and class/year</li>
            <li>Your answers, test scores, and learning progress</li>
            <li>Doubts you post, and messages you send to teachers</li>
            <li>Device and browser information for security and analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium">3. How We Use Your Information</h2>
          <p className="mt-3 text-slate">We use your information to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate">
            <li>Create and manage your account</li>
            <li>Provide live classes, tests, and doubt support</li>
            <li>Show you your rank, progress, and weak topics</li>
            <li>Improve our platform and fix problems</li>
            <li>Send important updates about your account or our service</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium">4. Data Storage &amp; Security</h2>
          <p className="mt-3 text-slate">
            Your data is stored securely on cloud infrastructure provided by Vercel and
            PostgreSQL-based managed databases. We use industry-standard security measures,
            including encrypted connections (HTTPS), hashed passwords, and access controls, to
            protect your information from unauthorised access.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium">5. Sharing Your Information</h2>
          <p className="mt-3 text-slate">
            We do not sell your personal data. We only share information with:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate">
            <li>
              <strong>Google</strong>, for authentication when you sign in with Google
            </li>
            <li>
              <strong>Service providers</strong> (such as Vercel and our database provider)
              who help us run the platform
            </li>
            <li>
              <strong>Legal authorities</strong>, when required by law
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium">6. Your Rights</h2>
          <p className="mt-3 text-slate">
            You can access, update, or delete your account information at any time from your
            profile settings. If you want us to delete your account and all associated data,
            email us at the address below.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium">7. Cookies</h2>
          <p className="mt-3 text-slate">
            We use essential cookies to keep you signed in and remember your preferences. We
            do not use cookies for advertising.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium">8. Children&rsquo;s Privacy</h2>
          <p className="mt-3 text-slate">
            Our platform is intended for students of Class 9 and above. If you are under 18,
            please use our services only with the consent of a parent or guardian.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium">9. Changes to This Policy</h2>
          <p className="mt-3 text-slate">
            We may update this Privacy Policy from time to time. When we do, we will revise the
            &ldquo;Last updated&rdquo; date at the top of this page.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-medium">10. Contact Us</h2>
          <p className="mt-3 text-slate">
            For any questions about this Privacy Policy, contact us at:
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
  );
}
