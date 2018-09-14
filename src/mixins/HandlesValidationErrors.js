import {Errors} from 'form-backend-validation'

export default {
	props: {
		errors: {
			default: () => new Errors(),
		},
	},

	data: () => ({
		errorClass: 'is-invalid',
	}),

	computed: {
		errorClasses() {
			return this.hasError ? [this.errorClass] : []
		},

		hasError() {
			return this.errors.has(this.field.attribute)
		},

		firstError() {
			if (this.hasError) {
				return this.errors.first(this.field.attribute)
			}
		},
	},
}