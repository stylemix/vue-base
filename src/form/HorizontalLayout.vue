<template>
	<div class="form-group row">
		<label v-if="showLabel" :for="field.attribute" class="col-sm-4 col-form-label text-sm-right">
			{{ field.label || fieldLabel }}
		</label>
		<div class="col-sm-8" :class="{ 'offset-sm-4': !showLabel }">
			<slot name="field"/>
			<slot name="errors"/>
			<small v-if="showHelpText" class="form-text text-muted">
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
