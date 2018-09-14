import Errors from '../utils/Errors';
import { FieldList } from "../utils/FieldList";

export default {
	data() {
		return {
			fields: new FieldList([]),
			errors: new Errors()
		}
	},

	methods: {
		setFields(fields) {
			this.fields = new FieldList(fields);
		},

		formData(only) {
			let formData = new FormData();
			let fields = only || this.fields.all();

			fields.forEach(field => {
				field.fillFormData(formData)
			});

			return formData
		},

		setValidationErrors(errors) {
			this.errors = new Errors(errors);
		},

	}
}
