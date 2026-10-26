import type { Metadata } from "next";
import { BRAND, COMPANY } from "@/lib/brand";
import { Contact, LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: `Privacy Policy · ${BRAND}` };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        Most {BRAND} students are under 18, so we collect as little as we can. This policy explains what {COMPANY} keeps and why.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>From Google when you sign in:</strong> your name, email address, profile picture link and Google account ID. We
          never see your Google password.
        </li>
        <li>
          <strong>What you tell us:</strong> your grade and the subjects you chose.
        </li>
        <li>
          <strong>Your learning:</strong> which experiments you started or finished and the observations you write in your lab
          notebook.
        </li>
        <li>
          <strong>Lab assistant chats:</strong> your messages and the assistant's replies.
        </li>
        <li>
          <strong>Payments:</strong> the amount, date, status and Chapa reference. Card, Telebirr and bank details stay with Chapa.
        </li>
        <li>
          <strong>Basic usage:</strong> which pages are visited, the browser and an approximate location (country/city), to improve
          the service.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To run your account, unlock what you've paid for and save your progress.</li>
        <li>To answer your questions: messages are sent to our AI provider to generate a reply, and are not used to advertise to you.</li>
        <li>To keep the service safe and fix problems.</li>
      </ul>
      <p>We don't sell your data, and we don't show ads.</p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Lab assistant messages are deleted automatically after 90 days (365 days if you opt in to longer history).</li>
        <li>Payment records are kept as long as the law requires for accounting.</li>
        <li>Everything else is kept while your account exists.</li>
      </ul>

      <h2>Who we share it with</h2>
      <ul>
        <li>Google (sign-in), Chapa (payments), our AI provider (assistant replies), and our hosting and database providers.</li>
        <li>Authorities, only if the law requires it.</li>
      </ul>

      <h2>Your choices</h2>
      <p>
        You or your parent/guardian can ask us to see, correct or delete your data at any time by contacting <Contact />.
      </p>
    </LegalPage>
  );
}
