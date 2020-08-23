<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <div
        v-for="(option, index) in options"
        :key="option.value"
        :class="checkboxLayoutClass"
        class="form-check">
        <input
          :id="attribute + index"
          :value="option.value"
          :disabled="disabled"
          v-model="fieldValue"
          type="checkbox"
          class="form-check-input"
          v-bind="attrs"
        />
        <label
          :for="attribute + index"
          class="form-check-label">
          {{ option.label }}
        </label>
      </div>
    </template>
  </component>
</template>

<script>
  import isArray from 'lodash-es/isArray';
  import { FieldMixin } from '../mixins';

  export default {
    name: 'CheckboxesField',

    mixins: [FieldMixin],

    props: {
      options: {type: Array, required: true},
      checkboxLayout: {type: String, default: 'vertical'},
    },

    data() {
      return {
        errorClass: 'is-invalid',
      }
    },

    computed: {
      checkboxLayoutClass() {
        return `form-check-${this.checkboxLayout}`;
      }
    },

    created() {
      if (!isArray(this.initialValue)) {
        this.initialValue = [];
      }

      if (!isArray(this.fieldValue)) {
        this.fieldValue = [];
      }
    },
  }
</script>
