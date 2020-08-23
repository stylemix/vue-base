<template>
  <div class="row">
    <div class="col">
      <component :is="component" v-bind="field" />
    </div>
    <div class="col">
      <h6>Field config:</h6>
      <pre>{{ field }}</pre>
      <h6>Model:</h6>
      <pre>{{ model }}</pre>
    </div>
  </div>
</template>

<script>
import FormMixin from '../../src/mixins/FormMixin'

export default {
  name: 'FieldTemplate',

  mixins: [ FormMixin ],

  watch: {
    hasErrors(val) {
      if (val) {
        this.setErrors(this.errorsObject)
      }
      else {
        this.clearErrors()
      }
    },
  },
}
</script>

<style>
  pre {
    background-color: #f4f4f4;
    color: #444;
    padding: 1rem;
    font-size: small;
    border-radius: 0.3rem;
  }
</style>
