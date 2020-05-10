import { withKnobs } from '@storybook/addon-knobs/dist/index'
import { propsCommon } from '../helpers'
import FieldTemplate from './FieldTemplate'

export default {
  title: 'Date range',
  decorators: [withKnobs],
}

export const SimpleDateRange = () => ({
  extends: FieldTemplate,
  props: {
    ...propsCommon('Date range', 'Select date range'),
  },
  data() {
    return {
      model: {
        date: null,
      },
    }
  },
  computed: {
    field() {
      return {
        component: 'date-range-field',
        attribute: 'date',
        label: this.label,
        required: this.required,
        disabled: this.disabled,
      }
    },
  },
})
