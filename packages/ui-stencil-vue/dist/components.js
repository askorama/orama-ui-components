import { defineContainer } from './vue-component-lib/utils';
export const OramaChat = defineContainer('orama-chat', undefined);
export const OramaChatAssistentMessage = defineContainer('orama-chat-assistent-message', undefined, [
    'message'
]);
export const OramaChatMessagesContainer = defineContainer('orama-chat-messages-container', undefined);
export const OramaChatUserMessage = defineContainer('orama-chat-user-message', undefined, [
    'message'
]);
export const OramaInput = defineContainer('orama-input', undefined, [
    'name',
    'size',
    'label',
    'type',
    'labelForScreenReaders'
]);
export const OramaSearch = defineContainer('orama-search', undefined);
export const OramaText = defineContainer('orama-text', undefined, [
    'as',
    'styledAs',
    'class'
]);
export const OramaTextarea = defineContainer('orama-textarea', undefined, [
    'value',
    'maxRows',
    'minRows',
    'placeholder',
    'autoFocus'
]);
export const SearchBox = defineContainer('search-box', undefined, [
    'themeConfig',
    'color',
    'open'
]);
export const SearchBoxToggler = defineContainer('search-box-toggler', undefined);
//# sourceMappingURL=components.js.map