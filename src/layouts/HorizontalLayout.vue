<template>
	<div class="form-group row"
         :attribute="field.attribute"
         :class="errorClasses">
		<label v-if="showLabel"
			   :for="field.attribute"
			   class="col-sm-4 col-form-label text-sm-right">
			{{ fieldLabel || field.label }}
			<form-asterisk v-if="field.required" />
		</label>
		<div class="col-sm-8" :class="{ 'offset-sm-4': !showLabel }">
			<slot name="field"/>
			<slot name="errors">
				<div v-if="hasError"
					 v-html="errorMessages"
					 class="invalid-feedback d-block">
				</div>
			</slot>
			<small v-if="showHelpText && field.helpText"
				   class="form-text text-muted">
				{{ field.helpText }}
			</small>
		</div>
	</div>
</template>

<script>
	import FieldLayoutMixin from "../mixins/FieldLayoutMixin";

	export default {
		mixins: [ FieldLayoutMixin ]
	}
</script>
