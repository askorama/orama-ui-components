import { Component, Prop, Watch, h, Listen, Element, State, Fragment, Event, type EventEmitter } from '@stencil/core'
import type { AnyOrama, Orama, SearchParams } from '@orama/orama'
import type { OramaClient } from '@oramacloud/client'
import { searchState } from '@/context/searchContext'
import { chatContext } from '@/context/chatContext'
import { globalContext } from '@/context/GlobalContext'
import { ChatService } from '@/services/ChatService'
import { SearchService } from '@/services/SearchService'
import { windowWidthListener } from '@/services/WindowService'
import type { TThemeOverrides } from '@/config/theme'
import { generateRandomID, initOramaClient, validateCloudIndexConfig } from '@/utils/utils'
import type { ColorScheme, ResultMap, SourcesMap } from '@/types'
import type { CloudIndexConfig } from '@/types'

@Component({
  tag: 'orama-search-box',
  styleUrl: 'orama-search-box.scss',
  shadow: true,
})
export class SearchBox {
  @Element() el: HTMLElement

  @Prop() themeConfig?: Partial<TThemeOverrides>
  @Prop() colorScheme?: ColorScheme = 'light'
  @Prop() index?: CloudIndexConfig
  @Prop() clientInstance?: OramaClient
  @Prop() open = false
  @Prop() facetProperty?: string
  @Prop() resultMap?: Partial<ResultMap> = {}
  @Prop() sourceBaseUrl?: string
  @Prop() sourcesMap?: SourcesMap
  // TODO: remove it in favor of dictionary
  @Prop() placeholder?: string
  @Prop() suggestions?: string[]
  @Prop() searchParams?: SearchParams<Orama<AnyOrama | OramaClient>>

  @State() oramaClient: OramaClient
  @State() componentID = generateRandomID('search-box')
  @State() systemScheme: Omit<ColorScheme, 'system'> = 'light'
  @State() windowWidth: number
  @State() isOpen = this.open

  @Event() searchboxClosed: EventEmitter<{
    id: HTMLElement
  }>

  modalRef!: HTMLElement

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
    this.isOpen = newValue
  }

  @Watch('isOpen')
  handleOpenChange(newValue: boolean) {
    globalContext.open = newValue
    if (!newValue) {
      this.searchboxClosed.emit({
        id: this.el,
      })
    }
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
        this.isOpen = false
      }
    }
  }

  private closeSearchbox = () => {
    this.isOpen = false
  }

  updateTheme() {
    const scheme = this.colorScheme === 'system' ? this.systemScheme : this.colorScheme
    const uiElement = this.el as HTMLElement

    if (uiElement && scheme) {
      uiElement.classList.remove('theme-light', 'theme-dark')
      uiElement.classList.add(`theme-${scheme}`)
    }

    this.updateCssVariables(scheme as ColorScheme)
  }

  updateCssVariables(scheme: ColorScheme) {
    const config = this.themeConfig
    const root = this.el as HTMLElement

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

  detectSystemColorScheme() {
    const darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')

    this.systemScheme = darkSchemeQuery.matches ? 'dark' : 'light'

    darkSchemeQuery.addEventListener('change', (event) => {
      this.systemScheme = event.matches ? 'dark' : 'light'
      if (this.colorScheme === 'system') {
        this.updateTheme()
      }
    })
  }

  startServices() {
    validateCloudIndexConfig(this.el, this.index, this.clientInstance)
    this.oramaClient = this.clientInstance ? this.clientInstance : initOramaClient(this.index)

    searchState.searchService = new SearchService(this.oramaClient)
    chatContext.chatService = new ChatService(this.oramaClient)
  }

  componentWillLoad() {
    globalContext.open = this.isOpen

    // TODO: We probable want to keep these props below whithin the respective service
    // instance property. I seems to make sense to pass it as initialization prop.
    // Same goes for any other Chat init prop. Lets talk about it as well, please.
    searchState.facetProperty = this.facetProperty
    searchState.resultMap = this.resultMap
    searchState.searchParams = this.searchParams

    this.el.id = this.componentID
    this.startServices()
    this.detectSystemColorScheme()
    this.updateTheme()
  }

  connectedCallback() {
    this.windowWidth = windowWidthListener.width
    windowWidthListener.addEventListener('widthChange', this.updateWindowWidth)
  }

  disconnectedCallback() {
    windowWidthListener.removeEventListener('widthChange', this.updateWindowWidth)
  }

  private updateWindowWidth = (event: CustomEvent) => {
    this.windowWidth = event.detail
  }

  render() {
    if (!searchState.searchService) {
      return <orama-text as="p">Unable to initialize search service</orama-text>
    }

    if (!chatContext.chatService) {
      return <orama-text as="p">Unable to initialize chat service</orama-text>
    }

    return (
      <Fragment>
        <orama-modal
          ref={(el) => (this.modalRef = el)}
          open={this.isOpen}
          class="modal"
          mainTitle="Start your search"
          closeOnEscape={globalContext.currentTask === 'search' || this.windowWidth <= 1024}
        >
          <orama-navigation-bar
            handleClose={this.closeSearchbox}
            showChatActions={globalContext.currentTask === 'chat'}
          />
          <div class="main">
            <orama-search
              class={`${globalContext.currentTask === 'search' ? 'section-active' : 'section-inactive'}`}
              focusInput={globalContext.currentTask === 'search'}
              sourceBaseUrl={this.sourceBaseUrl}
              suggestions={this.suggestions}
            />
            {this.windowWidth <= 1024 && (
              <orama-chat
                class={`${globalContext.currentTask === 'chat' ? 'section-active' : 'section-inactive'}`}
                defaultTerm={globalContext.currentTask === 'chat' ? globalContext.currentTerm : ''}
                showClearChat={false}
                focusInput={globalContext.currentTask === 'chat' || chatContext.interactions.length === 0}
                placeholder={this.placeholder}
                sourceBaseUrl={this.sourceBaseUrl}
                sourcesMap={this.sourcesMap}
                suggestions={this.suggestions}
              />
            )}
          </div>
          <orama-footer colorScheme={this.colorScheme === 'system' ? this.systemScheme : this.colorScheme} />
        </orama-modal>
        {this.windowWidth > 1024 && (
          <orama-sliding-panel
            open={globalContext.currentTask === 'chat'}
            closed={() => {
              globalContext.currentTask = 'search'
            }}
          >
            <orama-chat
              placeholder={this.placeholder}
              defaultTerm={globalContext.currentTask === 'chat' ? globalContext.currentTerm : ''}
              showClearChat={false}
              sourceBaseUrl={this.sourceBaseUrl}
              sourcesMap={this.sourcesMap}
              focusInput={globalContext.currentTask === 'chat' || chatContext.interactions.length === 0}
              suggestions={this.suggestions}
            />
          </orama-sliding-panel>
        )}
      </Fragment>
    )
  }
}
