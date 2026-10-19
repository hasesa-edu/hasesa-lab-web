import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { PLAN } from "@/lib/billing/plan";
import { Contact, LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: `Refund Policy · ${BRAND}` };

export default function RefundPage() {
  return (
    <LegalPage title="Refund Policy">
      <p>
        The {BRAND} pass is a one-time, prepaid payment of {PLAN.priceEtb} ETB for {PLAN.days} days. Nothing renews automatically,
        so you'll never be charged without choosing to pay.
      </p>

      <h2>When you can get a refund</h2>
      <ul>
        <li>
          <strong>Within 3 days of paying</strong>, if you haven't used the lab assistant yet, we'll
          refund the full amount.
        </li>
        <li>
          <strong>If you were charged twice</strong> or charged but your pass didn't unlock, we'll refund the extra payment or fix
          your pass, whichever you prefer.
        </li>
        <li>
          <strong>If {BRAND} was unavailable</strong> for a long stretch of your pass because of a problem on our side, we'll add
          the lost days to your pass.
        </li>
      </ul>

      <h2>How to ask</h2>
      <p>
        Contact <Contact /> with the email you sign in with, the date you paid and the Chapa reference (shown on your Account page).
        Refunds go back through Chapa to the method you paid with, usually within 7 working days.
      </p>
    </LegalPage>
  );
}
