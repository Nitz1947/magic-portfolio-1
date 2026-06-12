import { Column, Meta, Schema } from "@once-ui-system/core";
import { OfferBuilder } from "@/components/OfferBuilder";
import styles from "./quote.module.scss";
import { localizedPath } from "@/i18n/paths";
import { resolveLocale } from "@/i18n/page";
import { buildPageMetadata } from "@/i18n/seo";
import { getUi } from "@/i18n/ui";
import { baseURL, getContent } from "@/resources";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const ui = getUi(locale);

  return buildPageMetadata({
    locale,
    path: "/quote",
    title: ui.quote.pageTitle,
    description: ui.quote.pageDescription,
  });
}

export default async function QuotePage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { person } = getContent(locale);
  const ui = getUi(locale);

  return (
    <Column maxWidth="l" gap="32" paddingY="12" paddingX="l" horizontal="center" fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={localizedPath("/quote", locale)}
        title={ui.quote.pageTitle}
        description={ui.quote.pageDescription}
        author={{
          name: person.name,
          url: `${baseURL}${localizedPath("/about", locale)}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <div className={styles.pageShell}>
        <OfferBuilder />
      </div>
    </Column>
  );
}
