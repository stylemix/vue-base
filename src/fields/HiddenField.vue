<template>
  <input type="hidden" :value="fieldValue">
</template>

<script>
  import { FieldMixin } from '../mixins';

  export default {
    name: 'FormHiddenField',
    mixins: [FieldMixin],
  }
</script>
