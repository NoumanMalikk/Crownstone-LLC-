import { ContactForm } from "@/components/forms/contact-form";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact Crownstone LLC about products, orders, shipping, warranty and business pricing.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactForm />;
}
