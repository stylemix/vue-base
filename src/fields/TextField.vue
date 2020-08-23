<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <input
        :id="attribute"
        :type="inputType"
        :min="min"
        :max="max"
        :step="step"
        :pattern="pattern"
        v-model="fieldValue"
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
    name: 'FormTextField',

    mixins: [FieldMixin],

    data() {
      return {
        errorClass: 'is-invalid',
      }
    },

    props: {
      step: {},
      min: {},
      max: {},
      pattern: {},
    },

    computed: {
      /**
       * Get the input type.
       */
      inputType() {
        return this.type || 'text'
      },
    },

    methods: {
      sanitizeValue(value) {
        if (this.type === 'number') {
          return Number(value);
        }

        return value;
      },
    },
  }
</script>
