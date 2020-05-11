<template>
  <div
    class="form-group"
    :attribute="field.attribute"
    :class="layoutClassResolved">
    <slot name="label">
      <form-field-label v-bind="labelProps" />
    </slot>
    <slot name="field" />
    <slot name="errors">
      <form-field-errors v-bind="errorsProps" />
    </slot>
    <slot name="help-text">
      <form-field-help-text v-bind="helpTextProps" />
    </slot>
  </div>
</template>

<script>
import FieldLayoutMixin from '../mixins/FieldLayoutMixin'

export default {
  mixins: [FieldLayoutMixin]
}
</script>

<style type="text/scss" scoped>
  .placeholder-label {
    display: none;
  }

  .col .placeholder-label {
    display: block;
  }

  [class*=" col-"] .placeholder-label {
    display: block;
  }
</style>
