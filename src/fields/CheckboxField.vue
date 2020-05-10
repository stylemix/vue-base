<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps"
    :show-label="false">
    <template slot="field">
      <slot :name="`field(${field.attribute})`" v-bind="{ field }">
        <div class="form-check">
          <input
            :id="field.attribute"
            type="checkbox"
            v-model="fieldValue"
            class="form-check-input"
            :class="errorClasses"
            :disabled="isDisabled"
            v-bind="field.attrs"
          />
          <label :for="field.attribute">
            {{ field.label || fieldLabel }}
          </label>
          <div v-if="hasError" class="invalid-feedback">
            {{ errorMessages }}
          </div>
        </div>
      </slot>
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
