function stringArrayAsList(array) {
    return array.map((item) => `${item}`).join(", ");
}
function convertDateFormat(date) {
    return Intl.DateTimeFormat("da-DK", { year: "numeric", month: "long", day: "numeric", }).format(new Date(date));
}
export { stringArrayAsList, convertDateFormat };
