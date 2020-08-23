<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <select
        :id="attribute"
        v-model="fieldValue"
        :multiple="multiple || false"
        class="form-control"
        :class="errorClasses"
        :disabled="disabled"
        :readonly="readonly"
        v-bind="attrs">
        <option :value="nullValue" selected :disabled="required">
          {{ placeholder || strings.select.choose }}
        </option>
        <option
          v-for="option in options"
          :value="option.value"
          :selected="option.value === fieldValue">
          {{ option.label }}
        </option>
      </select>
    </template>
  </component>
</template>

<script>
import { FieldMixin } from '../mixins';

export default {
  mixins: [FieldMixin],

  props: {
    options: {type: Array, required: true},
    nullValue: {type: [String, Number], default: null},
  },

  data() {
    return {
      errorClass: 'is-invalid',
    }
  },
}
</script>
