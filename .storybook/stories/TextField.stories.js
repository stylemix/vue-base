import { withKnobs, text } from '@storybook/addon-knobs/dist/index'
import { propsCommon } from '../helpers'
import FieldTemplate from './FieldTemplate'

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
  },
  data() {
    return {
      model: {
        text: '',
      },
    }
  },
  computed: {
    field() {
      return {
        component: 'text-field',
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
