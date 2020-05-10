import { withKnobs, boolean } from '@storybook/addon-knobs/dist/index'
import { propsCommon } from '../helpers'
import 'vue-select/dist/vue-select.css'
import FieldTemplate from './FieldTemplate'

export default {
  title: 'Relation',
  decorators: [withKnobs],
}

export const Ajax = () => ({
  extends: FieldTemplate,
  props: {
    ...propsCommon('Repository'),
    ajax: {
      default: boolean('Is ajax', true)
    },
  },
  data() {
    return {
      model: {
        repository_id: null
      },
    }
  },
  computed: {
    field() {
      return {
        component: 'relation-field',
        attribute: 'repository_id',
        label: this.label,
        required: this.required,
        disabled: this.disabled,
        ajax: this.ajax,
        source: {
          url: 'https://api.github.com/search/repositories',
          queryParam: 'q',
          resultKey: 'items',
          valueKey: 'id',
          labelKey: 'full_name',
        },
        options: [
          { value: 1, label: 'VueJS' },
          { value: 2, label: 'React' },
          { value: 3, label: 'Angular' },
        ],
      }
    },
  },
})
