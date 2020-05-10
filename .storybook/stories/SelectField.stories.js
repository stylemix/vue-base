import { withKnobs, text } from '@storybook/addon-knobs/dist/index'
import { propsCommon } from '../helpers'
import FieldTemplate from './FieldTemplate'

export default {
  title: 'Select',
  decorators: [withKnobs],
}

export const SimpleSelect = () => ({
  extends: FieldTemplate,
  props: {
    ...propsCommon('Category', 'Select category'),
  },
  data() {
    return {
      model: {
        category: null,
      },
    }
  },
  computed: {
    field() {
      return {
        component: 'select-field',
        attribute: 'category',
        label: this.label,
        options: [
          {
            value: 1,
            label: 'Item 1'
          },
          {
            value: 2,
            label: 'Item 2'
          }
        ],
        required: this.required,
        disabled: this.disabled,
      }
    },
  },
})
