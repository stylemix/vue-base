<template>
	<component :is="layoutComponent" :field="field" :show-label="false">
		<template slot="field">
			<div class="form-check">
				<input
					:id="field.attribute"
					:dusk="field.attribute"
					type="checkbox"
					v-model="field.value"
					class="form-check-input"
					:class="errorClasses"
					:placeholder="inputPlaceholder"
					:disabled="inputDisabled"/>
				<label for="field.attribute">
					{{ field.label || fieldLabel }}
				</label>
				<div v-if="hasError" class="invalid-feedback">
					{{ firstError }}
				</div>
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
			fieldLabel: { type: String },
			disabled: {},
		},

		computed: {
			/**
			 * Get the input placeholder.
			 */
			inputPlaceholder() {
				return this.placeholder || this.field.placeholder
			},

			/**
			 * Get the input disabled state.
			 */
			inputDisabled() {
				return this.disabled || this.field.disabled
			},
		},

		methods: {

			input ($event) {
				let files = []
				for (let i = 0; i < $event.target.files.length; i++) {
					files.push($event.target.files[i]);
				}

				this.field.value = this.field.multiple ? files : files[0]
			}

		}

	}
</script>
