import path from 'path-browserify';
import { ExplorerBase } from './ExplorerBase';
import { cacheWrapper } from './cacheWrapper';
import { getDirectory } from './getDirectory';
import {
  CosmiconfigResult,
  ExplorerOptions,
  LoadedFileContent,
  emptyResults,
} from './types';

class Explorer extends ExplorerBase<ExplorerOptions> {
  public constructor(options: ExplorerOptions) {
    super(options);
  }

  public async search(searchFrom?: string): Promise<CosmiconfigResult> {
    if (!this.config.fs) {
      return emptyResults;
    }
    const startDirectory = await getDirectory(
      searchFrom || this.config.fs.cwd(),
    );
    const result = await this.searchFromDirectory(startDirectory);

    return result;
  }

  private async searchFromDirectory(dir: string): Promise<CosmiconfigResult> {
    if (!this.config.fs) {
      return emptyResults;
    }

    const absoluteDir = path.resolve(this.config.fs.cwd(), dir);

    const run = async (): Promise<CosmiconfigResult> => {
      const result = await this.searchDirectory(absoluteDir);
      const nextDir = this.nextDirectoryToSearch(absoluteDir, result);

      if (nextDir) {
        return this.searchFromDirectory(nextDir);
      }

      const transformResult = await this.config.transform(result);

      return transformResult;
    };

    if (this.searchCache) {
      return cacheWrapper(this.searchCache, absoluteDir, run);
    }

    return run();
  }

  private async searchDirectory(dir: string): Promise<CosmiconfigResult> {
    for await (const place of this.config.searchPlaces) {
      const placeResult = await this.loadSearchPlace(dir, place);

      if (this.shouldSearchStopWithResult(placeResult) === true) {
        return placeResult;
      }
    }

    // config not found
    return null;
  }

  private async loadSearchPlace(
    dir: string,
    place: string,
  ): Promise<CosmiconfigResult> {
    const filepath = path.join(dir, place);
    if (!this.config.fs) {
      return emptyResults;
    }
    const fileContents = await this.config.fs.readFile(filepath);

    const result = await this.createCosmiconfigResult(filepath, fileContents);

    return result;
  }

  private async loadFileContent(
    filepath: string,
    content: string | null,
  ): Promise<LoadedFileContent> {
    if (content === null) {
      return null;
    }
    if (content.trim() === '') {
      return undefined;
    }
    const loader = this.getLoaderEntryForFile(filepath);
    const loaderResult = await loader(filepath, content);
    return loaderResult;
  }

  private async createCosmiconfigResult(
    filepath: string,
    content: string | null,
  ): Promise<CosmiconfigResult> {
    const fileContent = await this.loadFileContent(filepath, content);
    const result = this.loadedContentToCosmiconfigResult(filepath, fileContent);

    return result;
  }

  public async load(filepath: string): Promise<CosmiconfigResult> {
    if (!this.config.fs) {
      return emptyResults;
    }

    this.validateFilePath(filepath);
    const absoluteFilePath = path.resolve(this.config.fs.cwd(), filepath);

    const runLoad = async (): Promise<CosmiconfigResult> => {
      if (!this.config.fs) {
        return emptyResults;
      }

      const fileContents = await this.config.fs.readFile(absoluteFilePath);

      const result = await this.createCosmiconfigResult(
        absoluteFilePath,
        fileContents,
      );

      const transformResult = await this.config.transform(result);

      return transformResult;
    };

    if (this.loadCache) {
      return cacheWrapper(this.loadCache, absoluteFilePath, runLoad);
    }

    return runLoad();
  }
}

export { Explorer };
