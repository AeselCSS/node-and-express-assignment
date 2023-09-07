function stringArrayAsList(array: string[]): string {
  return array.map((item: string): string => `${item}`).join(", ");
}

function convertDateFormat(date: string): string {
  return Intl.DateTimeFormat("da-DK", {year: "numeric", month: "long", day: "numeric",}).format(new Date(date));
}

export { stringArrayAsList, convertDateFormat };
