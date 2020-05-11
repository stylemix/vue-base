<template>
  <fields :layout="layout" />
</template>

<script>
import { select } from '@storybook/addon-knobs/dist/index'
import { FormMixin } from '../../../src/mixins'
import sampleFields from '../../sampleFields'

let layoutOptions = {
  vertical: 'vertical',
  horizontal: 'horizontal',
  inline: 'inline',
  empty: 'empty',
}
export default {
  name: 'DefaultLayoutsStory',
  mixins: [ FormMixin ],
  props: {
    layout: {
      default: () => select('Layout', layoutOptions, 'vertical'),
    },
  },
  data() {
    return {
      model: {}
    }
  },
  mounted() {
    this.setFields(sampleFields)
  },
}
</script>
