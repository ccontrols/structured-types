import * as ts from 'typescript';
import { isVariableLikeDeclaration } from '../ts-utils';

export const getInitializer = (
  declaration?: ts.Node,
): ts.Expression | undefined => {
  if (declaration) {
    if (isVariableLikeDeclaration(declaration)) {
      return declaration.initializer;
    }
    if (declaration.parent && ts.isBinaryExpression(declaration.parent)) {
      return declaration.parent.right;
    }
  }
  return undefined;
};
