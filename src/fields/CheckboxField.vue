<template>
	<component
		:is="layoutComponent"
		:field="field"
		:errors="errors"
		:show-label="false">
		<template slot="field">
			<div class="form-check">
				<input
					:id="field.attribute"
					:dusk="field.attribute"
					type="checkbox"
					v-model="fieldValue"
					class="form-check-input"
					:class="errorClasses"
					:disabled="inputDisabled"/>
				<label :for="field.attribute">
					{{ field.label || fieldLabel }}
				</label>
				<div v-if="hasError" class="invalid-feedback">
					{{ errorMessages }}
				</div>
			</div>
		</template>
	</component>
</template>

<script>
	import { FieldMixin } from '../mixins';

	export default {
		name: 'CheckboxField',

		mixins: [ FieldMixin ],

		props: {
			fieldLabel: { type: String },
			disabled: {},
		},

		computed: {
			/**
			 * Get the input disabled state.
			 */
			inputDisabled() {
				return this.disabled || this.field.disabled
			},
		},


	}
</script>
