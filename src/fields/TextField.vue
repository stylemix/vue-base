<template>
	<component
		:is="layoutComponent"
		:field="field"
		:errors="errors">
		<template slot="field">
			<input
				:id="field.attribute"
				:dusk="field.attribute"
				:type="inputType"
				:min="inputMin"
				:max="inputMax"
				:step="inputStep"
				:pattern="inputPattern"
				v-model="fieldValue"
				class="form-control"
				:class="errorClasses"
				:placeholder="inputPlaceholder"
				:readonly="inputReadonly"
				:disabled="inputDisabled"/>
		</template>
	</component>
</template>

<script>
	import { FieldMixin } from '../mixins';

	export default {
		name: 'FormTextField',

		mixins: [ FieldMixin ],

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

		methods: {
			sanitizeValue(value) {
				if (this.field.type === 'number') {
					return Number(value);
				}

				return value;
			},
		},
	}
</script>
