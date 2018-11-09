import HandlesValidationErrors from './HandlesValidationErrors';
import keyBy from "lodash-es/keyBy";
import mapValues from "lodash-es/mapValues";
import { setProp } from "../utils/props";

export default {
	mixins: [ HandlesValidationErrors ],

	props: {
		field: { type: Object, required: true },
		model: { type: Object },
		layout: { default: 'default' },
		layoutClass: { type: String },
	},

	data: () => ({}),

	computed: {
		layoutComponent: function () {
			return this.layout + '-layout';
		}
	},

	mounted() {
		this.setInitialValue();

		// Register a global event for setting the field's value
		Base.$on(this.field.attribute + '-value', this.handleChange);

		if (this.field.depends && this.field.depends.length) {
			this.field.depends.forEach(attr => {
				Base.$on(attr + '-change', value => {
					this.triggerDependentChange(attr, value);
				});
			});

			this.triggerDependentChange();
		}
	},

	watch: {
		'field.value': {
			deep: true,
			handler: function (value) {
				Base.$emit(this.field.attribute + '-change', value);

				this.fillModel();
			}
		}
	},

	destroyed() {
		Base.$off(this.field.attribute + '-value');

		if (this.field.depends && this.field.depends.length) {
			this.field.depends.forEach(attr => {
				Base.$off(attr + '-change');
			})
		}
	},

	methods: {
		/*
		 * Set the initial value for the field
		 */
		setInitialValue() {
		},

		/**
		 * Provide a function that fills a passed model object with the
		 * field's internal value attribute
		 */
		fillModel() {
			if (!this.model) {
				return;
			}

			setProp(this.model, this.field.attribute, this.field.value);
		},

		/**
		 * Update the field's internal value
		 */
		handleChange(value) {
			this.field.value = value;
			this.fillModel();
		},

		triggerDependentChange(attribute, value) {
			let values = mapValues(keyBy(this.field.dependentFields, 'attribute'), 'value');
			this.handleDependentChange(attribute, value, values)
		},

		handleDependentChange(attribute, value, values) {
			//console.log(this.field.attribute + ':handleDependentChange', arguments)
		}
	},
}
