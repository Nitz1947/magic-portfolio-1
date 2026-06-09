import { Providers } from "@/components/Providers";
import { LocaleProvider } from "@/context/LocaleContext";
import { defaultLocale } from "@/i18n/config";
import { getUi } from "@/i18n/ui";
import { getContent } from "@/resources";

export function LegacyLocaleShell({ children }: { children: React.ReactNode }) {
  const content = getContent(defaultLocale);
  const ui = getUi(defaultLocale);

  return (
    <Providers>
      <LocaleProvider locale={defaultLocale} content={content} ui={ui}>
        {children}
      </LocaleProvider>
    </Providers>
  );
}
