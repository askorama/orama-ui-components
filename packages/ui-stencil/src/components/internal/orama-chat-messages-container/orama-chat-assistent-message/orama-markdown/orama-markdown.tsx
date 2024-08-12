import { SUPPORTED_HLJS_LANGUAGES_ARRAY } from '@/components/internal/SupportedHLJSLanguages'
import { Component, Element, Prop, Watch, h } from '@stencil/core'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js/lib/core'
import { marked } from 'marked'
import { DiffDOM, nodeToObj, stringToObj } from 'diff-dom'
// biome-ignore lint/suspicious/noExplicitAny: Let me be, TypeScript
;(window as any).hljs = hljs

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if ('href' in node) {
    node.setAttribute('target', '_parent')
    node.setAttribute('rel', 'noopener')
  }
})

const diffDom = new DiffDOM({
  preDiffApply: (info) => {
    debugger
    if (info.diff.action === 'removeTextElement') {
      const newValue = info.diff.newValue
      const oldValue = info.diff.oldValue
      const node = info.node

      const nodes = node.parentNode.getElementsByClassName('fade-in-text')

      for (const n of nodes) {
        n.remove()
      }
    } else if (info.diff.action === 'modifyTextElement') {
      const newValue = info.diff.newValue
      const oldValue = info.diff.oldValue
      const node = info.node

      let textDiff = ''

      if (newValue.startsWith(oldValue)) {
        textDiff = newValue.substring(oldValue.length)

        const span = document.createElement('span')
        span.classList.add('fade-in-text')
        span.innerText = textDiff

        if (node.nodeType === Node.TEXT_NODE) {
          // debugger
          node.parentNode.append(span)
          // node.data = newValue
        } else {
          node.data = newValue
        }
      } else {
        node.data = newValue
      }
      return true
    }
    debugger
    return false
  },
})

/**
 * In order to keep the bundle size small, we are loading the languages grammars by fecthing hljs's CDN dynamically.
 * This file is used as a in-memory static global variable to store the languages grammars references and fetching states.
 */
const SUPPORTED_HLJS_LANGUAGES = Object.fromEntries<{ error: boolean; retries: number }>(
  SUPPORTED_HLJS_LANGUAGES_ARRAY.map((language) => [language, { error: false, retries: 0 }]),
)

// This is used for the cases the a known language returned by the LLM
// should be highlighted as another language
const LANGUAGES_MAPPING: Record<string, string> = {
  html: 'xml',
}

marked.use({
  useNewRenderer: true,
  renderer: {
    code: (token) => {
      const mappedLanguage = LANGUAGES_MAPPING[token.lang] || token.lang
      // Some "languages" like HTML should be rendererd as XML. Reasons are still unclear.
      const actualLanguage = SUPPORTED_HLJS_LANGUAGES[mappedLanguage] ? mappedLanguage : 'plaintext'

      const pre = document.createElement('pre')
      pre.classList.add('orama-markdown-pre')
      const codeTitle = document.createElement('div')
      codeTitle.classList.add('orama-markdown-code-title')
      pre.appendChild(codeTitle)

      const code = document.createElement('code')
      code.classList.add('orama-markdown-code')
      code.classList.add(`language-${actualLanguage}`)
      code.classList.add('hljs')

      pre.appendChild(code)

      const hljsLanguage = hljs.getLanguage(actualLanguage)
      if (hljsLanguage) {
        if (actualLanguage === 'plaintext') {
          codeTitle.innerHTML = ''
        } else {
          codeTitle.innerHTML = hljsLanguage.name
        }
        code.innerHTML = hljs.highlight(token.text, { language: actualLanguage, ignoreIllegals: true }).value
        code.dataset.highlighted = 'yes'
      } else {
        codeTitle.innerHTML = ' '
        code.innerHTML = token.text
      }

      return pre.outerHTML
    },
    codespan: (token) => {
      const code = document.createElement('code')
      code.classList.add('orama-markdown-inline-code')
      code.innerHTML = token.text

      return code.outerHTML
    },
  },
})

/**
 *
 * @param language the language to load
 * @returns true if the language is available either from beeing successfully loaded or from being already loaded
 */
