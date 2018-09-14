<template>
	<div class="form-group">
		<label v-if="showLabel" :for="field.attribute">
			{{ field.label || fieldLabel }}
		</label>
		<slot name="field"/>
		<slot name="errors"/>
		<small v-if="showHelpText" class="form-text text-muted">
			{{ field.helpText }}
		</small>
	</div>
</template>

<script>
	import FieldLayoutMixin from "../mixins/FieldLayoutMixin";

	export default {
		mixins: [ FieldLayoutMixin ]
	}
</script>
