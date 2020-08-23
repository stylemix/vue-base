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
        <div v-if="!disabled" class="form-group flex-shrink-1">
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
      <div v-if="!disabled">
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
  import isArray from 'lodash-es/isArray'
  import { FieldMixin } from '../mixins'
  import FieldList from '../utils/FieldList'
  import config from "../config"
  import strings from '../strings'

  export default {
    name: 'RepeaterField',

    mixins: [FieldMixin],

    data() {
      return {
        errorClass: 'is-invalid',
        rows: [],
      }
    },

    computed: {
      isSingleField() {
        return this.field;
      },
      labelAddNew() {
        let label = this.labelAddNew
        return label === false ? '' : (label || strings.repeater.add_label);
      },
      iconAddNew() {
        let icon = this.iconAddNew
        return icon === false ? '' : (icon || config.repeaterAddIcon);
      },
      labelRemoveRow() {
        let label = this.labelRemoveRow
        return label === false ? '' : (label || strings.repeater.remove_label);
      },
      iconRemoveRow() {
        let icon = this.iconRemoveRow
        return icon === false ? '' : (icon || config.repeaterRemoveIcon);
      },
      strings() {
        return strings
      },
    },

    mounted() {
      if (isArray(this.fieldValue) && this.fieldValue.length) {
        for (let i in this.fieldValue) {
          this.rows.push(this.getRowFields(i));
        }
      }
    },

    methods: {

      addRow() {
        if (this.disabled) {
          return;
        }

        if (!isArray(this.fieldValue)) {
          this.fieldValue = []
        }

        let newValue = this.fields ? {} : null;
        this.fieldValue.push(newValue);
        this.rows.push(this.getRowFields(this.fieldValue.length - 1));
      },

      removeRow(i) {
        if (this.disabled) {
          return;
        }
        this.fieldValue.splice(i, 1);
        this.rows.splice(i, 1);
      },

      getRowFields(i) {
        let rowFields = [];

        if (this.isSingleField) {
          rowFields = cloneDeep([this.field])
          for (let fieldConfig of rowFields) {
            fieldConfig.attribute = `${this.attribute}.${i}`;
            fieldConfig.disabled = this.disabled;
            fieldConfig.readonly = this.readonly;
          }
        } else {
          rowFields = cloneDeep(this.fields)
          for (let fieldConfig of rowFields) {
            fieldConfig.attribute = `${this.attribute}.${i}.${fieldConfig.attribute}`;
            fieldConfig.disabled = this.disabled;
            fieldConfig.readonly = this.readonly;
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
