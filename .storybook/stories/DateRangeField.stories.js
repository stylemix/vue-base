import { withKnobs } from '@storybook/addon-knobs/dist/index'
import { propsCommon } from '../helpers'
import FieldTemplate from './FieldTemplate'
import DateRangeField from '../../src/extra-fields/DateRangeField'

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
    component: () => DateRangeField,
    field() {
      return {
        attribute: 'date',
        label: this.label,
        required: this.required,
        disabled: this.disabled,
      }
    },
  },
})
