<template>
	<div class="form-check">
		<input
			:id="field.attribute"
			:dusk="field.attribute"
			type="checkbox"
			v-model="field.value"
			class="form-check-input"
			:class="errorClasses"
			:placeholder="inputPlaceholder"
		/>
		<label for="field.attribute">
			{{ field.label || fieldLabel }}
		</label>
		<div v-if="hasError" class="invalid-feedback">
			{{ firstError }}
		</div>
	</div>
</template>

<script>
	import { FormField } from '../mixins';

	export default {
		name: 'FormTextField',

		mixins: [ FormField ],

		props: {
			fieldLabel: { type: String },
		},

		computed: {
			/**
			 * Get the input placeholder.
			 */
			inputPlaceholder() {
				return this.placeholder || this.field.placeholder
			}
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
