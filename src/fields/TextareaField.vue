<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <slot :name="`field(${field.attribute})`" v-bind="{ field }">
        <textarea
          :id="field.attribute"
          :cols="inputCols"
          :rows="inputRows"
          :maxlength="inputMaxlength"
          v-model="fieldValue"
          class="form-control"
          :class="errorClasses"
          :placeholder="inputPlaceholder"
          :readonly="isReadonly"
          :disabled="isDisabled"
          v-bind="field.attrs">
        </textarea>
      </slot>
    </template>
  </component>
</template>

<script>
  import { FieldMixin } from '../mixins';

  export default {
    name: 'FormTextareaField',

    mixins: [FieldMixin],

    props: {
      placeholder: {},
      cols: {},
      rows: {},
      maxlength: {},
    },

    computed: {

      /**
       * Get the input placeholder.
       */
      inputPlaceholder() {
        return this.placeholder || this.field.placeholder
      },

      /**
       * Get the textarea cols.
       */
      inputCols() {
        return this.cols || this.field.cols
      },

      /**
       * Get the textarea rows.
       */
      inputRows() {
        return this.rows || this.field.rows
      },

      /**
       * Get the textarea maxlength.
       */
      inputMaxlength() {
        return this.maxlength || this.field.maxlength
      },
    },
  }
</script>
