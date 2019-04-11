<template>
	<component
		:is="layoutComponent"
		:field="field"
		:errors="errors">
		<template slot="field">
			<select
				:id="field.name"
				v-model="fieldValue"
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
					:selected="option.value == fieldValue">
					{{ option.label }}
				</option>
			</select>
		</template>
	</component>
</template>

<script>
	import { FieldMixin } from '../mixins';

	export default {
		mixins: [ FieldMixin ],

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
