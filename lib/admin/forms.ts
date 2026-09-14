export function text(form: FormData, key: string) {
  return String(form.get(key) || "").trim();
}

export function bool(form: FormData, key: string) {
  const value = form.get(key);
  return value === "on" || value === "true" || value === "1";
}

export function num(form: FormData, key: string) {
  return Number(form.get(key) || 0);
}

export function parseJson(value: string) {
  if (!value.trim()) return null;
  return JSON.parse(value) as unknown;
}
