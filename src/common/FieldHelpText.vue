<template>
   <small
     v-if="showHelpText && field.helpText"
     class="form-text text-muted">
      {{ field.helpText }}
    </small>
</template>

<script>
export default {
  name: 'FieldHelpText',

  props: {
    field: {
      type: Object,
      required: true,
    },
    showHelpText: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
