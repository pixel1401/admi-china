export function formatDate(params: Date | string | undefined | null): string | null {
  if (!params) {
    return null; // or throw an error, depending on your requirements
  }

  let inputDate: Date;

  if (params instanceof Date) {
    inputDate = params;
  } else if (typeof params === "string") {
    inputDate = new Date(params);
    if (isNaN(inputDate.getTime())) {
      return null; // Invalid date string
    }
  } else {
    return null; // Unsupported type
  }

  const day = inputDate.getUTCDate().toString().padStart(2, "0");
  const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = inputDate.getUTCFullYear();

  const hours = inputDate.getUTCHours().toString().padStart(2, "0");
  const minutes = inputDate.getUTCMinutes().toString().padStart(2, "0");

  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  return formattedDate;
}
