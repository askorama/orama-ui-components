import { Component, Prop, Watch, h, Listen, Element, State, Fragment, Event, type EventEmitter } from '@stencil/core'
import type { AnyOrama, Orama, SearchParams } from '@orama/orama'
import type { OramaClient } from '@oramacloud/client'
import { searchState } from '@/context/searchContext'
import { chatContext } from '@/context/chatContext'
import { globalContext, globalStore } from '@/context/GlobalContext'
import { ChatService } from '@/services/ChatService'
import { SearchService } from '@/services/SearchService'
import { windowWidthListener } from '@/services/WindowService'
import type { TThemeOverrides } from '@/config/theme'
import { generateRandomID, initOramaClient, validateCloudIndexConfig } from '@/utils/utils'
import type { ColorScheme, ResultMap, SourcesMap } from '@/types'
import type { CloudIndexConfig } from '@/types'

// TODO: AI components should be lazyly loaded. In case of Disable AI flag, it should not be loaded at all
// https://linear.app/oramasearch/issue/ORM-1824/ai-components-should-be-lazyly-loaded-in-case-of-disable-ai-flag-they

@Component({
  tag: 'orama-search-box',
  styleUrl: 'orama-search-box.scss',
  shadow: true,
})
export class SearchBox {
  @Element() htmlElement!: HTMLElement

  @Prop() themeConfig?: Partial<TThemeOverrides>
  @Prop() colorScheme?: ColorScheme = 'light'
  @Prop() index?: CloudIndexConfig
  @Prop() clientInstance?: OramaClient
  @Prop({ mutable: true }) open = false
  @Prop() facetProperty?: string
  @Prop() resultMap?: Partial<ResultMap> = {}
  @Prop() sourceBaseUrl?: string
  @Prop() linksTarget?: string
  @Prop() linksRel?: string
  @Prop() sourcesMap?: SourcesMap
  @Prop() disableChat?: boolean = false
  @Prop() layout?: 'modal' | 'embed' = 'modal'

  // TODO: remove it in favor of dictionary
  @Prop() placeholder?: string
  @Prop() chatPlaceholder?: string
  @Prop() searchPlaceholder?: string
  @Prop() suggestions?: string[]
  @Prop() searchParams?: SearchParams<Orama<AnyOrama | OramaClient>>

  @State() oramaClient: OramaClient
  @State() componentID = generateRandomID('search-box')
  @State() systemScheme: Omit<ColorScheme, 'system'> = 'light'
  @State() windowWidth: number

  @Event() searchboxClosed: EventEmitter<{
    id: HTMLElement
  }>

  modalRef!: HTMLElement

  schemaQuery: MediaQueryList

  @Watch('index')
  indexChanged() {
    this.startServices()
  }

  @Watch('themeConfig')
  @Watch('colorScheme')
  watchHandler() {
    this.updateTheme()
  }

  @Watch('open')
  handleOpenPropChange(newValue: boolean) {
    globalContext.open = newValue
  }

  @Watch('facetProperty')
  handleFacetPropertyChange(newValue: string) {
    searchState.facetProperty = newValue
  }

  @Watch('searchParams')
  handleSearchParamsChange(newValue: SearchParams<Orama<AnyOrama | OramaClient>>) {
    searchState.searchParams = newValue
  }

  @Listen('oramaItemClick')
  handleItemClick(event: CustomEvent) {
    // TODO: manage item click
    console.log('Item clicked', event.detail)
  }

