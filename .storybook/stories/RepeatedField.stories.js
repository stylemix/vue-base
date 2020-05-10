import {withKnobs, text} from '@storybook/addon-knobs/dist/index'
import { propsCommon } from '../helpers'
import FieldTemplate from './FieldTemplate'

export default {
  title: 'Repeater',
  decorators: [withKnobs],
}

export const SingleField = () => ({
  extends: FieldTemplate,
  props: {
    ...propsCommon('Your pets'),
    iconRemoveRow: {
      default: text('Remove icon', 'fa fa-times'),
    },
    labelRemoveRow: {
      default: text('Remove label', 'Remove'),
    },
  },
  data() {
    return {
      model: {
        pets: ['cat', 'dog']
      },
    }
  },
  computed: {
    field() {
      return {
        component: 'repeater-field',
        attribute: 'pets',
        label: this.label,
        required: this.required,
        disabled: this.disabled,
        field: {
          component: "text-field",
        },
        iconRemoveRow: this.iconRemoveRow,
        labelRemoveRow: this.labelRemoveRow,
      }
    },
  },
})

export const MultipleFields = () => ({
  extends: FieldTemplate,
  props: {
    ...propsCommon('Education'),
  },
  data() {
    return {
      model: {
        education: [
          {
            school: null,
            years: null
          }
        ]
      },
    }
  },
  computed: {
    field() {
      return {
        component: 'repeater-field',
        attribute: 'education',
        label: this.label,
        fields: [
          {
            attribute: "school",
            label: "School name",
            component: "text-field",
            col: 7,
          },
          {
            attribute: "years",
            label: "Years",
            component: "number-field",
          },
        ],
        required: this.required,
        disabled: this.disabled,
      }
    },
  },
})
