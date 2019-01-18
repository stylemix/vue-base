<template>
	<div class="d-inline-block mb-2 mr-sm-2" :class="errorClasses">
		<label class="sr-only" :for="field.attribute">
			{{ field.label || fieldLabel }}
			<form-asterisk v-if="field.required" />
		</label>
		<slot name="field"/>
		<slot name="errors">
			<div v-if="hasError"
				 v-html="errorMessages"
				 class="invalid-tooltip d-block">
			</div>
		</slot>
		<small v-if="showHelpText && field.helpText" class="form-text text-muted">
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
