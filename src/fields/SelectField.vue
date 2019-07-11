<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <select
        :id="field.name"
        v-model="fieldValue"
        :multiple="field.multiple || false"
        class="form-control"
        :class="errorClasses"
        :disabled="isDisabled"
        :readonly="isReadonly">
        <option value="" selected :disabled="field.required">
          {{ field.placeholder || strings.select.choose }}
        </option>
        <option
          v-for="option in field.options"
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
      readonly: {},
    },

    computed: {

      /**
       * Get the input readonly state.
       */
      isReadonly() {
        return this.readonly || this.field.readonly
      },
    }
  }
</script>
