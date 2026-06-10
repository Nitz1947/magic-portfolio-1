import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { Mailchimp, SocialProofStrip } from "@/components";
import { SectionBackdrop, HeroBackground } from "@/components/effects";
import homeStyles from "./home.module.scss";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProjectSlideshow } from "@/components/ProjectSlideshow";
import { ServicesGrid } from "@/components/ServicesGrid";
import { TechMarquee } from "@/components/TechMarquee";
import { featuredProjectConfigs, homepageFeaturedSlugs } from "@/data/featuredProjects";
import { getProjectPresentations } from "@/data/projectPresentations";
import { localizedPath } from "@/i18n/paths";
import { resolveLocale } from "@/i18n/page";
import { getUi } from "@/i18n/ui";
import { baseURL, getContent, routes } from "@/resources";
import { getPosts } from "@/utils/utils";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { home } = getContent(locale);

  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: localizedPath(home.path, locale),
    image: home.image,
  });
}

export default async function Home({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { home, about, person, work } = getContent(locale);
  const ui = getUi(locale);

  const allProjects = getPosts(["src", "app", "work", "projects"]);
  const presentations = getProjectPresentations(locale);
  const showcaseProjects = homepageFeaturedSlugs
    .map((slug) => {
      const post = allProjects.find((p) => p.slug === slug);
      const config = featuredProjectConfigs[slug];
      const presentation = presentations.find((p) => p.slug === slug);
      if (!post || !config || !presentation) return null;
      return {
        slug,
        title: post.metadata.title,
        summary: presentation.shortSummary,
        tagline: presentation.tagline,
        stack: presentation.stack,
        presentationHref: `${localizedPath("/work", locale)}#project-${slug}`,
        href: localizedPath(`/work/${slug}`, locale),
        config,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <Column maxWidth="m" gap="48" paddingY="12" paddingX="l" horizontal="center" fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={localizedPath(home.path, locale)}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${localizedPath(about.path, locale)}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <SectionBackdrop variant="hero" background={<HeroBackground />}>
        <Column fillWidth horizontal="center" gap="m" className={homeStyles.heroContent}>
          <Column
            maxWidth="s"
            horizontal="center"
            align="center"
            fillWidth
          >
            {home.featured.display && (
              <RevealFx
                fillWidth
                horizontal="center"
                paddingTop="16"
                paddingBottom="24"
                paddingLeft="12"
              >
                <Row gap="8" wrap horizontal="center">
                  {(home.featured.items ??
                    (home.featured.href
                      ? [{ title: home.featured.title, href: home.featured.href }]
                      : [])
                  ).map((item) => (
                    <Badge
                      key={item.href}
                      background="brand-alpha-weak"
                      paddingX="12"
                      paddingY="4"
                      onBackground="neutral-strong"
                      textVariant="label-default-s"
                      arrow={false}
                      href={localizedPath(item.href, locale)}
                    >
                      <Row paddingY="2">{item.title}</Row>
                    </Badge>
                  ))}
                </Row>
              </RevealFx>
            )}
            <RevealFx translateY="8" fillWidth horizontal="center" paddingBottom="16">
              <Heading wrap="balance" variant="display-strong-l" className={homeStyles.heroHeadline}>
                {home.headline}
              </Heading>
            </RevealFx>
            <RevealFx translateY="12" delay={0.15} fillWidth horizontal="center" paddingBottom="32">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                {home.subline}
              </Text>
            </RevealFx>
            <RevealFx translateY="16" delay={0.3} fillWidth horizontal="center">
              <Row gap="12" wrap horizontal="center" className={homeStyles.heroActions}>
                <Button
                  href={localizedPath(work.path, locale)}
                  variant="primary"
                  size="m"
                  weight="default"
                  arrowIcon
                >
                  {ui.viewProjects}
                </Button>
                {routes["/quote"] && (
                  <Button
                    href={localizedPath("/quote", locale)}
                    variant="secondary"
                    size="m"
                    weight="default"
                    arrowIcon
                  >
                    {ui.services.cta}
                  </Button>
                )}
                <Button
                  href={`mailto:${person.email}`}
                  variant="tertiary"
                  size="m"
                  weight="default"
                >
                  {ui.contactMe}
                </Button>
              </Row>
            </RevealFx>
            <RevealFx translateY="8" delay={0.45} horizontal="center" paddingTop="24">
              <Button
                id="about"
                data-border="rounded"
                href={localizedPath(about.path, locale)}
                variant="tertiary"
                size="m"
                weight="default"
                arrowIcon
              >
                <Row gap="8" vertical="center" paddingRight="4">
                  {about.avatar.display && (
                    <Avatar
                      marginRight="8"
                      style={{ marginLeft: "-0.75rem" }}
                      src={person.avatar}
                      size="m"
                    />
                  )}
                  {about.title}
                </Row>
              </Button>
            </RevealFx>
          </Column>
        </Column>
      </SectionBackdrop>

      <RevealFx translateY="12" delay={0.42} fillWidth>
        <SocialProofStrip />
      </RevealFx>

      <RevealFx translateY="20" delay={0.5} fillWidth>
        <TechMarquee />
      </RevealFx>

      <RevealFx translateY="24" delay={0.55} fillWidth>
        <Column fillWidth gap="20">
          <Column fillWidth gap="8">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              {ui.featuredProjects}
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak" wrap="balance">
              {ui.featuredProjectsSubline}
            </Text>
          </Column>
          <ProjectSlideshow projects={showcaseProjects} />
        </Column>
      </RevealFx>

      <RevealFx translateY="24" delay={0.65} fillWidth>
        <ServicesGrid />
      </RevealFx>

      <RevealFx translateY="24" delay={0.72} fillWidth>
        <ProcessSteps title={ui.process.title} steps={ui.process.steps} />
      </RevealFx>

      <Mailchimp />
    </Column>
  );
}
