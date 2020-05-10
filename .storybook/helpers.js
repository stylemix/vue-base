import { boolean, text } from '@storybook/addon-knobs'

export function propsCommon(defaultLabel, defaultPlaceholder) {
  return {
    label: {
      default: text('Label', defaultLabel),
    },
    placeholder: {
      default: text('Placeholder', defaultPlaceholder),
    },
    required: {
      default: boolean('Is required', false),
    },
    disabled: {
      default: boolean('Is disabled', false),
    },
  }
}
