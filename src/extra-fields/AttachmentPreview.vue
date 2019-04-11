<template>
  <div
    :class="{ 'field-attachment-preview-image': isImage }"
    :style="{ 'max-width': previewOptions.previewMaxWidth + 'px' }"
    class="field-attachment-preview">
    <img
      v-if="isImage"
      :src="imagePreview"
      class="img-fluid mb-1"/>
    <a
      v-if="attachment.url"
      :href="attachment.url"
      class="d-block"
      target="_blank">
      {{ attachment.filename }}
    </a>
    <div v-else>
      {{ attachment.filename }}
    </div>
  </div>
</template>

<script>
  import loadImage from 'blueimp-load-image';
  import config from './config';
  import assign from 'lodash-es/assign';
  import pick from 'lodash-es/pick';

  export default {
    name: 'AttachmentPreview',

    props: {
      attachment: { type: Object, required: true },
      options: { type: Object },
    },

    data: () => ({
      imagePreview: null
    }),

    mounted() {
      this.setImagePreview();
    },

    computed: {
      isImage() {
        return this.attachment.mime_type &&
          this.attachment.mime_type.match(/image/);
      },
      previewOptions() {
        return assign(pick(config, [
          'previewMaxWidth',
          'previewMaxHeight',
          'previewMinWidth',
          'previewMinHeight',
          'previewCrop',
        ]), this.options)
      }
    },

    methods: {
      setImagePreview() {
        if (!this.isImage) {
          return;
        }

        if (this.attachment.file instanceof File) {
          loadImage(
            this.attachment.file,
            (canvas) => {
              this.imagePreview = canvas.toDataURL();
            },
            {
              canvas: true,
              maxWidth: this.previewOptions.previewMaxWidth,
              maxHeight: this.previewOptions.previewMaxHeight,
              minWidth: this.previewOptions.previewMinWidth,
              minHeight: this.previewOptions.previewMinHeight,
              crop: this.previewOptions.previewCrop,
            }
          );
        } else {
          this.imagePreview = this.attachment.url;
        }
      }
    },

    watch: {
      'attachment': function () {
        this.setImagePreview();
      }
    },
  }
</script>
