import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { localizedPath } from "@/i18n/paths";
import { resolveLocale } from "@/i18n/page";
import { baseURL, getContent } from "@/resources";
import { Projects } from "@/components/work/Projects";

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
    <Column maxWidth="m" paddingTop="24">
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
      <Heading marginBottom="l" variant="heading-strong-xl">
        {work.title}
      </Heading>
      <Projects locale={locale} />
    </Column>
  );
}
