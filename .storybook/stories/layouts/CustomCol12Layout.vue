<template>
  <div
    class="form-group col-12"
    style="border-top: 1px solid blue; padding-top: .5rem"
    :class="[errorClasses, layoutClassResolved]">
    <label
      v-if="showLabel"
      :for="field.attribute">
      {{ fieldLabel || field.label }}
      <form-asterisk v-if="field.required"/>
    </label>
    <slot name="field"/>
  </div>
</template>

<script>
import { FieldLayoutMixin } from '../../../src/mixins'

export default {
  mixins: [ FieldLayoutMixin ]
}
</script>
