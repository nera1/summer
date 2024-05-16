export function createDateString(date: string) {
  const d = new Date(date);
  const now = new Date();
  if (d.getFullYear() === now.getFullYear()) {
    return `${d.getMonth() + 1}.${d.getDate()}`;
  } else {
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
  }
}
