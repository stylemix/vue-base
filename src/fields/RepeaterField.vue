<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <div
        v-for="(fields, i) in rows"
        :class="{ 'single-field' : isSingleField }"
        class="form-row">
        <field
          v-for="subField in fields.all()"
          :key="subField.attribute"
          :field="subField"
          :form="form"
          :model="model"
          :layout-class="subField.col ? `col-${subField.col}` : 'col'"
          layout="vertical"
        />
        <div v-if="!isDisabled" class="form-group flex-shrink-1">
          <label>&nbsp;</label>
          <div>
            <button
              type="button"
              class="btn btn-light"
              @click.prevent="removeRow(i)">
              <i v-if="iconRemoveRow" :class="iconRemoveRow"></i>
              {{ labelRemoveRow }}
            </button>
          </div>
        </div>
      </div>
      <div v-if="!isDisabled">
        <button
          type="button"
          class="btn btn-link pl-0"
          @click.prevent="addRow()">
          <i v-if="iconAddNew" :class="iconAddNew"></i>
          {{ labelAddNew }}
        </button>
      </div>
    </template>
  </component>
</template>

<script>
  import cloneDeep from 'lodash-es/cloneDeep'
  import { FieldMixin } from '../mixins'
  import FieldList from '../utils/FieldList'
  import config from "../config"

  export default {
    name: 'RepeaterField',

    mixins: [FieldMixin],

    data() {
      return {
        rows: [],
      }
    },

    computed: {
      isSingleField() {
        return this.field.field;
      },
      labelAddNew() {
        let label = this.field.labelAddNew
        return label === false ? '' : (label || config.repeaterAddLabel);
      },
      iconAddNew() {
        let icon = this.field.iconAddNew
        return icon === false ? '' : (icon || config.repeaterAddIcon);
      },
      labelRemoveRow() {
        let label = this.field.labelRemoveRow
        return label === false ? '' : (label || config.repeaterRemoveLabel);
      },
      iconRemoveRow() {
        let icon = this.field.iconRemoveRow
        return icon === false ? '' : (icon || config.repeaterRemoveIcon);
      },
    },

    mounted() {
      if (this.fieldValue.length) {
        for (let i in this.fieldValue) {
          this.rows.push(this.getRowFields(i));
        }
      }
    },

    methods: {

      addRow() {
        if (this.isDisabled) {
          return;
        }
        let newValue = this.field.fields ? {} : null;
        this.fieldValue.push(newValue);
        this.rows.push(this.getRowFields(this.fieldValue.length - 1));
      },

      removeRow(i) {
        if (this.isDisabled) {
          return;
        }
        this.fieldValue.splice(i, 1);
        this.rows.splice(i, 1);
      },

      getRowFields(i) {
        let rowFields = [];

        if (this.isSingleField) {
          rowFields = cloneDeep([this.field.field])
          for (let fieldConfig of rowFields) {
            fieldConfig.attribute = `${this.field.attribute}.${i}`;
            fieldConfig.disabled = this.field.disabled;
            fieldConfig.readonly = this.field.readonly;
          }
        } else {
          rowFields = cloneDeep(this.field.fields)
          for (let fieldConfig of rowFields) {
            fieldConfig.attribute = `${this.field.attribute}.${i}.${fieldConfig.attribute}`;
            fieldConfig.disabled = this.field.disabled;
            fieldConfig.readonly = this.field.readonly;
          }
        }

        return new FieldList(rowFields, this.errors);
      },

    }
  }
</script>

<style scoped>
  .single-field >>> .form-group > label {
    display: none;
  }
</style>
