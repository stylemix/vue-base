<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <input
        :type="inputType"
        :id="field.attribute"
        :min="inputMin"
        :max="inputMax"
        :step="inputStep"
        v-model.number="fieldValue"
        class="form-control"
        :class="errorClasses"
        :placeholder="inputPlaceholder"
        :readonly="isReadonly"
        :disabled="isDisabled"
        v-bind="field.attrs"/>
    </template>
  </component>
</template>

<script>
  import { FieldMixin } from '../mixins';

  export default {
    name: 'FormNumberField',

    mixins: [FieldMixin],

    props: {
      placeholder: {},
      step: {},
      min: {},
      max: {},
    },

    computed: {

      /**
       * Get the input type
       */
      inputType() {
        return this.field.range ? 'range' : 'number';
      },

      /**
       * Get the input placeholder.
       */
      inputPlaceholder() {
        return this.placeholder || this.field.placeholder
      },

      /**
       * Get the input step amount.
       */
      inputStep() {
        return this.step || this.field.step
      },

      /**
       * Get the input minimum amount.
       */
      inputMin() {
        return this.min || this.field.min
      },

      /**
       * Get the input maximum amount.
       */
      inputMax() {
        return this.max || this.field.max
      },
    },
  }
</script>
