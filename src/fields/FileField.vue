<template>
	<component
		:is="layoutComponent"
		:field="field"
		:errors="errors">
		<template slot="field">
			<input
				:id="field.attribute"
				:dusk="field.attribute"
				type="file"
				ref="inputElement"
				v-on:input="input($event)"
				:multiple="field.multiple || false"
				class="form-control"
				:class="errorClasses"
				:placeholder="inputPlaceholder"
				:accept="field.mimeTypes"
			/>
		</template>
	</component>
</template>

<script>
	import { FormField } from '../mixins';

	export default {
		name: 'FormTextField',

		mixins: [ FormField ],

		props: {
			placeholder: {}
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

				this.fieldValue = this.field.multiple ? files : files[0];
				this.$refs.inputElement.value = '';
			}

		}

	}
</script>