  @Listen('keydown', { target: 'document' })
  handleCloseOnEsc(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeSearchbox()
    }
  }

  @Listen('modalStatusChanged')
  modalStatusChangedHandler(event: CustomEvent<{ open: boolean; id: HTMLElement }>) {
    if (event.detail.id === this.modalRef) {
      if (!event.detail.open) {
        globalContext.open = false
        this.open = false
      }
    }
  }

  private closeSearchbox = () => {
    globalContext.open = false
    this.open = false
  }

  updateTheme() {
    const scheme = this.colorScheme === 'system' ? this.systemScheme : this.colorScheme
    const uiElement = this.htmlElement

    if (uiElement && scheme) {
      uiElement.classList.remove('theme-light', 'theme-dark')
      uiElement.classList.add(`theme-${scheme}`)
    }

    this.updateCssVariables(scheme as ColorScheme)
  }

  updateCssVariables(scheme: ColorScheme) {
    const config = this.themeConfig
    const root = this.htmlElement as HTMLElement

    if (root && config && scheme) {
      if (config.colors?.[scheme]) {
        for (const key of Object.keys(config.colors[scheme])) {
          root.style.setProperty(`${key}`, config.colors[scheme][key])
        }
      }
      if (config.typography) {
        for (const key of Object.keys(config.typography)) {
          root.style.setProperty(`${key}`, config.typography[key])
        }
      }
    }
  }

  startServices() {
    validateCloudIndexConfig(this.htmlElement, this.index, this.clientInstance)
    this.oramaClient = this.clientInstance ? this.clientInstance : initOramaClient(this.index)

    searchState.searchService = new SearchService(this.oramaClient)
    chatContext.chatService = new ChatService(this.oramaClient)
  }

  componentWillLoad() {
    // TODO: We probable want to keep these props below whithin the respective service
    // instance property. I seems to make sense to pass it as initialization prop.
    // Same goes for any other Chat init prop. Lets talk about it as well, please.
    searchState.facetProperty = this.facetProperty
    searchState.resultMap = this.resultMap
    searchState.searchParams = this.searchParams

    this.htmlElement.id = this.componentID
    this.startServices()
  }

  private onPrefersColorSchemeChange = (event) => {
    this.systemScheme = event.matches ? 'dark' : 'light'
    this.updateTheme()
  }

  connectedCallback() {
    this.windowWidth = windowWidthListener.width
    globalContext.open = this.open

    globalStore.onChange('open', () => {
      this.open = globalContext.open
    })

    this.htmlElement.id = this.componentID
    this.schemaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    this.systemScheme = this.schemaQuery.matches ? 'dark' : 'light'
    this.updateTheme()

    this.schemaQuery.addEventListener('change', this.onPrefersColorSchemeChange)
    windowWidthListener.addEventListener('widthChange', this.updateWindowWidth)
  }

  disconnectedCallback() {
    windowWidthListener.removeEventListener('widthChange', this.updateWindowWidth)
    this.schemaQuery?.removeEventListener('change', this.onPrefersColorSchemeChange)
  }

  private updateWindowWidth = (event: CustomEvent) => {
    this.windowWidth = event.detail
  }

  getSearchBox() {
    return (
      <Fragment>
        <orama-search
          class={`${
            this.windowWidth > 1024
              ? 'section-active'
              : globalContext.currentTask === 'search'
                ? 'section-active'
                : 'section-inactive'
          }`}
          placeholder={this?.searchPlaceholder || 'Search...'}
          focusInput={globalContext.currentTask === 'search'}
          sourceBaseUrl={this.sourceBaseUrl}
          linksTarget={this.linksTarget}
          linksRel={this.linksRel}
          disableChat={this.disableChat}
          suggestions={this.suggestions}
        />
      </Fragment>
    )
  }

  getChatBox() {
    return (
      <Fragment>
        <orama-chat
          class={`${globalContext.currentTask === 'chat' ? 'section-active' : 'section-inactive'}`}
          defaultTerm={globalContext.currentTask === 'chat' ? globalContext.currentTerm : ''}
          showClearChat={false}
          focusInput={globalContext.currentTask === 'chat' || chatContext.interactions.length === 0}
          placeholder={this?.chatPlaceholder || this.placeholder}
          sourceBaseUrl={this.sourceBaseUrl}
          linksTarget={this.linksTarget}
          linksRel={this.linksRel}
          sourcesMap={this.sourcesMap}
          suggestions={this.suggestions}
        />
      </Fragment>
    )
  }

  getSlidingPanel(options = { withBackdrop: false }) {
    return (
      <Fragment>
        {this.windowWidth > 1024 && (
          <orama-sliding-panel
            open={globalContext.currentTask === 'chat'}
            backdrop={options.withBackdrop}
            closed={() => {
              globalContext.currentTask = 'search'
            }}
          >
            {this.getChatBox()}
          </orama-sliding-panel>
        )}
      </Fragment>
    )
  }

  getInnerContent() {
    return (
      <Fragment>
        {this.disableChat ? null : (
          <orama-navigation-bar
            handleClose={this.closeSearchbox}
            showBackButton={this.layout !== 'embed'}
            showChatActions={globalContext.currentTask === 'chat'}
          />
        )}
        <div class="main">
          {this.getSearchBox()}
          {this.windowWidth <= 1024 && this.getChatBox()}
        </div>
        <orama-footer colorScheme={this.colorScheme === 'system' ? this.systemScheme : this.colorScheme} />
      </Fragment>
    )
  }

  getModalLayout() {
    return (
      <Fragment>
        <orama-modal
          ref={(el) => (this.modalRef = el)}
          open={globalContext.open}
          class="modal"
          mainTitle="Start your search"
          closeOnEscape={globalContext.currentTask === 'search' || this.windowWidth <= 1024}
        >
          {this.getInnerContent()}
        </orama-modal>
        {this.getSlidingPanel()}
      </Fragment>
    )
  }

  getEmbedLayout() {
    return (
      <Fragment>
        <div class="embed">{this.getInnerContent()}</div>
        {this.getSlidingPanel({ withBackdrop: true })}
      </Fragment>
    )
  }

  render() {
    if (!searchState.searchService) {
      return <orama-text as="p">Unable to initialize search service</orama-text>
    }

    if (!chatContext.chatService) {
      return <orama-text as="p">Unable to initialize chat service</orama-text>
    }

    return this.layout === 'embed' ? this.getEmbedLayout() : this.getModalLayout()
  }
}
