<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <div class="custom-file">
        <input
          type="file"
          ref="inputElement"
          :id="attribute"
          :multiple="multiple || false"
          :class="errorClasses"
          :accept="mimeTypes"
          :disabled="disabled"
          class="custom-file-input"
          v-bind="attrs"
          @input="input($event)"
        />
        <label
          :for="attribute"
          :placeholder="browse_label"
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
      placeholder: {},
      browseLabel: {type: String}
    },

    data() {
      return {
        errorClass: 'is-invalid',
      }
    },

    computed: {
      /**
       * Get the input placeholder.
       */
      inputPlaceholder() {
        if (!this.fieldValue || (this.multiple && this.fieldValue.length === 0)) {
          return this.placeholder || this.placeholder
        }

        if (this.multiple) {
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

        this.fieldValue = this.multiple ? files : files[0];
      },
    },
  }
</script>
