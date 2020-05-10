<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps"
    :show-label="false">
    <template slot="field">
      <div
        v-for="(option, index) in field.options"
        :key="option.value"
        :class="radiosLayoutClass"
        class="form-check">
        <input
          :id="field.attribute + index"
          :value="option.value"
          :disabled="isDisabled"
          v-model="fieldValue"
          type="radio"
          class="form-check-input"
          v-bind="field.attrs"/>
        <label
          :for="field.attribute + index"
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
      radiosLayout: {type: String},
    },

    computed: {
      radiosLayoutClass() {
        let layout = this.radiosLayout || this.field.radiosLayout;
        return `form-check-${layout}`;
      },
    }

  }
</script>
