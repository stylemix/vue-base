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
  export default {
    name: "Fields",

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
        return this.form || this.$parent;
      },
      modelResolved() {
        return this.model || this.formResolved.model
      },
    },
  }
</script>
