import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { localizedPath } from "@/i18n/paths";
import { resolveLocale } from "@/i18n/page";
import { baseURL, getContent } from "@/resources";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { blog } = getContent(locale);

  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: localizedPath(blog.path, locale),
  });
}

export default async function Blog({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { blog, person, newsletter } = getContent(locale);

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={localizedPath(blog.path, locale)}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${localizedPath(blog.path, locale)}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl">
        {blog.title}
      </Heading>
      <Posts locale={locale} />
      {newsletter.display && <Mailchimp marginTop="xl" />}
    </Column>
  );
}
