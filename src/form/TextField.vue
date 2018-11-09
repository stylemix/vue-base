<template>
	<component :is="layoutComponent" :field="field">
		<template slot="field">
			<input
				:id="field.attribute"
				:dusk="field.attribute"
				:type="inputType"
				:min="inputMin"
				:max="inputMax"
				:step="inputStep"
				:pattern="inputPattern"
				v-model="field.value"
				class="form-control"
				:class="errorClasses"
				:placeholder="inputPlaceholder"
				:readonly="inputReadonly"
				:disabled="inputDisabled"/>
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
		name: 'FormTextField',

		mixins: [ FormField ],

		props: {
			readonly: {},
			disabled: {},
			placeholder: {},
			step: {},
			min: {},
			max: {},
			pattern: {},
		},

		computed: {
			/**
			 * Get the input type.
			 */
			inputType() {
				return this.field.type || 'text'
			},

			/**
			 * Get the input placeholder.
			 */
			inputPlaceholder() {
				return this.placeholder || this.field.placeholder
			},

			/**
			 * Get the input readonly state.
			 */
			inputReadonly() {
				return this.readonly || this.field.readonly
			},

			/**
			 * Get the input disabled state.
			 */
			inputDisabled() {
				return this.disabled || this.field.disabled
			},

			/**
			 * Get the input step amount.
			 */
			inputStep() {
				return this.step || this.field.step
			},

			/**
			 * Get the input minimum amount.
			 */
			inputMin() {
				return this.min || this.field.min
			},

			/**
			 * Get the input maximum amount.
			 */
			inputMax() {
				return this.max || this.field.max
			},

			/**
			 * Get the pattern that should be used for the field
			 */
			inputPattern() {
				return this.pattern || this.field.pattern
			},
		},
	}
</script>
