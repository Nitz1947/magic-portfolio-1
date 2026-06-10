import { Column, Meta, Schema } from "@once-ui-system/core";
import { ContactGrid } from "@/components/contact/ContactGrid";
import { SyntaxHighlightBlock } from "@/components/effects";
import { localizedPath } from "@/i18n/paths";
import { resolveLocale } from "@/i18n/page";
import { getUi } from "@/i18n/ui";
import { baseURL, getContent } from "@/resources";
import styles from "./contact.module.scss";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { contact } = getUi(locale);

  return Meta.generate({
    title: contact.pageTitle,
    description: contact.pageDescription,
    baseURL: baseURL,
    path: localizedPath("/contact", locale),
  });
}

export default async function ContactPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { person } = getContent(locale);
  const { contact } = getUi(locale);

  return (
    <div className={styles.page}>
      <div className={styles.decoration} aria-hidden="true">
        <SyntaxHighlightBlock position="topRight" compact />
      </div>
      <Column
        fillWidth
        paddingTop="24"
        paddingX="l"
        gap="xl"
        horizontal="center"
        align="center"
        className={styles.content}
      >
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={localizedPath("/contact", locale)}
          title={contact.pageTitle}
          description={contact.pageDescription}
          author={{
            name: person.name,
            url: `${baseURL}${localizedPath("/about", locale)}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <ContactGrid />
      </Column>
    </div>
  );
}
