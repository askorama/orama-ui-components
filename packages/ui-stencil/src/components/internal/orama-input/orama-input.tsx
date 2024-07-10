import { Component, Host, Prop, h, Element, State, Event, EventEmitter } from '@stencil/core';
import '@phosphor-icons/webcomponents/PhX';
import '@phosphor-icons/webcomponents/PhMagnifyingGlass';
import { AttributeUtils } from '../../../services/AttributeUtils';

type BaseInputProps = {
  name?: string;
  size?: 'small' | 'medium' | 'large';
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  defaultValue?: string;
};

type ConditionalInputProps =
  | {
      label: string;
      labelForScreenReaders?: never;
    }
  | {
      label?: never;
      labelForScreenReaders?: string;
    };

export type InputProps = BaseInputProps & ConditionalInputProps;

@Component({
  tag: 'orama-input',
  styleUrl: 'orama-input.scss',
})
export class Input {
  @Element() el: HTMLInputElement;

  @Prop() name: InputProps['name'];
  @Prop() size?: InputProps['size'] = 'medium';
  @Prop() label?: InputProps['label'];
  @Prop() type?: InputProps['type'] = 'text';
  @Prop() placeholder?: InputProps['placeholder'];
  @Prop() labelForScreenReaders?: InputProps['labelForScreenReaders'];
  @Prop() defaultValue: InputProps['defaultValue'];

  @Event({
    eventName: 'oramaInputChanged',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<string>;

  @State() value: string;

  handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
  };

  clearInputValue = (): void => {
    this.value = '';
  }

  componentShouldUpdate(newValue: string, oldValue: string | undefined, property: string) {
    if (property === 'value' && newValue !== oldValue) {
      this.value = newValue;
      return true;
    }
    return false;
  }

  render() {
    const inputClass = `input input--${this.size}`;
    const labelClass = `label ${this.labelForScreenReaders ? 'sr-only' : ''}`;

    const declaredProps = ['id', 'name', 'type', 'class', 'onInput', 'value', 'label-for-screen-readers', 'default-value', 'placeholder'];
    const inputProps = AttributeUtils.getNonExplicitAttributes(this.el, declaredProps);

    const isSearch = this.type === 'search';

    return (
      <Host>
        <div class="wrapper">
          <label htmlFor={this.name} class={labelClass}>
            {this.label || this.labelForScreenReaders}
          </label>
          <div class="input-wrapper">
            {isSearch && (
              <span class="search-icon">
                <ph-magnifying-glass size={16}></ph-magnifying-glass>
              </span>
            )}
            <input
              class={inputClass}
              id={this.name}
              type={this.type}
              value={this.value}
              onInput={event => this.handleChange(event)}
              placeholder={this.placeholder}
              {...inputProps}
            />
            {isSearch && !!this.value && (
              <button type="button" class="reset-button" onClick={this.clearInputValue}>
                <ph-x size={16}></ph-x>
              </button>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
