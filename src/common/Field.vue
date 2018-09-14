<template>
	<component
		:is="'form-' + field.component"
		:field="field"
		:model="model"
		@input="input"
		:errors="errors"
		:layout="layout"
	/>
</template>

<script>
	export default {
		name: "Field",
		props: {
			field: {
				default: function () {
					return {
						component: 'undefined'
					}
				}
			},
			model: Object,
			errors: {},
			layout: {}
		},
		methods: {
			input: function ($event) {
				this.$emit('input', $event)
			}
		}
	}
</script>
