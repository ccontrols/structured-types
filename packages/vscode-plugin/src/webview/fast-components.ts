import {
  provideFASTDesignSystem,
  fastTreeItem,
  fastTreeView,
  treeItemStyles,
  treeViewStyles,
} from '@microsoft/fast-components';
import { css } from '@microsoft/fast-element';

provideFASTDesignSystem().register(
  fastTreeItem({
    styles: (ctx, def) => css`
      ${treeItemStyles(ctx, def as any)}
      :host {
        background: transparent;
        color: var(--vscode-foreground);
        --expand-collapse-button-size: calc(
          (var(--base-height-multiplier) * 2) * 1px
        );
      }
      ::slotted(fast-tree-item) {
        --tree-item-nested-width: 0.4em;
      }
      .content-region {
        align-items: start;
      }
      .positioning-region {
        height: calc(
          ((var(--design-unit) + var(--density)) * var(--design-unit) + 1) * 1px
        );
      }
      :host(.nested) .content-region {
        margin-inline-start: 1;
      }
      .positioning-region:hover {
        background: transparent;
      }
      :host(.nested) .expand-collapse-button:hover,
      :host([selected]) .positioning-region {
        background: transparent;
      }
    `,
  }),
  fastTreeView({
    styles: (ctx, def) => css`
      ${treeViewStyles(ctx, def as any)}
      :host {
        background: transparent;
        color: var(--vscode-foreground);
      }
    `,
  }),
);

document.documentElement.style.setProperty('--base-height-multiplier', '8');
