<template>
	<div>
		<field
			v-for="field in fields"
			:key="field.attribute"
			:field="field"
			:model="model"
			:errors="errors"
			:event-bus="$events"
			:layout="layout"  />
	</div>
</template>

<script>
	import Errors from '../utils/Errors';

	export default {
		name: "Fields",

		props: {
			fields: {},
			model: Object,
			errors: {
				default: () => new Errors()
			},
			eventBus: { type: Object },
			layout: String
		},

		computed: {
			$events () {
				return this.eventBus || this.$parent;
			}
		},
	}
</script>
