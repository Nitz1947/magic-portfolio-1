import type { Locale } from "@/i18n/config";
import { getDateLocale } from "@/i18n/paths";
import { getUi } from "@/i18n/ui";

export function formatDate(
  date: string,
  includeRelative = false,
  locale: Locale = "en",
) {
  const currentDate = new Date();

  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  const targetDate = new Date(date);
  const timeDifference = currentDate.getTime() - targetDate.getTime();
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  const ui = getUi(locale);

  let formattedDate = "";

  if (daysAgo >= 365) {
    formattedDate = `${Math.floor(daysAgo / 365)}${ui.relativeTime.years}`;
  } else if (daysAgo >= 30) {
    formattedDate = `${Math.floor(daysAgo / 30)}${ui.relativeTime.months}`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}${ui.relativeTime.days}`;
  } else if (hoursAgo > 0) {
    formattedDate = `${hoursAgo}${ui.relativeTime.hours}`;
  } else if (minutesAgo > 0) {
    formattedDate = `${minutesAgo}${ui.relativeTime.minutes}`;
  } else {
    formattedDate = ui.relativeTime.justNow;
  }

  const fullDate = targetDate.toLocaleString(getDateLocale(locale), {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
