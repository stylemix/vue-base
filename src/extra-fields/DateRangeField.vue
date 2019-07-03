<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <date-time-picker v-model="fieldValue" :range="true" v-bind="config">
        <input
          :placeholder="field.placeholder || 'Select date period'"
          :disabled="isDisabled"
          type="text"
          class="form-control"
        />
      </date-time-picker>
    </template>
  </component>
</template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import FieldMixin from '../mixins/FieldMixin'

export default {
  name: 'DateRangeField',

  components: {
    DateTimePicker: VueCtkDateTimePicker,
  },

  mixins: [FieldMixin],

  computed: {
    config() {
      return Object.assign(
        {
          formatted: 'll',
          format: 'YYYY-MM-DD hh:mm:ss',
        },
        this.field.options || {},
      )
    },

    fieldValue: {
      get() {
        let value = this.value()

        if (!value) {
          return null
        }

        return { start: value.gte, end: value.lte }
      },
      set(value) {
        let setValue = {}

        if (value) {
          if (value.start) {
            setValue.gte = value.start
          }

          if (value.end) {
            setValue.lte = value.end
          }
        }

        this.fill(setValue)
      },
    },
  },
}
</script>

<style scoped>
.form-control {
  min-width: 240px;
}
</style>
