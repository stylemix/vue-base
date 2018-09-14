import pick from "lodash-es/pick";
import values from "lodash-es/values";
import keyBy from "lodash-es/keyBy";
import omit from "lodash-es/omit";

export class FieldList {

	constructor(fields) {
		this.list = fields;
		this.byAttribute = keyBy(fields, 'attribute');

		// Collect dependencies and assign
		fields.forEach(field => {
			// Add default form data fill method
			field.fillFormData = formData => {
				formData.append(field.attribute, field.value || '');
			};

			// Add default model data fill method
			field.fillModel = model => {
				model[field.attribute] = field.value;
			};

			if (!field.depends) {
				return;
			}

			field.dependentFields = this.only(...field.depends);
		})
	}

	all() {
		return this.list
	}

	get(attribute) {
		return this.byAttribute[attribute];
	}

	only(...attributes) {
		return values(pick(this.byAttribute, attributes))
	}

	except(...attributes) {
		return values(omit(this.byAttribute, attributes))
	}

}
