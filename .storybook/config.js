import Vue from 'vue'
import { addDecorator } from '@storybook/vue'
import { BasePlugin, ExtraPlugin } from '../'
import 'bootstrap/dist/css/bootstrap.css'
import './axios'

Vue.use(BasePlugin, {
  errorMessages: 'all',
})
Vue.use(ExtraPlugin, {
  previewMaxWidth: 200,
  previewMaxHeight: 120,
  previewCrop: false,
  googleKey: process.env.VUE_APP_GOOGLE_KEY,
  dateTimeDisplayFormat: 'll LT',
  timeTwelveFormat: false,
})

addDecorator(() => ({
  template: '<div class="p-4"><story /></div>'
}))
