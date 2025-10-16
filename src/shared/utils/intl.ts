export function formatDate({
  date,
  language,
  options,
}: {
  date: Date;
  language?: string;
  options?: Intl.DateTimeFormatOptions;
}) {
  return new Intl.DateTimeFormat(
    language ?? navigator.language,
    options,
  ).format(date);
}
