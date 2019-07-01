<template>
  <div>
    <field
      v-for="field in fieldsResolved"
      :key="field.attribute"
      :field="field"
      :form="formResolved"
      :model="modelResolved"
      :layout="layout"
    />
  </div>
</template>

<script>
  import FieldList from '../utils/FieldList'

  export default {
    name: 'Fields',

    props: {
      fields: {},
      group: String,
      ungrouped: Boolean,
      model: Object,
      form: Object,
      layout: String
    },

    computed: {
      fieldsResolved() {
        if (this.fields) {
          return this.fields;
        }

        let fieldList = this.formResolved.fields

        if (this.ungrouped) {
          return fieldList.filter(field => !field.group)
        }

        if (this.group) {
          return fieldList.filter(['group', this.group])
        }

        return fieldList.all()
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
  }
</script>
