import { withKnobs } from '@storybook/addon-knobs'
import { propsCommon } from '../helpers'
import FieldTemplate from './FieldTemplate'

export default {
  title: 'Location',
  decorators: [withKnobs],
}

export const SimpleLocation = () => ({
  extends: FieldTemplate,
  props: {
    ...propsCommon('Your location'),
  },
  data() {
    return {
      model: {
        location: null
      },
    }
  },
  computed: {
    field() {
      return {
        component: 'location-field',
        attribute: 'location',
        label: this.label,
        required: this.required,
        disabled: this.disabled,
      }
    },
  },
})
