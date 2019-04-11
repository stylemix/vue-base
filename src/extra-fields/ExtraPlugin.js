import assign from 'lodash-es/assign';
import config from './config';
import * as components from './index';

export default {
  install (Vue, options) {
    assign(config, options);

    Object.keys(components).forEach(function (name) {
      Vue.component(name, components[name])
    });
  }
}
