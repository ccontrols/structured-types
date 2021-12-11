/**
 * this is an async function
 */
export const f = async (filePath?: string): Promise<boolean> => {
  return Promise.resolve(!!filePath);
};
