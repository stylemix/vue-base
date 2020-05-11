<template>
  <label
    v-if="showLabel"
    :for="field.attribute">
      {{ fieldLabel || field.label }}
      <form-asterisk v-if="field.required" />
    </label>
  <label
    v-else class="placeholder-label"
    :for="field.attribute">
    &nbsp;
  </label>
</template>

<script>
export default {
  name: 'FormFieldLabel',

  props: {
    field: {
      type: Object,
      required: true,
    },
    fieldLabel: {
      type: String,
      default: null,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
