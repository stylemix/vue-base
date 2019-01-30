<template>
  <component
    :is="layoutComponent"
    :field="field"
    :errors="errors">
    <template slot="field">
      <editor
        v-model="field.value"
        :options="options"
        class="editor-field" />
    </template>
  </component>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import assign from 'lodash-es/assign';
import FormField from '../mixins/FormField';

export default {
  name: 'FormEditorField',

  components: {
    Editor: quillEditor,
  },

  mixins: [FormField],

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
