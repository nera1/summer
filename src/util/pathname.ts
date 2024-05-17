export function indexCheck(obj: any) {
  if (typeof obj === "object") {
    if (!Object.keys(obj).length) {
      return true;
    }
  }
  return false;
}
