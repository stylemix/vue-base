<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps"
    :show-label="false">
    <template slot="field">
      <div class="form-check">
        <input
          :id="attribute"
          type="checkbox"
          v-model="fieldValue"
          class="form-check-input"
          :class="errorClasses"
          :disabled="disabled"
          v-bind="attrs"
        />
        <label :for="attribute">
          {{ label }}
        </label>
      </div>
    </template>
  </component>
</template>

<script>
  import { FieldMixin } from '../mixins';

  export default {
    name: 'CheckboxField',

    mixins: [FieldMixin],

    data() {
      return {
        errorClass: 'is-invalid',
      }
    },
  }
</script>
