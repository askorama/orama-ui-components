/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ButtonProps } from "./components/internal/orama-button/orama-button";
import { TChatMessage } from "./context/chatContext";
import { CloudIndexConfig, ResultMap, SearchResult, SearchResultBySection } from "./types/index";
import { Facet } from "./components/internal/orama-facets/orama-facets";
import { InputProps } from "./components/internal/orama-input/orama-input";
import { TThemeOverrides } from "./config/theme";
import { SearchResultsProps } from "./components/internal/orama-search-results/orama-search-results";
import { TextProps } from "./components/internal/orama-text/orama-text";
export { ButtonProps } from "./components/internal/orama-button/orama-button";
export { TChatMessage } from "./context/chatContext";
export { CloudIndexConfig, ResultMap, SearchResult, SearchResultBySection } from "./types/index";
export { Facet } from "./components/internal/orama-facets/orama-facets";
export { InputProps } from "./components/internal/orama-input/orama-input";
export { TThemeOverrides } from "./config/theme";
export { SearchResultsProps } from "./components/internal/orama-search-results/orama-search-results";
export { TextProps } from "./components/internal/orama-text/orama-text";
export namespace Components {
    interface OramaButton {
        "as"?: ButtonProps['as'];
        "class"?: string;
        "disabled"?: boolean;
        "type"?: ButtonProps['type'];
        "variant"?: ButtonProps['variant'];
    }
    interface OramaChat {
    }
    interface OramaChatAssistentMessage {
        "message": TChatMessage;
    }
    interface OramaChatBox {
        "index": CloudIndexConfig;
    }
    interface OramaChatMessagesContainer {
    }
    interface OramaChatSuggestions {
        "suggestionClicked": (suggestion: string) => void;
        "suggestions": string[];
    }
    interface OramaChatUserMessage {
        "message": TChatMessage;
    }
    interface OramaDotsLoader {
    }
    interface OramaFacets {
        "facetClicked": (facetName: string) => void;
        "facets": Facet[];
        "selectedFacet": string;
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
    interface OramaLogoIcon {
        "size": number;
    }
    interface OramaMarkdown {
        "content": string;
    }
    interface OramaNavigationBar {
    }
    interface OramaSearch {
    }
    interface OramaSearchBox {
        "cloudIndex": CloudIndexConfig;
        "colorScheme"?: 'dark' | 'light' | 'system';
        "facetProperty"?: string;
        "open"?: boolean;
        "resultMap"?: Partial<ResultMap>;
        "themeConfig"?: Partial<TThemeOverrides>;
    }
    interface OramaSearchButton {
    }
    interface OramaSearchResults {
        "error": boolean;
        "loading": boolean;
        "searchTerm": SearchResultsProps['searchTerm'];
        "sections": SearchResultBySection[];
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
    interface HTMLOramaChatBoxElement extends Components.OramaChatBox, HTMLStencilElement {
    }
    var HTMLOramaChatBoxElement: {
        prototype: HTMLOramaChatBoxElement;
        new (): HTMLOramaChatBoxElement;
    };
    interface HTMLOramaChatMessagesContainerElement extends Components.OramaChatMessagesContainer, HTMLStencilElement {
    }
    var HTMLOramaChatMessagesContainerElement: {
        prototype: HTMLOramaChatMessagesContainerElement;
        new (): HTMLOramaChatMessagesContainerElement;
    };
    interface HTMLOramaChatSuggestionsElement extends Components.OramaChatSuggestions, HTMLStencilElement {
    }
    var HTMLOramaChatSuggestionsElement: {
        prototype: HTMLOramaChatSuggestionsElement;
        new (): HTMLOramaChatSuggestionsElement;
    };
    interface HTMLOramaChatUserMessageElement extends Components.OramaChatUserMessage, HTMLStencilElement {
    }
    var HTMLOramaChatUserMessageElement: {
        prototype: HTMLOramaChatUserMessageElement;
        new (): HTMLOramaChatUserMessageElement;
    };
    interface HTMLOramaDotsLoaderElement extends Components.OramaDotsLoader, HTMLStencilElement {
    }
    var HTMLOramaDotsLoaderElement: {
        prototype: HTMLOramaDotsLoaderElement;
        new (): HTMLOramaDotsLoaderElement;
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
    interface HTMLOramaLogoIconElement extends Components.OramaLogoIcon, HTMLStencilElement {
    }
    var HTMLOramaLogoIconElement: {
        prototype: HTMLOramaLogoIconElement;
        new (): HTMLOramaLogoIconElement;
    };
    interface HTMLOramaMarkdownElement extends Components.OramaMarkdown, HTMLStencilElement {
    }
    var HTMLOramaMarkdownElement: {
        prototype: HTMLOramaMarkdownElement;
        new (): HTMLOramaMarkdownElement;
    };
    interface HTMLOramaNavigationBarElement extends Components.OramaNavigationBar, HTMLStencilElement {
    }
    var HTMLOramaNavigationBarElement: {
        prototype: HTMLOramaNavigationBarElement;
        new (): HTMLOramaNavigationBarElement;
    };
    interface HTMLOramaSearchElement extends Components.OramaSearch, HTMLStencilElement {
    }
    var HTMLOramaSearchElement: {
        prototype: HTMLOramaSearchElement;
        new (): HTMLOramaSearchElement;
    };
    interface HTMLOramaSearchBoxElement extends Components.OramaSearchBox, HTMLStencilElement {
    }
    var HTMLOramaSearchBoxElement: {
        prototype: HTMLOramaSearchBoxElement;
        new (): HTMLOramaSearchBoxElement;
    };
    interface HTMLOramaSearchButtonElement extends Components.OramaSearchButton, HTMLStencilElement {
    }
    var HTMLOramaSearchButtonElement: {
        prototype: HTMLOramaSearchButtonElement;
        new (): HTMLOramaSearchButtonElement;
    };
    interface HTMLOramaSearchResultsElementEventMap {
        "oramaItemClick": SearchResult;
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
    interface HTMLElementTagNameMap {
        "orama-button": HTMLOramaButtonElement;
        "orama-chat": HTMLOramaChatElement;
        "orama-chat-assistent-message": HTMLOramaChatAssistentMessageElement;
        "orama-chat-box": HTMLOramaChatBoxElement;
        "orama-chat-messages-container": HTMLOramaChatMessagesContainerElement;
        "orama-chat-suggestions": HTMLOramaChatSuggestionsElement;
        "orama-chat-user-message": HTMLOramaChatUserMessageElement;
        "orama-dots-loader": HTMLOramaDotsLoaderElement;
        "orama-facets": HTMLOramaFacetsElement;
        "orama-input": HTMLOramaInputElement;
        "orama-logo-icon": HTMLOramaLogoIconElement;
        "orama-markdown": HTMLOramaMarkdownElement;
        "orama-navigation-bar": HTMLOramaNavigationBarElement;
        "orama-search": HTMLOramaSearchElement;
        "orama-search-box": HTMLOramaSearchBoxElement;
        "orama-search-button": HTMLOramaSearchButtonElement;
        "orama-search-results": HTMLOramaSearchResultsElement;
        "orama-text": HTMLOramaTextElement;
        "orama-textarea": HTMLOramaTextareaElement;
        "orama-toggler": HTMLOramaTogglerElement;
    }
}
declare namespace LocalJSX {
    interface OramaButton {
        "as"?: ButtonProps['as'];
        "class"?: string;
        "disabled"?: boolean;
        "type"?: ButtonProps['type'];
        "variant"?: ButtonProps['variant'];
    }
    interface OramaChat {
    }
    interface OramaChatAssistentMessage {
        "message"?: TChatMessage;
    }
    interface OramaChatBox {
        "index"?: CloudIndexConfig;
    }
    interface OramaChatMessagesContainer {
    }
    interface OramaChatSuggestions {
        "suggestionClicked"?: (suggestion: string) => void;
        "suggestions"?: string[];
    }
    interface OramaChatUserMessage {
        "message"?: TChatMessage;
    }
    interface OramaDotsLoader {
    }
    interface OramaFacets {
        "facetClicked"?: (facetName: string) => void;
        "facets"?: Facet[];
        "selectedFacet"?: string;
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
    interface OramaLogoIcon {
        "size"?: number;
    }
    interface OramaMarkdown {
        "content"?: string;
    }
    interface OramaNavigationBar {
    }
    interface OramaSearch {
    }
    interface OramaSearchBox {
        "cloudIndex"?: CloudIndexConfig;
        "colorScheme"?: 'dark' | 'light' | 'system';
        "facetProperty"?: string;
        "open"?: boolean;
        "resultMap"?: Partial<ResultMap>;
        "themeConfig"?: Partial<TThemeOverrides>;
    }
    interface OramaSearchButton {
    }
    interface OramaSearchResults {
        "error"?: boolean;
        "loading"?: boolean;
        "onOramaItemClick"?: (event: OramaSearchResultsCustomEvent<SearchResult>) => void;
        "searchTerm"?: SearchResultsProps['searchTerm'];
        "sections"?: SearchResultBySection[];
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
    interface IntrinsicElements {
        "orama-button": OramaButton;
        "orama-chat": OramaChat;
        "orama-chat-assistent-message": OramaChatAssistentMessage;
        "orama-chat-box": OramaChatBox;
        "orama-chat-messages-container": OramaChatMessagesContainer;
        "orama-chat-suggestions": OramaChatSuggestions;
        "orama-chat-user-message": OramaChatUserMessage;
        "orama-dots-loader": OramaDotsLoader;
        "orama-facets": OramaFacets;
        "orama-input": OramaInput;
        "orama-logo-icon": OramaLogoIcon;
        "orama-markdown": OramaMarkdown;
        "orama-navigation-bar": OramaNavigationBar;
        "orama-search": OramaSearch;
        "orama-search-box": OramaSearchBox;
        "orama-search-button": OramaSearchButton;
        "orama-search-results": OramaSearchResults;
        "orama-text": OramaText;
        "orama-textarea": OramaTextarea;
        "orama-toggler": OramaToggler;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "orama-button": LocalJSX.OramaButton & JSXBase.HTMLAttributes<HTMLOramaButtonElement>;
            "orama-chat": LocalJSX.OramaChat & JSXBase.HTMLAttributes<HTMLOramaChatElement>;
            "orama-chat-assistent-message": LocalJSX.OramaChatAssistentMessage & JSXBase.HTMLAttributes<HTMLOramaChatAssistentMessageElement>;
            "orama-chat-box": LocalJSX.OramaChatBox & JSXBase.HTMLAttributes<HTMLOramaChatBoxElement>;
            "orama-chat-messages-container": LocalJSX.OramaChatMessagesContainer & JSXBase.HTMLAttributes<HTMLOramaChatMessagesContainerElement>;
            "orama-chat-suggestions": LocalJSX.OramaChatSuggestions & JSXBase.HTMLAttributes<HTMLOramaChatSuggestionsElement>;
            "orama-chat-user-message": LocalJSX.OramaChatUserMessage & JSXBase.HTMLAttributes<HTMLOramaChatUserMessageElement>;
            "orama-dots-loader": LocalJSX.OramaDotsLoader & JSXBase.HTMLAttributes<HTMLOramaDotsLoaderElement>;
            "orama-facets": LocalJSX.OramaFacets & JSXBase.HTMLAttributes<HTMLOramaFacetsElement>;
            "orama-input": LocalJSX.OramaInput & JSXBase.HTMLAttributes<HTMLOramaInputElement>;
            "orama-logo-icon": LocalJSX.OramaLogoIcon & JSXBase.HTMLAttributes<HTMLOramaLogoIconElement>;
            "orama-markdown": LocalJSX.OramaMarkdown & JSXBase.HTMLAttributes<HTMLOramaMarkdownElement>;
            "orama-navigation-bar": LocalJSX.OramaNavigationBar & JSXBase.HTMLAttributes<HTMLOramaNavigationBarElement>;
            "orama-search": LocalJSX.OramaSearch & JSXBase.HTMLAttributes<HTMLOramaSearchElement>;
            "orama-search-box": LocalJSX.OramaSearchBox & JSXBase.HTMLAttributes<HTMLOramaSearchBoxElement>;
            "orama-search-button": LocalJSX.OramaSearchButton & JSXBase.HTMLAttributes<HTMLOramaSearchButtonElement>;
            "orama-search-results": LocalJSX.OramaSearchResults & JSXBase.HTMLAttributes<HTMLOramaSearchResultsElement>;
            "orama-text": LocalJSX.OramaText & JSXBase.HTMLAttributes<HTMLOramaTextElement>;
            "orama-textarea": LocalJSX.OramaTextarea & JSXBase.HTMLAttributes<HTMLOramaTextareaElement>;
            "orama-toggler": LocalJSX.OramaToggler & JSXBase.HTMLAttributes<HTMLOramaTogglerElement>;
        }
    }
}
