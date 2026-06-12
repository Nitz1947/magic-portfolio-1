import classNames from "classnames";
import { notFound } from "next/navigation";

import { Column, Flex } from "@once-ui-system/core";
import { Footer, Header, RouteGuard } from "@/components";
import { LayoutEffects } from "@/components/effects";
import { LocaleProvider } from "@/context/LocaleContext";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { localizedPath } from "@/i18n/paths";
import { buildPageMetadata } from "@/i18n/seo";
import { getUi } from "@/i18n/ui";
import { baseURL, fonts, getContent, style, dataStyle } from "@/resources";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const { home } = getContent(locale);

  return buildPageMetadata({
    locale,
    path: home.path,
    title: home.title,
    description: home.description,
    image: home.image,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const content = getContent(localeParam);
  const ui = getUi(localeParam);

  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang={localeParam}
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
      style={{ background: "transparent" }}
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const defaultTheme = 'system';
                  
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    "solid-style": style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    "viz-style": dataStyle.variant,
                  })};
                  
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  const savedTheme = localStorage.getItem('data-theme');
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.setAttribute('data-theme', resolvedTheme);
                  
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <LocaleProvider locale={localeParam} content={content} ui={ui}>
          <Column
            as="body"
            fillWidth
            style={{ minHeight: "100vh", position: "relative", background: "transparent" }}
            margin="0"
            padding="0"
            horizontal="center"
          >
            <LayoutEffects />
            <Flex fillWidth minHeight="16" s={{ hide: true }} position="relative" zIndex={2} />
            <Header />
            <Flex
              as="main"
              id="main-content"
              zIndex={2}
              fillWidth
              padding="l"
              horizontal="center"
              flex={1}
              position="relative"
            >
              <Flex horizontal="center" fillWidth minHeight="0">
                <RouteGuard>{children}</RouteGuard>
              </Flex>
            </Flex>
            <Footer />
          </Column>
        </LocaleProvider>
    </Flex>
  );
}
