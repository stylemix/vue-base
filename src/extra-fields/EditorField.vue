<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <quill-editor
        v-model="fieldValue"
        :options="options"
        :disabled="isDisabled"
        class="editor-field" />
    </template>
  </component>
</template>

<script>
import assign from 'lodash-es/assign';
import FieldMixin from '../mixins/FieldMixin';

export default {
  name: 'FormEditorField',

  mixins: [FieldMixin],

  data() {
    return {
    };
  },

  computed: {
    options() {
      let options = {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
          ],
        },
      };

      assign(options, this.field.options);
      assign(options.modules, this.field.modules);

      return options;
    }
  }
};
</script>

<style scoped>
  .editor-field >>> .ql-editor {
    height: 140px;
  }
</style>
