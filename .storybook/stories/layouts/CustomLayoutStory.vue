<template>
  <div>
    <fields class="row" :layout="layoutCol4" layout-class="common-styled-label" />
  </div>
</template>

<script>
import { FormMixin } from '../../../src/mixins'
import sampleFields from '../../sampleFields'
import CustomCol4Layout from './CustomCol4Layout'
import CustomCol12Layout from './CustomCol12Layout'

export default {
  name: 'CustomLayoutStory',
  mixins: [ FormMixin ],
  data() {
    return {
      layoutCol4: CustomCol4Layout,
      model: {
      }
    }
  },
  mounted() {
    this.setFields(sampleFields)
    this.fields.get('your-name').layoutClass = 'custom-styled-label'
    this.fields.get('repeat_text').layout = CustomCol12Layout
    this.fields.get('repeat_fields').layout = CustomCol12Layout
  },
}
</script>

<style>
  .common-styled-label > label {
    font-weight: bold;
    text-decoration: underline;
  }
  .custom-styled-label > label {
    font-style: italic;
    color: green;
  }
</style>
