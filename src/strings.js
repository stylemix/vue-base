import Vue from 'vue'

const strings = {
  select: {
    choose: 'Choose an option',
  },
  date_time: {
    select_datetime: 'Select date & time',
    select_date: 'Select date',
    select_time: 'Select time',
    select_period: 'Select date period',
    now: 'Now',
    clear: 'Clear',
  },
  file: {
    placeholder: 'Click to select files',
    browse: 'Browse',
  },
  attachment: {
    clear: 'Clear all',
  },
  repeater: {
    add_label: 'Add new',
    remove_label: 'Remove',
  },
  location: {
    placeholder: 'Start typing',
  },
  relation: {
    no_options: 'Sorry, no matching options.',
    type_to_search: 'Please, type to search options.',
  },
}

const $vm = new (Vue.extend({
  data: () => ({ strings })
}))

export default $vm.strings
