<template>
	<div>
		<field v-for="field in fields" :key="field.attribute" :field="field" :model="model" :errors="errors" :layout="layout"  />
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
			layout: String
		}
	}
</script>
