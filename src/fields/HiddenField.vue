<template>
  <input type="hidden" :value="fieldValue" v-bind="field.attrs">
</template>

<script>
  import { FieldMixin } from '../mixins';

  export default {
    name: 'FormHiddenField',
    mixins: [FieldMixin],
  }
</script>
