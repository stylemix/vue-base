import pick from "lodash-es/pick";
import values from "lodash-es/values";
import keyBy from "lodash-es/keyBy";
import omit from "lodash-es/omit";
import { setProp } from "./props";
import filter from "lodash-es/filter";
import find from "lodash-es/find";
import forOwn from "lodash-es/forOwn";

export class FieldList {

	constructor(fields) {
		this.list = fields;
		this.byAttribute = keyBy(fields, 'attribute');

		// Collect dependencies and assign
		fields.forEach(field => {
			// Add default method to get form data attribute
			field.formDataName = () => {
				let name = field.attribute;

				if (field.attribute.indexOf('.') !== -1) {
					name = field
						.attribute.replace(/\./, '[')
						.replace('.', '][') + ']'
				}

				return name;
			};

			// Add default form data fill method
			field.fillFormData = (formData) => {
				function append(value, name) {
					if (typeof value === 'object' && !(value instanceof File)) {
						forOwn(value, (value, key) => {
							append(value, `${name}[${key}]`)
						});

						return;
					}

					if (value === null || value === undefined) {
						value = '';
					}
					else if (value === true) {
						value = 1;
					}
					else if (value === false) {
						value = 0;
					}

					formData.append(name, value);
				}

				append(field.value, field.formDataName())
			};

			// Add default model data fill method
			field.fillModel = model => {
				setProp(model, field.attribute, field.value);
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

	find(predicate) {
		return find(this.list, predicate);
	}

	only(...attributes) {
		return values(pick(this.byAttribute, attributes))
	}

	except(...attributes) {
		return values(omit(this.byAttribute, attributes))
	}

	filter(predicate) {
		return filter(this.list, predicate)
	}

}
