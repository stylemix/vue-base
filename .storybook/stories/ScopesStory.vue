<template>
  <fields>
    <template v-slot:field(your_name)="{ field }">
      <input
        :id="field.attribute"
        type="text"
        v-model="model.your_name"
        class="form-control"
        :class="errorClasses"
        v-bind="field.attrs"
        style="border-color: blue;"
      />
      <small>The field is overridden via slot, and added blue border</small>
    </template>
  </fields>
</template>

<script>
import FormMixin from '../../src/mixins/FormMixin'

export default {
  name: 'ScopesStory',
  mixins: [ FormMixin ],
  data() {
    return {
      model: {
      }
    }
  },
  mounted() {
    this.setFields([
      {
        attribute: 'your_name',
        label: 'Your name',
        component: 'text-field',
      },
    ])
  },
}
</script>
