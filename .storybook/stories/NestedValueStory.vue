<template>
  <div>
    <fields />
    <h6>Model:</h6>
    <pre>{{ model }}</pre>
  </div>
</template>

<script>
import FormMixin from '../../src/mixins/FormMixin'

export default {
	name: 'NestedValue',
	mixins: [ FormMixin ],
	data() {
		return {
			model: {
				config: {
					label: null,
					options: {},
				},
			}
		}
	},
	mounted() {
		this.setFields([
			{
				attribute: 'config.label',
				label: 'Config > Label',
				component: 'text-field',
			},
			{
				attribute: 'config.options.title',
				label: 'Config > Options > Title',
				component: 'text-field',
			},
		])
	},
}
</script>
