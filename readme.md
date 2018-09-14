### Installation
```bash
npm install git@git.stylemix.net:azamatx/stylemix-base-js.git
```
or
```bash
yarn add git@git.stylemix.net:azamatx/stylemix-base-js.git
```

In your main app js:
```
import { Plugin as BasePlugin } from 'stylemix-base'

Vue.use(BasePlugin)
```

### Example form

In Vue:
```vue
// ContactForm.vue
<template>
	<form method="post" @submit.prevent="submit">
		<fields :list="fields" :errors="errors"></fields>
		<button type="submit" class="btn btn-primary">Send</button>
	</form>
</template>

<script>
	import { FormComponent } from 'stylemix-base';

	export default {
		mixins: [ FormComponent ],

		created() {
			this.setFields([
				{
					attribute: 'title',
					component: 'text-field',
					value: 'Initial value'
				}
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
