import * as components from './components';
import merge from 'lodash-es/merge';
import assign from 'lodash-es/assign';
import config from './config';
import strings from './strings';

export default {
  install(Vue, options) {
    assign(config, options);

    Object.keys(components).forEach(function (name) {
      Vue.component(name, components[name])
    })
  },

  setConfig(newConfig) {
    Object.assign(config, newConfig)
  },

  setStrings(newStrings) {
    merge(strings, newStrings)
  }
}
