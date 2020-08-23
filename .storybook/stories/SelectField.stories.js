import { withKnobs } from '@storybook/addon-knobs/dist/index'
import { propsCommon } from '../helpers'
import FieldTemplate from './FieldTemplate'
import SelectField from '../../src/fields/SelectField'

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
    component: () => SelectField,
    field() {
      return {
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
