export default [
  {
    attribute: 'your-name',
    label: 'Text field',
    placeholder: null,
    helpText: 'Simple text field with <input type="text">',
    component: 'text-field',
  },
  {
    attribute: 'your-age',
    label: 'Number field',
    helpText: 'Simple number field with <input type="number">',
    component: 'number-field',
  },
  {
    attribute: 'description',
    label: 'TextArea field',
    helpText: '',
    component: 'textarea-field',
    maxlength: 12,
    disabled: false
  },
  {
    attribute: 'category',
    helpText: '',
    label: 'Select field',
    component: 'select-field',
    // required: true,
    options: [
      {value: 1, label: 'Cat 1'},
      {value: 2, label: 'Cat 2'},
    ],
  },
  {
    attribute: 'agree',
    label: 'Checkbox field',
    helpText: '',
    component: 'checkbox-field',
    disabled: false,
  },
  {
    attribute: 'features',
    label: 'Checkboxes field',
    helpText: '',
    component: 'checkboxes-field',
    //checkboxLayout: 'inline',
    options: [
      {label: 'Feature 1', value: 1},
      {label: 'Feature 2', value: 2},
    ],
  },
  {
    attribute: 'gender',
    label: 'Radios field',
    helpText: '',
    component: 'radios-field',
    radiosLayout: 'inline',
    options: [
      {label: 'Male', value: 'm'},
      {label: 'Female', value: 'f'},
    ],
  },
  {
    attribute: 'attachment',
    label: 'Attachment',
    helpText: '',
    component: 'file-field',
    multiple: false,
  },
  {
    attribute: 'attachments',
    label: 'Attachments (multiple)',
    component: 'file-field',
    helpText: '',
    multiple: true,
  },
  {
    component: 'repeater-field',
    attribute: 'repeat_text',
    label: 'Repeater field',
    helpText: '',
    field: {
      component: 'text-field',
    }
  },
  {
    component: 'repeater-field',
    attribute: 'repeat_fields',
    label: 'Repeat fields',
    helpText: '',
    fields: [
      {
        attribute: 'school',
        label: 'School name',
        component: 'text-field',
        col: 7,
      },
      {
        attribute: 'years',
        label: 'Years',
        component: 'number-field',
      },
    ]
  },
  {
    component: 'hidden-field',
    attribute: 'token',
  },
  {
    component: 'hidden-field',
    attribute: 'payload',
  },
]
