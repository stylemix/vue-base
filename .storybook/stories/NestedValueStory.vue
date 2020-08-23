<template>
  <div>
    <form-text-field attribute="config.label" label="Config > Label" />
    <form-text-field attribute="config.options.title" label="Config > Options > Title" />
    <h6>Model:</h6>
    <pre>{{ model }}</pre>
  </div>
</template>

<script>
import FormMixin from '../../src/mixins/FormMixin'
import FormTextField from '../../src/fields/TextField'

export default {
	name: 'NestedValueStory',
  components: {
	  FormTextField,
  },
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
}
</script>
