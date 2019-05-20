<template>
  <component
    :is="'form-' + field.component"
    :field="field"
    :model="modelResolved"
    :form="formResolved"
    :layout="layout"
    @input="input"
  />
</template>

<script>
  import Field from '../utils/Field';

  export default {
    name: "Field",

    props: {
      field: {
        type: Field,
        default: function () {
          return new Field({
            component: 'undefined'
          })
        }
      },
      model: Object,
      errors: {},
      form: {type: Object},
      layout: {}
    },

    computed: {
      formResolved() {
        return this.form || this.$parent;
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
