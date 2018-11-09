<template>
	<component :is="layoutComponent" :field="field">
		<template slot="field">
			<textarea
				:id="field.attribute"
				:dusk="field.attribute"
				:cols="inputCols"
				:rows="inputRows"
				v-model="field.value"
				class="form-control"
				:class="errorClasses"
				:placeholder="inputPlaceholder"
				:readonly="inputReadonly"
				:disabled="inputDisabled">
			</textarea>
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
		name: 'FormTextareaField',

		mixins: [ FormField ],

		props: {
			readonly: {},
			disabled: {},
			placeholder: {},
			cols: {},
			rows: {},
		},

		computed: {

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
			 * Get the input placeholder.
			 */
			inputPlaceholder() {
				return this.placeholder || this.field.placeholder
			},

			/**
			 * Get the textarea cols.
			 */
			inputCols() {
				return this.cols || this.field.rows
			},

			/**
			 * Get the textarea rows.
			 */
			inputRows() {
				return this.rows || this.field.rows
			},
		},
	}
</script>
