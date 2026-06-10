import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { SyntaxHighlightBlock } from "@/components/effects";
import { localizedPath } from "@/i18n/paths";
import { resolveLocale } from "@/i18n/page";
import { baseURL, getContent } from "@/resources";
import { Projects } from "@/components/work/Projects";
import styles from "./work.module.scss";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { work } = getContent(locale);

  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: localizedPath(work.path, locale),
  });
}

export default async function Work({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { work, about, person } = getContent(locale);

  return (
    <div className={styles.page}>
      <div className={styles.decoration} aria-hidden="true">
        <SyntaxHighlightBlock position="topRight" compact />
      </div>
      <Column maxWidth="m" paddingTop="24" paddingX="l" gap="l" className={styles.content}>
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={localizedPath(work.path, locale)}
          title={work.title}
          description={work.description}
          image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${localizedPath(about.path, locale)}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Column fillWidth gap="8" marginBottom="m">
          <Heading variant="heading-strong-xl" wrap="balance">
            {work.title}
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
            {work.description}
          </Text>
        </Column>
        <Projects locale={locale} />
      </Column>
    </div>
  );
}
