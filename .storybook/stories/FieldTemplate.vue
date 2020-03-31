<template>
  <div class="row">
    <div class="col">
      <field :field="fieldResolved" :model="model" />
      <h6>Model:</h6>
      <pre>{{ model }}</pre>
    </div>
    <div class="col">
      <h6>Field config:</h6>
      <pre>{{ field }}</pre>
    </div>
  </div>
</template>

<script>
import FormMixin from '../../src/mixins/FormMixin'

export default {
  name: 'FieldTemplate',

  mixins: [ FormMixin ],

  computed: {
    fieldResolved() {
      return this.fields.list[0]
    },
  },

  watch: {
    field: {
      handler() {
        this.setFields([
          this.field
        ])
      },
      immediate: true,
      deep: true,
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
