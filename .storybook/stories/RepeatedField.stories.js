import {withKnobs, text} from '@storybook/addon-knobs/dist/index'
import { propsCommon } from '../helpers'
import FieldTemplate from './FieldTemplate'
import RepeaterField from '../../src/fields/RepeaterField'

export default {
  title: 'Repeater',
  decorators: [withKnobs],
}

function singleField() {
  return {
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
    component: () => RepeaterField,
    field: singleField,
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
    component: () => RepeaterField,
    field() {
      return {
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

export const NoModelValue = () => ({
  extends: FieldTemplate,
  props: {
    ...propsCommon('Your pets'),
  },
  data() {
    return {
      model: {},
    }
  },
  computed: {
    component: () => RepeaterField,
    field: singleField,
  },
})
