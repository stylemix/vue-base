import { withKnobs } from '@storybook/addon-knobs/dist/index'
import { propsCommon } from '../helpers'
import FieldTemplate from './FieldTemplate'
import CheckboxesField from '../../src/fields/CheckboxesField'

export default {
  title: 'Checkboxes',
  decorators: [withKnobs],
}

const commonFieldConfig = {
  attribute: 'checkboxes',
  options: [
    {
      value: 1,
      label: 'Checkbox 1'
    },
    {
      value: 2,
      label: 'Checkbox 2'
    },
    {
      value: 3,
      label: 'Checkbox 2'
    }
  ],
}

export const SimpleCheckboxes = () => ({
  extends: FieldTemplate,
  props: {
    ...propsCommon('Multiple checkboxes')
  },
  data() {
    return {
      model: {
        checkboxes: [],
      },
    }
  },
  computed: {
    component: () => CheckboxesField,
    field() {
      return {
        ...commonFieldConfig,
        label: this.label,
        required: this.required,
        disabled: this.disabled,
      }
    },
  },
})

export const InlineCheckboxes = () => ({
  extends: FieldTemplate,
  props: {
    ...propsCommon('Multiple checkboxes')
  },
  data() {
    return {
      model: {
        checkboxes: [],
      },
    }
  },
  computed: {
    component: () => CheckboxesField,
    field() {
      return {
        ...commonFieldConfig,
        checkboxLayout: 'inline',
        label: this.label,
        required: this.required,
        disabled: this.disabled,
      }
    },
  },
})
