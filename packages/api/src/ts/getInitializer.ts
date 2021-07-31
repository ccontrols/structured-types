import * as ts from 'typescript';
import { isVariableLikeDeclaration } from '../ts-utils';

export const getInitializer = (
  declaration?: ts.Node,
): ts.Expression | undefined =>
  declaration
    ? isVariableLikeDeclaration(declaration)
      ? declaration?.initializer
      : ts.isBinaryExpression(declaration.parent)
      ? declaration.parent.right
      : undefined
    : undefined;
