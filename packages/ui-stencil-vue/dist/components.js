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
    'placeholder',
    'size',
    'label',
    'labelForScreenReaders'
]);
export const OramaParagraph = defineContainer('orama-paragraph', undefined, [
    'as',
    'class'
]);
export const OramaSearch = defineContainer('orama-search', undefined);
export const OramaSmall = defineContainer('orama-small', undefined, [
    'as'
]);
export const OramaSpan = defineContainer('orama-span', undefined, [
    'as',
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