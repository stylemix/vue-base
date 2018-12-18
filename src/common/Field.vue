<template>
	<component
		:is="'form-' + field.component"
		:field="field"
		:model="model"
		@input="input"
		:errors="errors"
		:event-bus="$events"
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
			eventBus: { type: Object },
			layout: {}
		},

		computed: {
			$events () {
				return this.eventBus || this.$parent;
			}
		},

		methods: {
			input: function ($event) {
				this.$emit('input', $event)
			}
		},
	}
</script>
