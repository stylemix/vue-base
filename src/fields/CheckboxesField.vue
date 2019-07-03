<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <div
        v-for="(option, index) in field.options"
        :key="option.value"
        :class="checkboxLayoutClass"
        class="form-check">
        <input
          :id="field.attribute + index"
          :value="option.value"
          :disabled="isDisabled"
          v-model="fieldValue"
          type="checkbox"
          class="form-check-input"/>
        <label
          :for="field.attribute + index"
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
      checkboxLayout: {type: String}
    },

    computed: {
      checkboxLayoutClass() {
        let layout = this.checkboxLayout || this.field.checkboxLayout;
        return `form-check-${layout}`;
      }
    },

    created() {
      if (!isArray(this.field.initialValue)) {
        this.field.initialValue = [];
      }

      if (!isArray(this.value())) {
        this.fill([]);
      }
    },
  }
</script>
