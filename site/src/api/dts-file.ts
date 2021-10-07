require('polyfill-localstorage-node');
const nodeFetch = require('node-fetch').default;
import { decompressFromUTF16, compressToUTF16 } from 'lz-string';

// code from https://github.com/microsoft/TypeScript-Website/blob/6ac5f0e666efb7a8242a89a1a1fac7ef6b1a1dc7/packages/sandbox/src/typeAcquisition.ts#L267
const getCachedDTSString = async (
  url: string,
): Promise<string | undefined | null> => {
  const cached = localStorage.getItem(url);
  if (cached) {
    const [dateString, text] = cached.split('-=-^-=-');
    const cachedDate = new Date(dateString);
    const now = new Date();

    const cacheTimeout = 604800000; // 1 week
    if (now.getTime() - cachedDate.getTime() < cacheTimeout) {
      return decompressFromUTF16(text);
    }
  }

  const response = await nodeFetch(url);
  if (!response.ok) {
    console.error(
      `Could not get DTS response for the module at ${url}`,
      response,
    );
    return undefined;
  }

  const content = await response.text();
  if (!content) {
    console.error(`Could not get text for DTS response at ${url}`, response);
    return undefined;
  }

  const now = new Date();
  const cacheContent = `${now.toISOString()}-=-^-=-${compressToUTF16(content)}`;
  localStorage.setItem(url, cacheContent);
  return content;
};

export const addDTSMapping = async (
  url: string,
  node__location: string,
  name: string,
  map: Map<string, string>,
): Promise<void> => {
  const content = await getCachedDTSString(`${url}${name}`);
  if (content) {
    map.set(node__location + name, content);
  }
};
