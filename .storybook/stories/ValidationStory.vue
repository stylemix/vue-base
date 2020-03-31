<template>
  <fields />
</template>

<script>
import FormMixin from '../../src/mixins/FormMixin'
import fields from '../sampleFields'

export default {
  name: 'ValidationStory',
  mixins: [ FormMixin ],
  data() {
    return {
      model: {
        repeat_text: [
          'cat'
        ],
        repeat_fields: [
          { school: null, years: null }
        ],
      }
    }
  },
  mounted() {
    this.setFields(fields)
    this.setValidationErrors({
      'your-name': ['Is required', 'Minimum 3 letters'],
      'your-age': ['Is required'],
      description: ['Is required'],
      category: ['Is required'],
      agree: ['Is required'],
      features: ['Select at least 1 option'],
      gender: ['Is required'],
      attachment: ['Is required'],
      attachments: ['Is required'],
      repeat_text: ['Is required'],
      'repeat_text.0': ['Cats are not allowed'],
      'repeat_fields.0.school': ['Error school'],
      'repeat_fields.0.years': ['Error date']
    })
  },
}
</script>
