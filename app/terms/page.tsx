import type { Metadata } from "next";
import { BRAND, COMPANY } from "@/lib/brand";
import { PLAN } from "@/lib/billing/plan";
import { Contact, LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: `Terms of Service · ${BRAND}` };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        {BRAND} is a hands-on learning service for students. By signing in, you agree to these terms. If you are under 18, a
        parent or guardian must agree to them for you.
      </p>

      <h2>Your account</h2>
      <ul>
        <li>You sign in with a Google account. Keep it secure; you're responsible for activity on your account.</li>
        <li>One account is for one student. Don't share your account or resell access.</li>
      </ul>

      <h2>Access</h2>
      <ul>
        <li>
          Anyone can browse the modules and try the free sample concept units. Full modules, every concept unit, the AI lab
          assistant, guide feedback and certificates are for students enrolled at the {BRAND} Academy.
        </li>
        <li>Enrolment is arranged and paid with the Academy directly. It runs until the date shown on your account page.</li>
        <li>
          The lab assistant has a fair-use limit of {PLAN.dailyChatCap} messages a day, which resets at midnight Addis Ababa time.
        </li>
      </ul>

      <h2>Safety</h2>
      <ul>
        <li>
          Modules use real tools and materials. Heat, sharp tools, electricity and chemicals can still hurt you. Follow every safety
          note and your guide&apos;s instructions, and do hands-on work at the Academy or with an adult present.
        </li>
        <li>
          The AI lab assistant can make mistakes. It does not replace a teacher, a doctor or the safety notes in the guide. In an
          emergency, stop and get an adult or medical help.
        </li>
        <li>You do the activities at your own risk, to the extent the law allows.</li>
      </ul>

      <h2>Acceptable use</h2>
      <ul>
        <li>Use {BRAND} for learning. Don't try to break, overload or scrape the service, or misuse the assistant.</li>
        <li>We may suspend accounts that break these terms.</li>
      </ul>

      <h2>Content</h2>
      <p>
        Guides, videos and other materials belong to {COMPANY} or its partners and are for your personal learning only. Some videos are
        hosted by third parties such as YouTube.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. If we make a significant change, we'll tell you on the site before it applies.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Reach us at <Contact />.
      </p>
    </LegalPage>
  );
}
