<template>
  <component
    :is="'form-' + fieldResolved.component"
    :field="fieldResolved"
    :model="modelResolved"
    :form="formResolved"
    :layout="layout"
    :layout-class="layoutClass"
    @input="input"
  />
</template>

<script>
  import Field from '../utils/Field'
  import FieldList from '../utils/FieldList'

  export default {
    name: 'Field',

    props: {
      name: String,
      field: Object,
      model: Object,
      errors: {},
      form: Object,
      layout: String,
      layoutClass: String,
    },

    computed: {
      fieldResolved() {
        if (this.name && this.formResolved.fields) {
          return this.formResolved.fields.get(this.name)
        } else if (this.field) {
          return this.field instanceof Field ? this.field : new Field(this.field)
        } else {
          return new Field({
            component: 'undefined'
          })
        }
      },
      formResolved() {
        if (this.form) {
          return this.form
        }

        let $vm = this
        while ($vm.$parent) {
          if ($vm.$parent.fields instanceof FieldList) {
            return $vm.$parent
          }
          $vm = $vm.$parent
        }

        return this.$parent
      },
      modelResolved() {
        return this.model || this.formResolved.model
      },
    },

    methods: {
      input: function ($event) {
        this.$emit('input', $event)
      }
    },
  }
</script>
