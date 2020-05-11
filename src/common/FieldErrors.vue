<template>
  <div
    v-if="hasError"
    v-html="errorMessages"
    class="invalid-feedback d-block">
  </div>
</template>

<script>
export default {
  name: 'FieldErrors',

  props: {
    hasError: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: String,
      default: null,
    },
  },
}
</script>
