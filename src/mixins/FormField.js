import HandlesValidationErrors from './HandlesValidationErrors';
import keyBy from "lodash-es/keyBy";
import mapValues from "lodash-es/mapValues";
import { setProp } from "../utils/props";
import config from "../config";

export default {
	mixins: [ HandlesValidationErrors ],

	props: {
		field: { type: Object, required: true },
		model: { type: Object },
		eventBus: { type: Object },
		layout: { type: String },
		layoutClass: { type: String },
	},

	data: () => ({
		errorClass: 'is-invalid',
	}),

	computed: {
		layoutComponent: function () {
			return (this.layout || config.defaultLayout) + '-layout';
		},
		$events () {
			return this.eventBus || this.$root;
		}
	},

	mounted() {
		this.setInitialValue();

		// Register a global event for setting the field's value
		this.$events.$on('field-value-' + this.field.attribute, this.handleChange);

		if (this.field.depends && this.field.depends.length) {
			this.field.depends.forEach(attr => {
				this.$events.$on('field-change-' + attr, value => {
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
				this.$events.$emit('field-change', value, this.field.attribute);
				this.$events.$emit('field-change-' + this.field.attribute, value);

				this.fillModel();
			}
		}
	},

	destroyed() {
		this.$events.$off('field-value-' + this.field.attribute);

		if (this.field.depends && this.field.depends.length) {
			this.field.depends.forEach(attr => {
				this.$events.$off('field-change-' + attr);
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
			console.log(this.field.attribute + ':handleDependentChange', arguments)
		}
	},
}
