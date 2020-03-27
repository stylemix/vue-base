<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <v-select
        ref="select"
        :disabled="busy || isDisabled"
        :id="field.attribute"
        :options="options"
        :filterable="filterable"
        :placeholder="field.placeholder"
        v-model="selected"
        :class="errorClasses"
        :multiple="field.multiple || false"
        v-bind="field.attrs"
        class="form-control"
        @search="onSearch">
        <template slot="search" slot-scope="search">
          <input
            ref="input"
            class="vs__search"
            v-bind="search.attributes"
            v-on="search.events"
            @focus="onFocus"
            @keypress="onKeypress"/>
        </template>
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
        <span slot="no-options">{{ isSearching ? strings.relation.no_options : strings.relation.type_to_search }}</span>
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
  import uniqBy from 'lodash-es/uniqBy';
  import vSelect from 'vue-select';
  import FieldMixin from '../mixins/FieldMixin';

  export default {
    components: {
      vSelect,
    },

    mixins: [FieldMixin],

    data() {
      return {
        options: [],
        params: {},
        busy: false,
        mounted: false,
        defaultParams: {
          per_page: 9,
        }
      };
    },

    watch: {
      field: {
        handler(val, old) {
          this.params = defaults(this.field.source ? this.field.source.params : {}, this.defaultParams);
          this.setOptions(this.field.options || [])
          if (!this.field.ajax) {
            return
          }
          this.fetch()
        },
        deep: true,
      },
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
            return uniqBy(selected, 'value');
          }

          return head(selected);
        },
        set(option) {
          if (this.field.multiple) {
            const values = map(option, 'value');
            if (!isEqual(values, this.fieldValue)) {
              this.fieldValue = uniqBy(values);
            }
            return;
          }
          this.fieldValue = option ? option.value : null;
        },
      },
      filterable() {
        return !this.field.ajax;
      },
      isSearching() {
        if (!this.mounted) {
          return false;
        }

        return !!this.$refs.select.search
      },
    },

    created() {
      // Take initial options from field config
      // It could contain initially selected option
      this.options = this.field.options || [];
      this.params = defaults(this.field.source ? this.field.source.params : {}, this.defaultParams);

      this.fetch = debounce(() => {
        this.loading(true);

        const promise = this.$http({
          url: this.field.source.url,
          params: this.params,
        });

        promise
          .then((response) => {
            this.setOptions(response.data.data);
          })
          .finally(() => {
            this.loading(false);
          });

        return promise;
      }, 300);
    },

    mounted() {
      this.mounted = true;
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
          label: this.$refs.select && this.$refs.select.mutableLoading ? '...' : value,
        };
      },
      setOptions(options) {
        let preserveOptions = castArray(this.selected);
        this.options = uniqBy(options.concat(preserveOptions), 'value');
      },
      onFocus(event) {
        if (this.field.preload && !this.options.length) {
          this.fetch();
        }
      },
      onKeypress(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      },
    },
  };
</script>

<style lang="scss">
  .form-control.v-select {
    padding: 0 10px;
    height: auto;
    min-height: calc(2.25rem + 2px);

    .dropdown-toggle, .vs__dropdown-toggle {
      border: none;
      padding: 0;

      &::after {
        display: none;
      }

      input[type=search] {
        margin: 0;
        height: auto;
        min-height: calc(2.25rem + 2px);
      }
    }

    .selected-tag, .vs__selected {
      margin-top: 3px;
      margin-bottom: 5px;
    }

    .vs__selected-options {
      margin-left: -9px;
      padding: 0;
    }

    .vs__actions {
      padding-right: 0;
    }
  }
</style>
