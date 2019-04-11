### Installation
```bash
npm install git@github.com:stylemix/vue-base.git
# or
yarn add git@github.com:stylemix/vue-base.git
```

In your main app js:
```
import { BasePlugin } from 'stylemix-base'

Vue.use(BasePlugin)
```

### Example form

In ContactForm.vue:
```vue
<template>
  <form method="post" @submit.prevent="submit">
    <fields
      :fields="fields.all()"
      :model="model"
      :errors="errors" />
    <button
      type="submit"
      class="btn btn-primary">
      Send
    </button>
  </form>
</template>

<script>
  import { FormMixin } from 'stylemix-base';

  export default {
    mixins: [ FormMixin ],
    
    data() {
      return {
        model: {
          title: 'Initial title',
          email: null,
        },
      };
    },

    created() {
      this.setFields([
        {
          attribute: 'title',
          component: 'text-field',
          required: true,
        },
        {
          attribute: 'email',
          component: 'text-field',
          type: 'email'
        },
      ])
    },

    methods: {
      submit() {
        this.errors.clear();

        let formData = this.formData();

        formData.append('_method', 'POST');

        // send form data
      }
    }
  }
</script>
```
