import { Configuration } from 'webpack';

export interface FullAnimal {
  webpackConfig?: () => Configuration;
}

export type NameOnly = FullAnimal;
