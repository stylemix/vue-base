<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <input
        :type="inputType"
        :id="attribute"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="fieldValue"
        class="form-control"
        :class="errorClasses"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        v-bind="attrs"/>
    </template>
  </component>
</template>

<script>
  import { FieldMixin } from '../mixins';

  export default {
    name: 'FormNumberField',

    mixins: [FieldMixin],

    props: {
      step: {},
      min: {},
      max: {},
    },

    data() {
      return {
        errorClass: 'is-invalid',
      }
    },

    computed: {
      /**
       * Get the input type
       */
      inputType() {
        return this.range ? 'range' : 'number';
      },
    },
  }
</script>
