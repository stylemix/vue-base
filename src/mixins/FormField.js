import keyBy from "lodash-es/keyBy";
import mapValues from "lodash-es/mapValues";
import isEqual from 'lodash-es/isEqual';
import has from 'lodash-es/has';
import HandlesValidationErrors from './HandlesValidationErrors';
import { getProp, setProp } from "../utils/props";
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
		/**
		 * Used for v-model binding on input element
		 */
		fieldValue: {
			get() {
				return this.value();
			},
			set(value) {
				this.fill(value);
			},
		},
		layoutComponent: function () {
			return (this.layout || config.defaultLayout) + '-layout';
		},
		$events () {
			return this.eventBus || this.$root;
		}
	},

	created() {
		this.setInitialValue();

		if (this.model) {
			if (!has(this.model, this.field.attribute)) {
				setProp(this.model, this.field.attribute, this.field.value);
			}

			this.$watch(
				() => getProp(this.model, this.field.attribute),
				(value) => {
					this.field.value = value;
					this.triggerChange();
				},
				{ deep: true }
			);
		}

		// Register a global event for setting the field's value
		this.$events.$on('field-value-' + this.field.attribute, this.fill);

		if (this.field.depends && this.field.depends.length) {
			this.field.depends.forEach(attr => {
				this.$events.$on('field-change-' + attr, value => {
					this.triggerDependentChange(attr, value);
				});
			});

			this.triggerDependentChange();
		}
	},

	destroyed() {
		this.$events.$off('field-value-' + this.field.attribute);

		if (this.field.depends && this.field.depends.length) {
			this.field.depends.forEach(attr => {
				this.$events.$off('field-change-' + attr);
			});
		}
	},

	methods: {
		/*
		 * Set the initial value for the field
		 */
		setInitialValue() {
		},

		/**
		 * Perform some sanitize actions when filling the value
		 *
		 * @param value
		 * @returns {*}
		 */
		sanitizeValue(value) {
			return value;
		},

		/**
		 * Update the field's value
		 * @param value
		 */
		fill(value) {
			if (isEqual(value, this.field.value)) {
				return;
			}

			if (!this.model) {
				this.field.value = this.sanitizeValue(value);
				this.triggerChange();
			} else {
				setProp(this.model, this.field.attribute, this.sanitizeValue(value));
			}
		},

		/**
		 * Get field's value
		 * @returns {*}
		 */
		value() {
			if (!this.model) {
				return this.field.value;
			}

			return getProp(this.model, this.field.attribute);
		},

		triggerChange() {
			this.$events.$emit('field-change', this.field.value, this.field.attribute);
			this.$events.$emit('field-change-' + this.field.attribute, this.field.value);
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
