export function firstFieldError(errors: Record<string, string[]> | undefined, key: string): string | undefined {
  const list = errors?.[key];
  return list?.length ? list.join(" ") : undefined;
}
