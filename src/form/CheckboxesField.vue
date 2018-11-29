<template>
	<component :is="layoutComponent" :field="field" :show-label="false">
		<template slot="field">
			<div v-for="(option, index) in field.options"
				 :key="option.value"
				 :class="checkboxLayoutClass"
				 class="form-check">
				<input
					:id="field.attribute + index"
					:value="option.value"
					v-model="field.value"
					type="checkbox"
					class="form-check-input" />
				<label :for="field.attribute + index"
					   class="form-check-label">
					{{ option.label }}
				</label>
			</div>
		</template>
	</component>
</template>

<script>
	import { FormField } from '../mixins';

	export default {
		name: 'CheckboxesField',

		mixins: [ FormField ],

		props: {
			checkboxLayout: { type: String }
		},

		computed: {
			checkboxLayoutClass() {
				let layout = this.checkboxLayout || this.field.checkboxLayout;
				return `form-check-${layout}`;
			}
		}

	}
</script>
