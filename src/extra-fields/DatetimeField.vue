<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <date-time-picker
        ref="picker"
        v-model="fieldValue"
        v-bind="config"
        :id="field.attribute"
        :disabled="isDisabled"
        :button-now-translation="strings.now"
        no-value-to-custom-elem>
        <div class="input-group" @click.stop>
          <input
            ref="input"
            :id="field.attribute"
            :placeholder="field.placeholder || placeholder"
            :disabled="isDisabled"
            :value="dateFormatted()"
            :readonly="config.range"
            :class="{ 'is-range': config.range }"
            type="text"
            class="form-control"
            @click.stop
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
          />
          <div class="input-group-append">
            <button
              class="btn btn-light btn-outline-secondary"
              type="button"
              @click="clear">
              {{ strings.date_time.clear }}
            </button>
          </div>
        </div>
      </date-time-picker>
    </template>
  </component>
</template>

<script>
  import moment from 'moment'
  import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
  import FieldMixin from '../mixins/FieldMixin'
  import baseConfig from '../config'
  import config from './config'

  export default {
  name: 'DatetimeField',

  components: {
    DateTimePicker: VueCtkDateTimePicker,
  },

  mixins: [FieldMixin],

  data: () => ({
    dontClose: false,
    inputManual: false,
    initialOptions: {
      autoClose: false,
      noHeader: true,
      noKeyboard: true,
    },
  }),

  mounted() {
    this.$forceUpdate()
  },

  computed: {
    config() {
      let options = this.field.options || {}
      return Object.assign(
        this.initialOptions,
        {
          formatted: config.dateTimeDisplayFormat,
          format: (options.onlyTime ? '' : 'YYYY-MM-DD ') + (config.timeTwelveFormat ? 'hh:mm:ss a' : 'HH:mm:ss'),
          outputFormat: config.dateTimeModelFormat,
          locale: baseConfig.locale,
        },
        options,
      )
    },
    placeholder() {
      return this.config.onlyDate ? this.strings.date_time.select_date
        : (this.config.onlyTime ? this.strings.date_time.select_time : this.strings.date_time.select_datetime)
    },
  },

  methods: {
    onInput() {
      this.inputManual = true
    },
    onFocus() {
      this.$refs.picker.toggleDatePicker(true)
    },
    onBlur(event) {
      if (this.inputManual) {
        this.tryUpdateValue()
        this.inputManual = false
      }

      const isOurTarget = this.$refs.picker.$refs.agenda.$el.contains(event.relatedTarget)
      if (!isOurTarget) {
        this.$refs.picker.toggleDatePicker(false)
      }
    },
    clear() {
      this.$refs.picker.$emit('input', null)
    },
    dateFormatted() {
      return this.$refs.picker ? this.$refs.picker.dateFormatted : null
    },
    tryUpdateValue() {
      let value = null

      if (this.$refs.input.value) {
        value = moment(this.$refs.input.value, this.config.formatted)

        if (value.isValid()) {
          value = value.format(this.config.outputFormat)
        }
        else {
          value = null
        }
      }

      this.$refs.picker.$emit('input', value)
    },
  }
}
</script>
