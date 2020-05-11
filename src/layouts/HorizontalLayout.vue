<template>
  <div
    class="form-group row"
    :attribute="field.attribute"
    :class="layoutClassResolved">
    <slot name="label">
      <form-field-label
        v-bind="labelProps"
        class="col-sm-4 col-form-label text-sm-right"
      />
    </slot>
    <div
      class="col-sm-8"
      :class="{ 'offset-sm-4': !showLabel }">
      <slot name="field"/>
      <slot name="errors">
        <form-field-errors v-bind="errorsProps" />
      </slot>
      <slot name="help-text">
        <form-field-help-text v-bind="helpTextProps" />
      </slot>
    </div>
  </div>
</template>

<script>
import FieldLayoutMixin from '../mixins/FieldLayoutMixin'

export default {
  mixins: [FieldLayoutMixin]
}
</script>
