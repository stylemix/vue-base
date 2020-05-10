import {withKnobs, text} from '@storybook/addon-knobs/dist/index'
import { propsCommon } from '../helpers'
import FieldTemplate from './FieldTemplate'

export default {
  title: 'File',
  decorators: [withKnobs],
}

export const SimpleFile = () => ({
  extends: FieldTemplate,
  props: {
    label: {
      default: text('Label', 'Attachments')
    },
    ...propsCommon(),
  },
  data() {
    return {
      model: {
        attachment: null,
      },
    }
  },
  computed: {
    field() {
      return {
        component: 'file-field',
        attribute: 'attachment',
        label: this.label,
        required: this.required,
        disabled: this.disabled,
        attached: null,
        multiple: false
      }
    },
  },
})

export const MultipleFile = () => ({
  extends: FieldTemplate,
  props: {
    label: {
      default: text('Label', 'Attachments multiple')
    },
    ...propsCommon(),
  },
  data() {
    return {
      model: {
        attachments: [],
      },
    }
  },
  computed: {
    field() {
      return {
        component: 'file-field',
        attribute: 'attachments',
        label: this.label,
        required: this.required,
        disabled: this.disabled,
        attached: null,
        multiple: true
      }
    },
  },
})
