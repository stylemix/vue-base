<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <vue-ctk-date-time-picker
        ref="picker"
        v-model="fieldValue"
        v-bind="config"
        :id="field.attribute"
        :disabled="isDisabled"
        :button-now-translation="strings.now"
        no-value-to-custom-elem>
        <div class="datetime-group" @click.stop>
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
            v-bind="field.attrs"
            @click.stop
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
          />
          <button
            v-if="!isEmpty"
            class="btn text-primary font-weight-bold datetime-clear"
            type="button"
            @click.stop="clear">
            &cross;
          </button>
        </div>
      </vue-ctk-date-time-picker>
    </template>
  </component>
</template>

<style>
  .datetime-group {
    position: relative;
  }

  .datetime-group .form-control {
    padding-right: 38px;
  }

  .datetime-clear {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>

<script>
  import moment from 'moment'
  import FieldMixin from '../mixins/FieldMixin'
  import baseConfig from '../config'
  import config from './config'

  export default {
  name: 'DatetimeField',

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
    isEmpty() {
      return this.fieldValue === null
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
