import { Flex, Meta, Schema } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { localizedPath } from "@/i18n/paths";
import { resolveLocale } from "@/i18n/page";
import { baseURL, getContent } from "@/resources";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { gallery } = getContent(locale);

  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: localizedPath(gallery.path, locale),
  });
}

export default async function Gallery({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { gallery, person } = getContent(locale);

  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={localizedPath(gallery.path, locale)}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${localizedPath(gallery.path, locale)}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <GalleryView />
    </Flex>
  );
}
