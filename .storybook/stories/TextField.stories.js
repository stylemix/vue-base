import { boolean, object, text, withKnobs } from '@storybook/addon-knobs'
import { propsCommon } from '../helpers'
import FieldTemplate from './FieldTemplate'
import TextField from '../../src/fields/TextField'

export default {
  title: 'Text',
  decorators: [withKnobs],
}

export const SimpleText = () => ({
  extends: FieldTemplate,
  props: {
    ...propsCommon('Your text', 'Enter your text'),
    pattern: {
      default: text('Pattern', ''),
    },
    hasErrors: {
      default: boolean('Has errors', false),
    },
    errorsObject: {
      default: object('Errors', {
        text: ['The field Text is required', 'Format is wrong'],
      }),
    },
  },
  data() {
    return {
      model: {
        text: '',
      },
    }
  },

  computed: {
    component() {
      return TextField
    },
    field() {
      return {
        attribute: 'text',
        label: this.label,
        placeholder: this.placeholder,
        pattern: this.pattern,
        required: this.required,
        disabled: this.disabled,
      }
    },
  },
})
