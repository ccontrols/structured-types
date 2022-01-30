import path from 'path';
import ts from 'typescript';
import { parseFiles, getSymbolDeclaration } from '../../../src/index';

export const EXPORT_ALL = '*';
export const EXPORT_DEFAULT = 'default';
export const IMPORT_NAMESPACE = 'namespace';
export interface ImportType {
  name: string;
  /**
   * importedName - the original named import that was aliased
   */
  importedName: typeof EXPORT_DEFAULT | typeof IMPORT_NAMESPACE | string;
  /**
   * imported from
   */
  from: string;
}

let imports: ImportType[] = [];
const moduleCallback = (module: ts.Symbol, checker: ts.TypeChecker) => {
  const declaration = getSymbolDeclaration(module);

  if (declaration) {
    ts.forEachChild(declaration, (node: ts.Node) => {
      if (ts.isImportDeclaration(node)) {
        if (node.importClause) {
          let from =
            'text' in node.moduleSpecifier
              ? (node.moduleSpecifier as any).text
              : node.moduleSpecifier.getText();
          const ext = path.extname(from);
          if (ext.length <= 0) {
            const symbol = checker.getSymbolAtLocation(node.moduleSpecifier);
            const declaration = getSymbolDeclaration(symbol);
            if (declaration && ts.isSourceFile(declaration)) {
              const ext = path.extname(declaration.fileName);
              if (ext.length) {
                from = `${from}${ext}`;
              }
            }
          }

          node.importClause.namedBindings?.forEachChild((e) => {
            if (ts.isImportSpecifier(e)) {
              imports.push({
                name: e.name.text,
                from,
                importedName: e.propertyName?.text || e.name.text,
              });
            } else if (ts.isIdentifier(e)) {
              imports.push({
                name: e.text,
                from,
                importedName: EXPORT_DEFAULT,
              });
            }
          });
          if (node.importClause.name) {
            imports.push({
              importedName: EXPORT_DEFAULT,
              from,
              name: node.importClause.name.text,
            });
          }
        }
      } else if (ts.isVariableStatement(node)) {
        const declarations = node.declarationList;
        declarations.forEachChild((d) => {
          if (
            ts.isVariableDeclaration(d) &&
            d.initializer &&
            ts.isCallExpression(d.initializer) &&
            ts.isIdentifier(d.initializer.expression) &&
            d.initializer.expression.text === 'require'
          ) {
            if (d.initializer.arguments.length) {
              const from = d.initializer.arguments[0];
              if (ts.isStringLiteral(from)) {
                if (ts.isIdentifier(d.name)) {
                  imports.push({
                    name: d.name.text,
                    from: from.text,
                    importedName: EXPORT_DEFAULT,
                  });
                } else if (ts.isBindingName(d.name)) {
                  d.name.elements.forEach((e) => {
                    if (ts.isBindingElement(e)) {
                      const name = e.name;
                      if (ts.isIdentifier(name)) {
                        imports.push({
                          name: name.text,
                          from: from.text,
                          importedName:
                            e.propertyName && ts.isIdentifier(e.propertyName)
                              ? e.propertyName.text
                              : name.text,
                        });
                      }
                    }
                  });
                }
              }
            }
          }
        });
      }
    });
  }
};
describe('file-callback', () => {
  it('namespace-import', () => {
    imports = [];
    parseFiles([path.resolve(__dirname, 'namespace-import.ts')], {
      moduleCallback,
    });
    expect(imports).toEqual([
      {
        name: 'NameSpace',
        from: './export-namespace.ts',
        importedName: 'NameSpace',
      },
      {
        importedName: 'default',
        from: './export-namespace.ts',
        name: 'default_namespace',
      },
    ]);
  });
  it('named-import', () => {
    imports = [];
    parseFiles([path.resolve(__dirname, 'named-import.ts')], {
      moduleCallback,
    });
    expect(imports).toEqual([
      {
        name: 'chmodSync',
        from: 'fs',
        importedName: 'chmodSync',
      },
      {
        name: 'DirName',
        from: 'path',
        importedName: 'dirname',
      },
      {
        name: 'chmod',
        from: 'fs',
        importedName: 'chmod',
      },
      {
        name: 'ExtName',
        from: 'path',
        importedName: 'extname',
      },
    ]);
  });
  it('default-import', () => {
    imports = [];
    parseFiles([path.resolve(__dirname, 'default-import.ts')], {
      moduleCallback,
    });
    expect(imports).toEqual([
      {
        name: 'fileSystem',
        from: 'fs',
        importedName: 'default',
      },
      {
        importedName: 'default',
        from: 'path',
        name: 'path',
      },
      {
        importedName: 'default',
        from: 'ts',
        name: 'typescript',
      },
    ]);
  });
});
