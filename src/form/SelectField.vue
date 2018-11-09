<template>
	<component :is="layoutComponent" :field="field">
		<template slot="field">
			<select
				:id="field.name"
				v-model="field.value"
				:multiple="field.multiple || false"
				class="form-control"
				:class="errorClasses"
				:disabled="inputDisabled">
				<option value="" selected disabled>
					{{ field.placeholder || 'Choose an option' }}
				</option>
				<option
					v-for="option in field.options"
					:value="option.value"
					:selected="option.value == field.value">
					{{ option.label }}
				</option>
			</select>
		</template>
		<template slot="errors">
			<div v-if="hasError" class="invalid-feedback">
				{{ firstError }}
			</div>
		</template>
	</component>
</template>

<script>
	import { FormField } from '../mixins';

	export default {
		mixins: [ FormField ],

		props: {
			disabled: {},
		},

		computed: {
			/**
			 * Get the input disabled state.
			 */
			inputDisabled() {
				return this.disabled || this.field.disabled
			},
		}
	}
</script>
