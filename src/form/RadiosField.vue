<template>
	<component :is="layoutComponent" :field="field" :show-label="false">
		<template slot="field">
			<div v-for="(option, index) in field.options"
				 :key="option.value"
				 :class="radiosLayoutClass"
				 class="form-check">
				<input
					:id="field.attribute + index"
					:value="option.value"
					v-model="field.value"
					type="radio"
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
		name: 'RadiosField',

		mixins: [ FormField ],

		props: {
			radiosLayout: { type: String }
		},

		computed: {
			radiosLayoutClass() {
				let layout = this.radiosLayout || this.field.radiosLayout;
				return `form-check-${layout}`;
			}
		}

	}
</script>
