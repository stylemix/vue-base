<script>
import DatetimeField from './DatetimeField'
import baseConfig from '../config'
import config from './config'

export default {
  name: 'DateRangeField',

  extends: DatetimeField,

  computed: {
    config() {
      return Object.assign(
        this.initialOptions,
        {
          range: true,
          formatted: config.dateDisplayFormat,
          format: config.dateTimeModelFormat,
          locale: baseConfig.locale,
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
    placeholder() {
      return this.strings.date_time.select_period
    },
  },

  methods: {
    tryUpdateValue() {
      // todo: update range value
    },
  }
}
</script>

<style scoped>
.form-control {
  min-width: 240px;
}
.form-control.is-range {
  background-color: white;
}
</style>
