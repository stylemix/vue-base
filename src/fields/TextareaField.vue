<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <textarea
        :id="attribute"
        :cols="cols"
        :rows="rows"
        :maxlength="maxlength"
        v-model="fieldValue"
        class="form-control"
        :class="errorClasses"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        v-bind="attrs">
      </textarea>
    </template>
  </component>
</template>

<script>
  import { FieldMixin } from '../mixins';

  export default {
    name: 'FormTextareaField',

    mixins: [FieldMixin],

    props: {
      cols: {},
      rows: {},
      maxlength: {},
    },

    data() {
      return {
        errorClass: 'is-invalid',
      }
    },
  }
</script>