async function loadLanguageAndHighlight(language: string): Promise<boolean> {
  // TODO: Supported languages may be overkill. Evaluate if we can remove this to make bundler slimmer
  const localCachedLanguage = SUPPORTED_HLJS_LANGUAGES[language]

  if (!localCachedLanguage) {
    // Unsupported language
    return false
  }

  if (localCachedLanguage.error && localCachedLanguage.retries >= 5) {
    // Error too many retries
    return false
  }

  try {
    const response = await fetch(
      `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/languages/${language}.min.js`,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch ${language} language: ${response.statusText}`)
    }
    const scriptContent = await response.text()

    // TODO: We way need to check if the script is safe
    const loadScript = new Function(scriptContent)

    // hljs language grammar from CDN automatically registers the language
    await loadScript()

    if (!hljs.getLanguage(language)) {
      throw new Error(`Even after executing grammar script, ${language} language was not registered`)
    }

    // Just for consistency
    localCachedLanguage.retries = 0
    localCachedLanguage.error = false

    return true
  } catch (e) {
    localCachedLanguage.error = true
    localCachedLanguage.retries++

    return false
  }
}

@Component({
  tag: 'orama-markdown',
  styleUrl: 'orama-markdown.scss',
  shadow: true,
})
export class OramaMarkdown {
  @Prop() content: string
  divElement!: HTMLDivElement
  oldTree = document.createElement('div')
  @Element() markdownElement!: HTMLElement

  @Watch('content')
  async onContentChange() {
    await this.parseMarkdown()
  }

  async componentDidLoad() {
    await this.parseMarkdown()
  }

  parseMarkdown = async () => {
    if (!this.content) {
      return
    }

    // biome-ignore lint/suspicious/noMisleadingCharacterClass: No clear reason for this
    const noZeroWidthCharsContent = this.content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, '')
    const highlightedCode = await marked.parse(noZeroWidthCharsContent)

    const pedningBlocksByLanguage: Record<string, true> = {}

    const mk = this.markdownElement.shadowRoot.querySelectorAll('.orama-markdown-code')

    for (let i = 0; i < mk.length; i++) {
      const codeBlockRef = mk[i] as HTMLElement
      // Highlighted code blocks are marked with highlighted data attribute
      if (codeBlockRef.hasAttribute('data-highlighted')) {
        continue
      }

      const languageClassName = codeBlockRef.className.split(' ').find((className) => className.startsWith('language-'))
      const language = languageClassName.substring('language-'.length)

      pedningBlocksByLanguage[language] = true
    }

    for (const pendingLanguage of Object.keys(pedningBlocksByLanguage)) {
      // loadLanguageAndHighlight(pendingLanguage).then(() => {
      //   const parsedContent = marked.parse(noZeroWidthCharsContent)
      //   newTree.innerHTML = DOMPurify.sanitize(parsedContent)
      //   const differences = diffDom.diff(this.oldTree, newTree)
      //   diffDom.apply(this.divElement, differences)
      //   this.oldTree.innerHTML = DOMPurify.sanitize(highlightedCode)
      //   // this.divElement.innerHTML = DOMPurify.sanitize(parsedContent)
      // })
    }

    // console.log(marked.lexer(noZeroWidthCharsContent))

    const newTree = document.createElement('div')
    newTree.innerHTML = DOMPurify.sanitize(highlightedCode)
    // console.log(DOMPurify.sanitize(highlightedCode))

    // const obj1 = stringToObj(this.oldString)
    // const obj2 = stringToObj(`<div>${DOMPurify.sanitize(highlightedCode)`</div>`}`)

    const differences = diffDom.diff(this.oldTree, newTree)

    console.log(differences)

    diffDom.apply(this.divElement, differences)

    this.oldTree.innerHTML = DOMPurify.sanitize(highlightedCode)
  }

  render() {
    return (
      <host>
        {/* TODO: This style should be dynamically loaded according to theme. Also we need to
        evaluate if we need this inside our codebase or keep it in a CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/styles/atom-one-dark.min.css"
        />
        <div
          class="orama-markdown-wrapper"
          ref={(ref) => {
            this.divElement = ref
          }}
        />
      </host>
    )
  }
}
