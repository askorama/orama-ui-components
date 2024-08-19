import { Component, Host, Prop, h, Element, State, Event, Watch, type EventEmitter } from '@stencil/core'
import '@phosphor-icons/webcomponents/dist/icons/PhX.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhMagnifyingGlass.mjs'
import { getNonExplicitAttributes } from '@/utils/utils'

type BaseInputProps = {
  name?: string
  size?: 'small' | 'medium' | 'large'
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  placeholder?: string
  defaultValue?: string
}

type ConditionalInputProps =
  | {
      label: string
      labelForScreenReaders?: never
    }
  | {
      label?: never
      labelForScreenReaders?: string
    }

export type InputProps = BaseInputProps & ConditionalInputProps

@Component({
  tag: 'orama-input',
  styleUrl: 'orama-input.scss',
  scoped: true,
})
export class Input {
  @Element() el: HTMLDivElement

  @Prop() name: InputProps['name']
  @Prop() size?: InputProps['size'] = 'medium'
  @Prop() label?: InputProps['label']
  @Prop() type?: InputProps['type'] = 'text'
  @Prop() placeholder?: InputProps['placeholder']
  @Prop() labelForScreenReaders?: InputProps['labelForScreenReaders']
  @Prop() defaultValue: InputProps['defaultValue']
  @Prop() autoFocus?: boolean = false

  @State() inputRefReady = false
  private inputRef!: HTMLInputElement

  @Event({
    eventName: 'resetValue',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  resetValue!: EventEmitter<void>

  @State() value: string

  @Watch('autoFocus')
  handleAutoFocusChange() {
    if (this.autoFocus) {
      this.inputRef?.focus()
    }
  }

  handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    this.value = target.value
  }

  clearInputValue = (): void => {
    this.value = ''
    this.inputRef.focus()
    this.resetValue.emit()
  }

  ensureFocus() {
    const checkRefInterval = setInterval(() => {
      if (this.inputRef) {
        this.inputRef.focus()
        clearInterval(checkRefInterval)
      }
    }, 10)
  }

  componentShouldUpdate(newValue: string, oldValue: string | undefined, property: string) {
    if (property === 'value' && newValue !== oldValue) {
      this.value = newValue
      return true
    }
    return false
  }

  componentDidLoad() {
    if (this.autoFocus) {
      this.ensureFocus()
    }
  }

  render() {
    const inputClass = `input input--${this.size}`
    const labelClass = `label ${this.labelForScreenReaders ? 'sr-only' : ''}`

    const declaredProps = [
      'id',
      'name',
      'type',
      'class',
      'onInput',
      'value',
      'label-for-screen-readers',
      'default-value',
      'placeholder',
    ]
    const inputProps = getNonExplicitAttributes(this.el, declaredProps)

    const isSearch = this.type === 'search'

    return (
      <Host>
        <div class="wrapper">
          <label htmlFor={this.name} class={labelClass}>
            {this.label || this.labelForScreenReaders}
          </label>
          <div class="input-wrapper">
            {isSearch && (
              <span class="search-icon">
                <ph-magnifying-glass size={16} />
              </span>
            )}
            <input
              {...inputProps}
              ref={(el) => {
                this.inputRef = el as HTMLInputElement
                if (this.autoFocus && el) {
                  this.inputRefReady = true
                }
              }}
              class={inputClass}
              id={this.name}
              type={this.type}
              value={this.value}
              onInput={(event) => this.handleChange(event)}
              placeholder={this.placeholder}
            />
            {isSearch && !!this.value && (
              <button type="button" class="reset-button" onClick={this.clearInputValue}>
                <ph-x size={16} />
              </button>
            )}
          </div>
        </div>
      </Host>
    )
  }
}
