<template>
  <div
    class="d-inline-block mb-2 mr-sm-2"
    :attribute="field.attribute"
    :class="[errorClasses, layoutClassResolved]">
    <slot name="label">
      <form-field-label v-bind="labelProps" class="sr-only" />
    </slot>
    <slot name="field"/>
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
