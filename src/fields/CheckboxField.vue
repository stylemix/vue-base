<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps"
    :show-label="false">
    <template slot="field">
      <div class="form-check">
        <input
          :id="field.attribute"
          type="checkbox"
          v-model="fieldValue"
          class="form-check-input"
          :class="errorClasses"
          :disabled="isDisabled"/>
        <label :for="field.attribute">
          {{ field.label || fieldLabel }}
        </label>
        <div v-if="hasError" class="invalid-feedback">
          {{ errorMessages }}
        </div>
      </div>
    </template>
  </component>
</template>

<script>
  import { FieldMixin } from '../mixins';

  export default {
    name: 'CheckboxField',

    mixins: [FieldMixin],

    props: {
      fieldLabel: {type: String},
    },
  }
</script>
