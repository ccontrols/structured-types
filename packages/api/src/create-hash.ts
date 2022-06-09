import hash from 'object-hash';

export function createHash(
  name: string,
  content: Record<string, unknown>,
): string {
  return `${name}:${hash(content).slice(0, 10)}`;
}
