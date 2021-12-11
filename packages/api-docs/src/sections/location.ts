import { PropType } from '@structured-types/api';
import { DocumentationNode } from '../types';
import { paragraphNode } from '../blocks/paragraph';
import { PropRepos } from '../utility/prop-repos';
import { emphasisNode } from '../blocks/emphasis';
import { textNode } from '../blocks/text';
import { linkNode } from '../blocks/link';

export const locationSection = async (
  prop: PropType,
  repos: PropRepos,
): Promise<DocumentationNode[] | undefined> => {
  const { filePath, loc } = prop.loc || {};
  if (filePath) {
    const repo = await repos.getRepo(filePath);
    if (repo) {
      const { repo: repoName, relativePath, packageName } = repo;
      const fileLocation = repoName || filePath;
      if (fileLocation) {
        const { line } = loc?.start || {};
        const sourceLocation = filePath.includes('node_modules')
          ? fileLocation
          : `${fileLocation}${line ? `#L${line}` : ''}`;
        return [
          paragraphNode([
            emphasisNode([
              textNode('defined in '),
              linkNode(
                [
                  textNode(
                    packageName
                      ? `${packageName}/${relativePath}`
                      : sourceLocation,
                  ),
                ],
                sourceLocation,
                prop.loc,
              ),
            ]),
          ]),
        ];
      }
    }
  }
  return undefined;
};
