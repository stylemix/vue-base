<template>
  <label
    v-if="showLabel"
    :for="attribute">
      <template v-if="labelHtml" v-html="labelHtml" />
      <template v-else>{{ label }}</template>
      <asterisk v-if="required" />
    </label>
  <label
    v-else class="placeholder-label"
    :for="attribute">
    &nbsp;
  </label>
</template>

<script>
import Asterisk from './Asterisk'

export default {
  name: 'FormFieldLabel',

  components: {
    Asterisk,
  },

  props: {
    attribute: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    labelHtml: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
