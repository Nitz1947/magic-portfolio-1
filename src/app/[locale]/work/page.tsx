import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { ScrollToHash } from "@/components";
import { SyntaxHighlightBlock } from "@/components/effects";
import { ProjectPresentationGuide } from "@/components/work/ProjectPresentationGuide";
import { featuredProjectConfigs, homepageFeaturedSlugs } from "@/data/featuredProjects";
import { getProjectPresentations } from "@/data/projectPresentations";
import { localizedPath } from "@/i18n/paths";
import { resolveLocale } from "@/i18n/page";
import { getUi } from "@/i18n/ui";
import { baseURL, getContent } from "@/resources";
import { getPosts } from "@/utils/utils";
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
  const ui = getUi(locale);

  const allProjects = getPosts(["src", "app", "work", "projects"]);
  const presentations = getProjectPresentations(locale);

  const presentationProjects = homepageFeaturedSlugs
    .map((slug) => {
      const post = allProjects.find((p) => p.slug === slug);
      const config = featuredProjectConfigs[slug];
      const presentation = presentations.find((p) => p.slug === slug);
      if (!post || !config || !presentation) return null;
      return {
        slug,
        title: post.metadata.title,
        href: localizedPath(`/work/${slug}`, locale),
        config,
        presentation,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <div className={styles.page}>
      <ScrollToHash />
      <div className={styles.decoration} aria-hidden="true">
        <SyntaxHighlightBlock position="topRight" compact />
      </div>
      <Column
        maxWidth="m"
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
        <Column fillWidth gap="12" horizontal="center" align="center" className={styles.hero}>
          <Heading variant="display-strong-s" wrap="balance">
            {ui.work.hubTitle}
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
            {ui.work.hubDescription}
          </Text>
        </Column>
        <ProjectPresentationGuide projects={presentationProjects} />
      </Column>
    </div>
  );
}
