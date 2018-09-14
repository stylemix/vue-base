import Base from "./Base"
import * as components from './components'

export default {
	install (Vue, options) {
		window.Base = new Base();
		Object.keys(components).forEach(function (name) {
			Vue.component(name, components[name])
		})
	}
}
