<template>
  <component
    :is="layoutComponent"
    :field="field"
    :errors="errors">
    <template slot="field">
      <v-select
        ref="select"
        :disabled="busy"
        :id="field.attribute"
        :options="options"
        :filterable="filterable"
        :placeholder="field.placeholder"
        v-model="selected"
        :class="errorClasses"
        :multiple="field.multiple || false"
        class="form-control"
        @search="onSearch">
        <template
          slot="option"
          slot-scope="option">
          <img
            v-if="option.image"
            :src="option.image"
            style="width: 45px"
            class="float-left mr-2 rounded" />
          <div>{{ option.label }}</div>
          <div
            v-if="option.extra"
            class="text-muted text-sm">
            {{ option.extra }}
          </div>
        </template>
      </v-select>
    </template>
  </component>
</template>

<script>
  import map from 'lodash-es/map';
  import defaults from 'lodash-es/defaults';
  import debounce from 'lodash-es/debounce';
  import castArray from 'lodash-es/castArray';
  import find from 'lodash-es/find';
  import head from 'lodash-es/head';
  import isEqual from 'lodash-es/isEqual';
  import vSelect from 'vue-select';
  import FormField from '../mixins/FormField';

  export default {
    components: {
      vSelect,
    },

    mixins: [FormField],

    data() {
      return {
        options: [],
        params: {},
        busy: false,
      };
    },
    computed: {
      selected: {
        get() {
          const selected = [];
          const values = this.fieldValue === null || this.fieldValue === undefined
            ? []
            : castArray(this.fieldValue);
          values.forEach((value) => {
            selected.push(find(this.options, {value}) || this.getMissedOption(value));
          });

          if (this.field.multiple) {
            return selected;
          }

          return head(selected);
        },
        set(option) {
          if (this.field.multiple) {
            const values = map(option, 'value');
            if (!isEqual(values, this.fieldValue)) {
              this.fieldValue = values;
            }
            return;
          }
          this.fieldValue = option ? option.value : null;
        },
      },
      filterable() {
        return !this.field.ajax;
      }
    },
    created() {
      // Take initial options from field config
      // It could contain initially selected option
      this.options = this.field.options || [];
      this.params = defaults(this.field.source ? this.field.source.params : {}, {
        per_page: 9,
      });

      this.fetch = debounce(() => {
        this.loading(true);

        const promise = this.$http({
          url: this.field.source.url,
          params: this.params,
        });

        promise
          .then((response) => {
            this.options = response.data.data;
          })
          .finally(() => {
            this.loading(false);
          });

        return promise;
      }, 300);
    },
    mounted() {
      if (!this.options.length && this.field.preload) {
        this.fetch();
      }
    },
    methods: {
      loading(value = true) {
        this.$refs.select.toggleLoading(value);
      },
      onSearch(search) {
        if (!this.field.ajax) {
          return;
        }
        this.params[this.field.queryParam || 'query'] = search;
        this.fetch();
      },
      getMissedOption(value) {
        return {
          value,
          label: this.$refs.select && this.$refs.select.mutableLoading ? '...' : '(Missed option)',
        };
      },
    },
  };
</script>

<style lang="scss">
  .form-control.v-select {
    padding: 0 10px;

    .dropdown-toggle {
      border: none;
      padding: 0;

      &::after {
        display: none;
      }

      input[type=search] {
        margin: 0;
      }
    }

    .selected-tag {
      margin-top: 0;
    }

    .vs__selected-options {
      margin-left: -7px;
      padding-left: 0;
    }

    .vs__actions {
      padding-right: 0;
    }
  }
</style>
