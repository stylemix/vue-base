<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <div class="custom-file">
        <input
          type="file"
          ref="inputElement"
          :id="field.attribute"
          :multiple="field.multiple || false"
          :class="errorClasses"
          :accept="field.mimeTypes"
          :disabled="isDisabled"
          class="custom-file-input"
          v-bind="field.attrs"
          @input="input($event)"
        />
        <label
          :for="field.attribute"
          :placeholder="field.browse_label"
          class="custom-file-label text-truncate">
          {{ inputPlaceholder }}
        </label>
      </div>
    </template>
  </component>
</template>

<script>
  import { FieldMixin } from '../mixins';

  export default {
    name: 'FormFileField',

    mixins: [FieldMixin],

    props: {
      placeholder: {}
    },

    computed: {
      /**
       * Get the input placeholder.
       */
      inputPlaceholder() {
        if (!this.fieldValue || (this.field.multiple && this.fieldValue.length === 0)) {
          return this.placeholder || this.field.placeholder
        }

        if (this.field.multiple) {
          return this.fieldValue.map(file => {
            return file.name
          }).join(', ')
        }

        return this.fieldValue.name
      },
    },

    methods: {
      input($event) {
        let files = []
        for (let i = 0; i < $event.target.files.length; i++) {
          files.push($event.target.files[i]);
        }

        this.fieldValue = this.field.multiple ? files : files[0];
      },
    },
  }
</script>
