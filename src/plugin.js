import * as components from './components'
import assign from 'lodash-es/assign';
import config from './config';

export default {
	install (Vue, options) {
		assign(config, options);

		Object.keys(components).forEach(function (name) {
			Vue.component(name, components[name])
		})
	}
}
