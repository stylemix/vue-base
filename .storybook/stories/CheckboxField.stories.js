import { withKnobs, text } from '@storybook/addon-knobs/dist/index'
import { propsCommon } from '../helpers'
import FieldTemplate from './FieldTemplate'

export default {
  title: 'Checkbox',
  decorators: [withKnobs],
}

export const SimpleCheckbox = () => ({
  extends: FieldTemplate,
  props: {
    ...propsCommon('Agree')
  },
  data() {
    return {
      model: {
        agree: false,
      },
    }
  },
  computed: {
    field() {
      return {
        component: 'checkbox-field',
        attribute: 'agree',
        label: this.label,
        required: this.required,
        disabled: this.disabled,
      }
    },
  },
})
