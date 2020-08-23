import { withKnobs } from '@storybook/addon-knobs/dist/index'
import { propsCommon } from '../helpers'
import FieldTemplate from './FieldTemplate'
import DatetimeField from '../../src/extra-fields/DatetimeField'

export default {
  title: 'Datetime',
  decorators: [withKnobs],
}

export const SimleDatetime = () => ({
  extends: FieldTemplate,
  props: {
    ...propsCommon('Date time'),
  },
  data() {
    return {
      model: {
        date: null,
      },
    }
  },
  computed: {
    component: () => DatetimeField,
    field() {
      return {
        attribute: 'date',
        options: {
          outputFormat: 'YYYY-MM-DDTHH:mm:ss'
        },
        label: this.label,
        required: this.required,
        disabled: this.disabled,
      }
    },
  },
})

export const TimeOnly = () => ({
  extends: FieldTemplate,
  props: {
    ...propsCommon('Time input'),
  },
  data() {
    return {
      model: {
        time: null,
      },
    }
  },
  computed: {
    field() {
      return {
        component: 'datetime-field',
        attribute: 'time',
        options: {
          outputFormat: 'HH:mm',
          formatted: 'hh:mm a',
          onlyTime: true,
        },
        label: this.label,
        required: this.required,
        disabled: this.disabled,
      }
    },
  },
})
