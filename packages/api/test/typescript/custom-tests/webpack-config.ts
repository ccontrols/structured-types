import { Configuration } from 'webpack';

export interface FullAnimal {
  webpackConfig?: () => Pick<Configuration, 'watchOptions'>;
}

export type NameOnly = FullAnimal;
