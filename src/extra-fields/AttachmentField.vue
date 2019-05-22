<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <div class="custom-file">
        <input
          :id="field.attribute"
          :class="errorClasses"
          :dusk="field.attribute"
          :multiple="field.multiple || false"
          :accept="field.mimeTypes"
          ref="input"
          type="file"
          class="custom-file-input"
          @input="input($event)">
        <label
          :for="field.attribute"
          class="custom-file-label">{{ field.placeholder || 'Click to select files' }}</label>
      </div>
      <div
        v-if="hasAttached && field.multiple">
        <draggable
          :options="draggableOptions"
          v-model="sortables"
          class="field-attachments mt-4">
          <div
            v-for="attachment in field.attached"
            :key="attachment.id"
            class="field-attachment field-attachment-draggable bg-light rounded p-2">
            <attachment-preview
              :attachment="attachment"
              :options="previewOptions" />
            <button
              type="button"
              @click.prevent="remove(attachment)"
              class="close rounded btn-remove bg-secondary">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </draggable>
        <button
          type="button"
          v-if="hasAttached && field.multiple"
          @click.stop.prevent="clear()"
          class="btn btn-sm btn-warning">Clear all</button>
      </div>
      <div
        v-if="hasAttached && !field.multiple">
        <div
          class="field-attachments mt-4">
          <div class="field-attachment bg-light rounded p-2">
            <attachment-preview
              :attachment="field.attached"
              :options="previewOptions"/>
            <button
              type="button"
              @click.stop.prevent="clear()"
              class="close rounded btn-remove bg-secondary">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </component>
</template>

<script>
  import draggable from 'vuedraggable';
  import assign from 'lodash-es/assign';
  import FieldMixin from '../mixins/FieldMixin';
  import AttachmentPreview from './AttachmentPreview.vue';
  import pick from 'lodash-es/pick';

  function fileToAttached(file) {
  return {
    id: Math.random(),
    file,
    filename: file.name,
    mime_type: file.type,
    size: file.size,
  };
}

export default {
  components: {
    draggable,
    AttachmentPreview,
  },

  mixins: [FieldMixin],

  data() {
    return {
    };
  },

  computed: {
    hasAttached() {
      return this.field.multiple ?
        !! this.field.attached.length :
        !! this.field.attached;
    },
    draggableOptions() {
      const options = { direction: 'horizontal' };
      assign(options, this.field.draggableOptions);
      return options;
    },
    previewOptions() {
      return pick(this.field, [
        'previewMaxWidth',
        'previewMaxHeight',
        'previewMinWidth',
        'previewMinHeight',
        'previewCrop',
      ]);
    },
    sortables: {
      get() {
        return this.field.attached;
      },
      set(sorted) {
        this.field.attached = sorted;
        this.fieldValue = this.field.attached.map((attachment) => {
          return attachment.file ? attachment.file : attachment.id;
        });
      }
    },
  },

  created() {
    if (this.field.multiple) {
      // For correct reactivity and sorting
      if (!this.field.attached) {
        this.field.attached = [];
      }

      if (!this.fieldValue) {
        this.fieldValue = [];
      }
    }
  },

  methods: {
    remove(attachment) {
      if (this.field.multiple) {
        this.field.attached = this.field.attached.filter((a) => a.id !== attachment.id);
        this.fieldValue = this.fieldValue.filter((id) => {
          if (attachment.file) {
            return id !== attachment.file;
          }

          return id !== attachment.id
        });
      } else {
        this.field.attached = null;
        this.fieldValue = null;
      }
    },
    clear() {
      if (this.field.multiple) {
        this.field.attached = [];
        this.fieldValue = [];
      } else {
        this.field.attached = null;
        this.fieldValue = null;
      }
    },
    input($event) {
      const files = [];

      for (let i = 0; i < $event.target.files.length; i += 1) {
        files.push($event.target.files[i]);
      }

      this.field.attached = this.field.multiple ?
        this.field.attached.concat(files.map(fileToAttached)) :
        fileToAttached(files[0]);

      this.fieldValue = this.field.multiple ? this.fieldValue.concat(files) : files[0];

      this.$refs.input.value = '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .field-attachments {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .field-attachment {
    position: relative;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }

  .btn-remove {
    position: absolute;
    top: -.5rem;
    right: -.5rem;
    line-height: 100%;
    height: 1.5rem;
    width: 1.5rem;
    opacity: 1;
    color: white;
  }

  .field-attachment-preview {
    font-size: 85%;
  }

  .field-attachment-draggable {
    cursor: move;
  }
</style>
