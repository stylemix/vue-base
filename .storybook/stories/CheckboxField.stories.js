import { withKnobs } from '@storybook/addon-knobs/dist/index'
import { propsCommon } from '../helpers'
import FieldTemplate from './FieldTemplate'
import CheckboxField from '../../src/fields/CheckboxField'

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
    component: () => CheckboxField,
    field() {
      return {
        attribute: 'agree',
        label: this.label,
        required: this.required,
        disabled: this.disabled,
      }
    },
  },
})
