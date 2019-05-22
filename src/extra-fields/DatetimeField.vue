<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <date-time-picker v-model="fieldValue" v-bind="config">
        <input
          :placeholder="field.placeholder || 'Select date'"
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
  name: 'DatetimeField',

  components: {
    DateTimePicker: VueCtkDateTimePicker,
  },

  mixins: [FieldMixin],

  computed: {
    config() {
      return Object.assign(
        {
          formatted: 'llll',
          format: 'YYYY-MM-DD hh:mm:ss',
        },
        this.field.options || {},
      )
    },
  },
}
</script>
