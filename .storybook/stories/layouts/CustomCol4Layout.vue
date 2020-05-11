<template>
  <div
    class="form-group col-4"
    :class="[errorClasses, layoutClassResolved]">
    <slot name="field"/>
    <label
      v-if="showLabel"
      :for="field.attribute">
      {{ fieldLabel || field.label }}
      <form-asterisk v-if="field.required"/>
    </label>
  </div>
</template>

<script>
import { FieldLayoutMixin } from '../../../src/mixins'

export default {
  mixins: [ FieldLayoutMixin ]
}
</script>
