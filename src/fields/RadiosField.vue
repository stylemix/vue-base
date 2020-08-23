<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps"
    :show-label="false">
    <template slot="field">
      <div
        v-for="(option, index) in options"
        :key="option.value"
        :class="radiosLayoutClass"
        class="form-check">
        <input
          :id="attribute + index"
          :value="option.value"
          :disabled="disabled"
          v-model="fieldValue"
          type="radio"
          class="form-check-input"
          v-bind="attrs"/>
        <label
          :for="attribute + index"
          class="form-check-label">
          {{ option.label }}
        </label>
      </div>
    </template>
  </component>
</template>

<script>
  import { FieldMixin } from '../mixins';

  export default {
    name: 'RadiosField',

    mixins: [FieldMixin],

    props: {
      radiosLayout: {type: String, default: 'vertical'},
    },

    data() {
      return {
        errorClass: 'is-invalid',
      }
    },

    computed: {
      radiosLayoutClass() {
        return `form-check-${this.radiosLayout}`;
      },
    }
  }
</script>
