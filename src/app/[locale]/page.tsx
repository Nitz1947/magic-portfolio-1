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
  Line,
} from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { CodeRain } from "@/components/CodeRain";
import { SectionBackdrop } from "@/components/effects";
import { OfferBuilder } from "@/components/OfferBuilder";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProjectSlideshow } from "@/components/ProjectSlideshow";
import { ServicesGrid } from "@/components/ServicesGrid";
import { TechMarquee } from "@/components/TechMarquee";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { featuredProjectConfigs, homepageFeaturedSlugs } from "@/data/featuredProjects";
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
  const showcaseProjects = homepageFeaturedSlugs
    .map((slug) => {
      const post = allProjects.find((p) => p.slug === slug);
      const config = featuredProjectConfigs[slug];
      if (!post || !config) return null;
      return {
        slug,
        title: post.metadata.title,
        summary: post.metadata.summary,
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
      <SectionBackdrop variant="hero">
        <Column fillWidth horizontal="center" gap="m">
          <Column
            maxWidth="s"
            horizontal="center"
            align="center"
            style={{ position: "relative" }}
            fillWidth
          >
            <CodeRain />
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
              <Heading wrap="balance" variant="display-strong-l">
                {home.headline}
              </Heading>
            </RevealFx>
            <RevealFx translateY="12" delay={0.15} fillWidth horizontal="center" paddingBottom="32">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                {home.subline}
              </Text>
            </RevealFx>
            <RevealFx translateY="16" delay={0.3} fillWidth horizontal="center">
              <Row gap="12" wrap horizontal="center">
                <Button
                  href={localizedPath(work.path, locale)}
                  variant="primary"
                  size="m"
                  weight="default"
                  arrowIcon
                >
                  {ui.viewProjects}
                </Button>
                <Button
                  href={`mailto:${person.email}`}
                  variant="secondary"
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

      <RevealFx translateY="20" delay={0.6} fillWidth>
        <Column fillWidth gap="16">
          <Heading as="h2" variant="display-strong-xs" wrap="balance">
            {ui.work.label}
          </Heading>
          <Projects
            exclude={[...homepageFeaturedSlugs, "portfolio-developera-nextjs"]}
            locale={locale}
          />
        </Column>
      </RevealFx>

      <RevealFx translateY="24" delay={0.62} fillWidth>
        <ServicesGrid />
      </RevealFx>

      <RevealFx translateY="24" delay={0.65} fillWidth>
        <ProcessSteps title={ui.process.title} steps={ui.process.steps} />
      </RevealFx>

      <RevealFx translateY="24" delay={0.68} fillWidth>
        <OfferBuilder />
      </RevealFx>

      {routes["/blog"] && (
        <RevealFx translateY="16" delay={0.7}>
          <Column fillWidth gap="24" marginBottom="l">
            <Row fillWidth paddingRight="64">
              <Line maxWidth={48} />
            </Row>
            <Column fillWidth gap="24" marginTop="24" s={{ gap: "16" }}>
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                {ui.latestFromBlog}
              </Heading>
              <Posts range={[1, 2]} columns="2" locale={locale} />
            </Column>
            <Row fillWidth paddingLeft="64" horizontal="end">
              <Line maxWidth={48} />
            </Row>
          </Column>
        </RevealFx>
      )}

      <Mailchimp />
    </Column>
  );
}
