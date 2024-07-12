/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ButtonProps } from "./components/internal/orama-button/orama-button";
import { TChatMessage } from "./context/chatContext";
import { InputProps } from "./components/internal/orama-input/orama-input";
import { SearchItem, SearchResultsProps } from "./components/internal/orama-search-results/orama-search-results";
import { TextProps } from "./components/internal/orama-text/orama-text";
export { ButtonProps } from "./components/internal/orama-button/orama-button";
export { TChatMessage } from "./context/chatContext";
export { InputProps } from "./components/internal/orama-input/orama-input";
export { SearchItem, SearchResultsProps } from "./components/internal/orama-search-results/orama-search-results";
export { TextProps } from "./components/internal/orama-text/orama-text";
export namespace Components {
    interface OramaButton {
        "as"?: ButtonProps['as'];
        "class"?: string;
        "type"?: ButtonProps['type'];
        "variant"?: ButtonProps['variant'];
    }
    interface OramaChat {
    }
    interface OramaChatAssistentMessage {
        "message": TChatMessage;
    }
    interface OramaChatMessagesContainer {
    }
    interface OramaChatUserMessage {
        "message": TChatMessage;
    }
    interface OramaFacets {
        "facets": any[];
    }
    interface OramaInput {
        "defaultValue": InputProps['defaultValue'];
        "label"?: InputProps['label'];
        "labelForScreenReaders"?: InputProps['labelForScreenReaders'];
        "name": InputProps['name'];
        "placeholder"?: InputProps['placeholder'];
        "size"?: InputProps['size'];
        "type"?: InputProps['type'];
    }
    interface OramaSearch {
    }
    interface OramaSearchResults {
        "items": SearchResultsProps['items'];
        "searchTerm": SearchResultsProps['searchTerm'];
    }
    interface OramaText {
        /**
          * optionally change text alignment
         */
        "align"?: TextProps['align'];
        /**
          * it defines the HTML tag to be used
         */
        "as"?: TextProps['as'];
        /**
          * the optional class name
         */
        "class"?: string;
        /**
          * it defines how it should look like
         */
        "styledAs"?: TextProps['styledAs'];
    }
    interface OramaTextarea {
        "autoFocus": boolean;
        "maxRows": number | string;
        "minRows": number | string;
        "placeholder": string;
        "value": string | null;
    }
    interface OramaToggler {
        "performInitialAnimation": boolean;
    }
    interface SearchBox {
        "color": 'dark' | 'light' | 'system';
        "facetProperty": string;
        "open": false;
        "themeConfig": { colors: { light: { primaryColor: string }; dark: { primaryColor: string } } };
    }
    interface SearchBoxToggler {
    }
}
export interface OramaInputCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLOramaInputElement;
}
export interface OramaSearchResultsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLOramaSearchResultsElement;
}
declare global {
    interface HTMLOramaButtonElement extends Components.OramaButton, HTMLStencilElement {
    }
    var HTMLOramaButtonElement: {
        prototype: HTMLOramaButtonElement;
        new (): HTMLOramaButtonElement;
    };
    interface HTMLOramaChatElement extends Components.OramaChat, HTMLStencilElement {
    }
    var HTMLOramaChatElement: {
        prototype: HTMLOramaChatElement;
        new (): HTMLOramaChatElement;
    };
    interface HTMLOramaChatAssistentMessageElement extends Components.OramaChatAssistentMessage, HTMLStencilElement {
    }
    var HTMLOramaChatAssistentMessageElement: {
        prototype: HTMLOramaChatAssistentMessageElement;
        new (): HTMLOramaChatAssistentMessageElement;
    };
    interface HTMLOramaChatMessagesContainerElement extends Components.OramaChatMessagesContainer, HTMLStencilElement {
    }
    var HTMLOramaChatMessagesContainerElement: {
        prototype: HTMLOramaChatMessagesContainerElement;
        new (): HTMLOramaChatMessagesContainerElement;
    };
    interface HTMLOramaChatUserMessageElement extends Components.OramaChatUserMessage, HTMLStencilElement {
    }
    var HTMLOramaChatUserMessageElement: {
        prototype: HTMLOramaChatUserMessageElement;
        new (): HTMLOramaChatUserMessageElement;
    };
    interface HTMLOramaFacetsElement extends Components.OramaFacets, HTMLStencilElement {
    }
    var HTMLOramaFacetsElement: {
        prototype: HTMLOramaFacetsElement;
        new (): HTMLOramaFacetsElement;
    };
    interface HTMLOramaInputElementEventMap {
        "oramaInputChanged": string;
    }
    interface HTMLOramaInputElement extends Components.OramaInput, HTMLStencilElement {
        addEventListener<K extends keyof HTMLOramaInputElementEventMap>(type: K, listener: (this: HTMLOramaInputElement, ev: OramaInputCustomEvent<HTMLOramaInputElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLOramaInputElementEventMap>(type: K, listener: (this: HTMLOramaInputElement, ev: OramaInputCustomEvent<HTMLOramaInputElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLOramaInputElement: {
        prototype: HTMLOramaInputElement;
        new (): HTMLOramaInputElement;
    };
    interface HTMLOramaSearchElement extends Components.OramaSearch, HTMLStencilElement {
    }
    var HTMLOramaSearchElement: {
        prototype: HTMLOramaSearchElement;
        new (): HTMLOramaSearchElement;
    };
    interface HTMLOramaSearchResultsElementEventMap {
        "oramaItemClick": SearchItem;
    }
    interface HTMLOramaSearchResultsElement extends Components.OramaSearchResults, HTMLStencilElement {
        addEventListener<K extends keyof HTMLOramaSearchResultsElementEventMap>(type: K, listener: (this: HTMLOramaSearchResultsElement, ev: OramaSearchResultsCustomEvent<HTMLOramaSearchResultsElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLOramaSearchResultsElementEventMap>(type: K, listener: (this: HTMLOramaSearchResultsElement, ev: OramaSearchResultsCustomEvent<HTMLOramaSearchResultsElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLOramaSearchResultsElement: {
        prototype: HTMLOramaSearchResultsElement;
        new (): HTMLOramaSearchResultsElement;
    };
    interface HTMLOramaTextElement extends Components.OramaText, HTMLStencilElement {
    }
    var HTMLOramaTextElement: {
        prototype: HTMLOramaTextElement;
        new (): HTMLOramaTextElement;
    };
    interface HTMLOramaTextareaElement extends Components.OramaTextarea, HTMLStencilElement {
    }
    var HTMLOramaTextareaElement: {
        prototype: HTMLOramaTextareaElement;
        new (): HTMLOramaTextareaElement;
    };
    interface HTMLOramaTogglerElement extends Components.OramaToggler, HTMLStencilElement {
    }
    var HTMLOramaTogglerElement: {
        prototype: HTMLOramaTogglerElement;
        new (): HTMLOramaTogglerElement;
    };
    interface HTMLSearchBoxElement extends Components.SearchBox, HTMLStencilElement {
    }
    var HTMLSearchBoxElement: {
        prototype: HTMLSearchBoxElement;
        new (): HTMLSearchBoxElement;
    };
    interface HTMLSearchBoxTogglerElement extends Components.SearchBoxToggler, HTMLStencilElement {
    }
    var HTMLSearchBoxTogglerElement: {
        prototype: HTMLSearchBoxTogglerElement;
        new (): HTMLSearchBoxTogglerElement;
    };
    interface HTMLElementTagNameMap {
        "orama-button": HTMLOramaButtonElement;
        "orama-chat": HTMLOramaChatElement;
        "orama-chat-assistent-message": HTMLOramaChatAssistentMessageElement;
        "orama-chat-messages-container": HTMLOramaChatMessagesContainerElement;
        "orama-chat-user-message": HTMLOramaChatUserMessageElement;
        "orama-facets": HTMLOramaFacetsElement;
        "orama-input": HTMLOramaInputElement;
        "orama-search": HTMLOramaSearchElement;
        "orama-search-results": HTMLOramaSearchResultsElement;
        "orama-text": HTMLOramaTextElement;
        "orama-textarea": HTMLOramaTextareaElement;
        "orama-toggler": HTMLOramaTogglerElement;
        "search-box": HTMLSearchBoxElement;
        "search-box-toggler": HTMLSearchBoxTogglerElement;
    }
}
declare namespace LocalJSX {
    interface OramaButton {
        "as"?: ButtonProps['as'];
        "class"?: string;
        "type"?: ButtonProps['type'];
        "variant"?: ButtonProps['variant'];
    }
    interface OramaChat {
    }
    interface OramaChatAssistentMessage {
        "message"?: TChatMessage;
    }
    interface OramaChatMessagesContainer {
    }
    interface OramaChatUserMessage {
        "message"?: TChatMessage;
    }
    interface OramaFacets {
        "facets"?: any[];
    }
    interface OramaInput {
        "defaultValue"?: InputProps['defaultValue'];
        "label"?: InputProps['label'];
        "labelForScreenReaders"?: InputProps['labelForScreenReaders'];
        "name"?: InputProps['name'];
        "onOramaInputChanged"?: (event: OramaInputCustomEvent<string>) => void;
        "placeholder"?: InputProps['placeholder'];
        "size"?: InputProps['size'];
        "type"?: InputProps['type'];
    }
    interface OramaSearch {
    }
    interface OramaSearchResults {
        "items"?: SearchResultsProps['items'];
        "onOramaItemClick"?: (event: OramaSearchResultsCustomEvent<SearchItem>) => void;
        "searchTerm"?: SearchResultsProps['searchTerm'];
    }
    interface OramaText {
        /**
          * optionally change text alignment
         */
        "align"?: TextProps['align'];
        /**
          * it defines the HTML tag to be used
         */
        "as"?: TextProps['as'];
        /**
          * the optional class name
         */
        "class"?: string;
        /**
          * it defines how it should look like
         */
        "styledAs"?: TextProps['styledAs'];
    }
    interface OramaTextarea {
        "autoFocus"?: boolean;
        "maxRows"?: number | string;
        "minRows"?: number | string;
        "placeholder"?: string;
        "value"?: string | null;
    }
    interface OramaToggler {
        "performInitialAnimation"?: boolean;
    }
    interface SearchBox {
        "color"?: 'dark' | 'light' | 'system';
        "facetProperty"?: string;
        "open"?: false;
        "themeConfig"?: { colors: { light: { primaryColor: string }; dark: { primaryColor: string } } };
    }
    interface SearchBoxToggler {
    }
    interface IntrinsicElements {
        "orama-button": OramaButton;
        "orama-chat": OramaChat;
        "orama-chat-assistent-message": OramaChatAssistentMessage;
        "orama-chat-messages-container": OramaChatMessagesContainer;
        "orama-chat-user-message": OramaChatUserMessage;
        "orama-facets": OramaFacets;
        "orama-input": OramaInput;
        "orama-search": OramaSearch;
        "orama-search-results": OramaSearchResults;
        "orama-text": OramaText;
        "orama-textarea": OramaTextarea;
        "orama-toggler": OramaToggler;
        "search-box": SearchBox;
        "search-box-toggler": SearchBoxToggler;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "orama-button": LocalJSX.OramaButton & JSXBase.HTMLAttributes<HTMLOramaButtonElement>;
            "orama-chat": LocalJSX.OramaChat & JSXBase.HTMLAttributes<HTMLOramaChatElement>;
            "orama-chat-assistent-message": LocalJSX.OramaChatAssistentMessage & JSXBase.HTMLAttributes<HTMLOramaChatAssistentMessageElement>;
            "orama-chat-messages-container": LocalJSX.OramaChatMessagesContainer & JSXBase.HTMLAttributes<HTMLOramaChatMessagesContainerElement>;
            "orama-chat-user-message": LocalJSX.OramaChatUserMessage & JSXBase.HTMLAttributes<HTMLOramaChatUserMessageElement>;
            "orama-facets": LocalJSX.OramaFacets & JSXBase.HTMLAttributes<HTMLOramaFacetsElement>;
            "orama-input": LocalJSX.OramaInput & JSXBase.HTMLAttributes<HTMLOramaInputElement>;
            "orama-search": LocalJSX.OramaSearch & JSXBase.HTMLAttributes<HTMLOramaSearchElement>;
            "orama-search-results": LocalJSX.OramaSearchResults & JSXBase.HTMLAttributes<HTMLOramaSearchResultsElement>;
            "orama-text": LocalJSX.OramaText & JSXBase.HTMLAttributes<HTMLOramaTextElement>;
            "orama-textarea": LocalJSX.OramaTextarea & JSXBase.HTMLAttributes<HTMLOramaTextareaElement>;
            "orama-toggler": LocalJSX.OramaToggler & JSXBase.HTMLAttributes<HTMLOramaTogglerElement>;
            "search-box": LocalJSX.SearchBox & JSXBase.HTMLAttributes<HTMLSearchBoxElement>;
            "search-box-toggler": LocalJSX.SearchBoxToggler & JSXBase.HTMLAttributes<HTMLSearchBoxTogglerElement>;
        }
    }
}
