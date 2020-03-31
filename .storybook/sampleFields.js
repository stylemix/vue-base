export default [
  {
    attribute: 'your-name',
    label: 'Text field',
    placeholder: null,
    component: 'text-field',
  },
  {
    attribute: 'your-age',
    label: 'Number field',
    component: 'number-field',
    range: true,
  },
  {
    attribute: 'description',
    label: 'TextArea field',
    component: 'textarea-field',
    maxlength: 12,
    disabled: false
  },
  {
    attribute: 'category',
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
    component: 'checkbox-field',
    disabled: false,
  },
  {
    attribute: 'features',
    label: 'Checkboxes field',
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
    component: 'file-field',
    multiple: false,
  },
  {
    attribute: 'attachments',
    label: 'Attachments (multiple)',
    component: 'file-field',
    multiple: true,
  },
  {
    component: 'repeater-field',
    attribute: 'repeat_text',
    label: 'Repeater field',
    field: {
      component: 'text-field',
    }
  },
  {
    component: 'repeater-field',
    attribute: 'repeat_fields',
    label: 'Repeat fields',
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
