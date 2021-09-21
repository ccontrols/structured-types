/* eslint-disable @typescript-eslint/no-namespace */
namespace ts {
  export enum DiagnosticCategory {
    Warning = 0,
    Error = 1,
    Suggestion = 2,
    Message = 3,
  }
}
/**
 * diagnostics row data
 */
export type PropDiagnostic = {
  /**
   * error category
   */
  category: ts.DiagnosticCategory;
};
