/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface OramaParagraph {
        "as"?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    }
    interface SearchBox {
        "color": 'dark' | 'light' | 'system';
        "themeConfig": { colors: { light: { primaryColor: string }; dark: { primaryColor: string } } };
    }
}
declare global {
    interface HTMLOramaParagraphElement extends Components.OramaParagraph, HTMLStencilElement {
    }
    var HTMLOramaParagraphElement: {
        prototype: HTMLOramaParagraphElement;
        new (): HTMLOramaParagraphElement;
    };
    interface HTMLSearchBoxElement extends Components.SearchBox, HTMLStencilElement {
    }
    var HTMLSearchBoxElement: {
        prototype: HTMLSearchBoxElement;
        new (): HTMLSearchBoxElement;
    };
    interface HTMLElementTagNameMap {
        "orama-paragraph": HTMLOramaParagraphElement;
        "search-box": HTMLSearchBoxElement;
    }
}
declare namespace LocalJSX {
    interface OramaParagraph {
        "as"?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    }
    interface SearchBox {
        "color"?: 'dark' | 'light' | 'system';
        "themeConfig"?: { colors: { light: { primaryColor: string }; dark: { primaryColor: string } } };
    }
    interface IntrinsicElements {
        "orama-paragraph": OramaParagraph;
        "search-box": SearchBox;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "orama-paragraph": LocalJSX.OramaParagraph & JSXBase.HTMLAttributes<HTMLOramaParagraphElement>;
            "search-box": LocalJSX.SearchBox & JSXBase.HTMLAttributes<HTMLSearchBoxElement>;
        }
    }
}
