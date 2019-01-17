/* stylemix-base v1.1.2 (c) Azamat X <azamat@stylemix.net> - UNLICENSED */
import Vue from 'vue';
import keyBy from 'lodash-es/keyBy';
import mapValues from 'lodash-es/mapValues';
import isEqual from 'lodash-es/isEqual';
import has from 'lodash-es/has';
import pick from 'lodash-es/pick';
import values from 'lodash-es/values';
import omit from 'lodash-es/omit';
import filter from 'lodash-es/filter';
import find from 'lodash-es/find';
import forOwn from 'lodash-es/forOwn';
import isArray from 'lodash-es/isArray';
import assign from 'lodash-es/assign';

//
//
//
//
//
//
//
//
//
//
//
//

var script = {
	name: "Field",

	props: {
		field: {
			default: function () {
				return {
					component: 'undefined'
				}
			}
		},
		model: Object,
		errors: {},
		eventBus: { type: Object },
		layout: {}
	},

	computed: {
		$events () {
			return this.eventBus || this.$parent;
		}
	},

	methods: {
		input: function ($event) {
			this.$emit('input', $event);
		}
	},
};

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("form-" + _vm.field.component, {
    tag: "component",
    attrs: {
      field: _vm.field,
      model: _vm.model,
      errors: _vm.errors,
      "event-bus": _vm.$events,
      layout: _vm.layout
    },
    on: { input: _vm.input }
  })
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/common/Field.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Field = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

class Errors {
    /**
     * Create a new Errors instance.
     */
    constructor(errors = {}) {
        this.record(errors);
    }

    /**
     * Get all the errors.
     *
     * @return {object}
     */
    all() {
        return this.errors;
    }

    /**
     * Determine if any errors exists for the given field or object.
     *
     * @param {string} field
     */
    has(field) {
        let hasError = this.errors.hasOwnProperty(field);

        if (!hasError) {
            const errors = Object.keys(this.errors).filter(
                e => e.startsWith(`${field}.`) || e.startsWith(`${field}[`)
            );

            hasError = errors.length > 0;
        }

        return hasError;
    }

    first(field) {
        return this.get(field)[0];
    }

    get(field) {
        return this.errors[field] || [];
    }

    /**
     * Determine if we have any errors.
     */
    any() {
        return Object.keys(this.errors).length > 0;
    }

    /**
     * Record the new errors.
     *
     * @param {object} errors
     */
    record(errors = {}) {
        this.errors = errors;
    }

    /**
     * Clear a specific field, object or all error fields.
     *
     * @param {string|null} field
     */
    clear(field) {
        if (!field) {
            this.errors = {};

            return;
        }
        
        let errors = Object.assign({}, this.errors);

        Object.keys(errors)
            .filter(e => e === field || e.startsWith(`${field}.`) || e.startsWith(`${field}[`))
            .forEach(e => delete errors[e]);
        
        this.errors = errors;
    }
}

//

var script$1 = {
	name: "Fields",

	props: {
		fields: {},
		model: Object,
		errors: {
			default: () => new Errors()
		},
		eventBus: { type: Object },
		layout: String
	},

	computed: {
		$events () {
			return this.eventBus || this.$parent;
		}
	},
};

/* script */
            const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    _vm._l(_vm.fields, function(field) {
      return _c("field", {
        key: field.attribute,
        attrs: {
          field: field,
          model: _vm.model,
          errors: _vm.errors,
          "event-bus": _vm.$events,
          layout: _vm.layout
        }
      })
    })
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/common/Fields.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Fields = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

let config = {
	defaultLayout: 'vertical',
	errorMessages: 'first',
	errorMessagesGlue: '<br />',
};

var HandlesValidationErrors = {
	props: {
		errors: {
			default: () => new Errors(),
		},
	},

	data: () => ({
		errorClass: '',
	}),

	computed: {
		errorClasses() {
			return this.hasError ? [this.errorClass] : []
		},

		hasError() {
			return this.errors.has(this.field.attribute)
		},

		errorMessages() {
			if (this.hasError && config.errorMessages) {
				return config.errorMessages === 'first'
					? this.errors.first(this.field.attribute)
					: this.errors.get(this.field.attribute).join(config.errorMessagesGlue)
			}
		},
	},
};

var FieldLayoutMixin = {
	mixins: [ HandlesValidationErrors ],

	props: {
		field: {type: Object, required: true},
		fieldLabel: {type: String},
		layoutClass: {type: String},
		showLabel: {type: Boolean, default: true},
		showHelpText: {type: Boolean, default: true},
	},
};

//

var script$2 = {
	mixins: [ FieldLayoutMixin ]
};

/* script */
            const __vue_script__$2 = script$2;
            
/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.layoutClass }, [_vm._t("field")], 2)
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/common/EmptyLayout.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var EmptyLayout = __vue_normalize__$2(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

//

var script$3 = {
	mixins: [ FieldLayoutMixin ]
};

/* script */
            const __vue_script__$3 = script$3;
            
/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "form-group", class: _vm.errorClasses },
    [
      _vm.showLabel
        ? _c("label", { attrs: { for: _vm.field.attribute } }, [
            _vm._v(
              "\n\t\t" + _vm._s(_vm.fieldLabel || _vm.field.label) + "\n\t"
            )
          ])
        : _c(
            "label",
            {
              staticClass: "placeholder-label",
              attrs: { for: _vm.field.attribute }
            },
            [_vm._v("\n\t\t \n\t")]
          ),
      _vm._v(" "),
      _vm._t("field"),
      _vm._v(" "),
      _vm._t("errors", [
        _vm.hasError
          ? _c("div", {
              staticClass: "invalid-feedback d-block",
              domProps: { innerHTML: _vm._s(_vm.errorMessages) }
            })
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm.showHelpText && _vm.field.helpText
        ? _c("small", { staticClass: "form-text text-muted" }, [
            _vm._v("\n\t\t" + _vm._s(_vm.field.helpText) + "\n\t")
          ])
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-5d054abf_0", { source: "\n.placeholder-label[data-v-5d054abf] {\n\tdisplay: none;\n}\n.col .placeholder-label[data-v-5d054abf] {\n\tdisplay: block;\n}\n[class*=\" col-\"] .placeholder-label[data-v-5d054abf] {\n\tdisplay: block;\n}\n", map: {"version":3,"sources":["/Users/azamatx/projects/base-js/package/src/layouts/VericalLayout.vue"],"names":[],"mappings":";AAiCA;CACA,cAAA;CACA;AAEA;CACA,eAAA;CACA;AACA;CACA,eAAA;CACA","file":"VericalLayout.vue","sourcesContent":["<template>\n\t<div class=\"form-group\" :class=\"errorClasses\">\n\t\t<label v-if=\"showLabel\"\n\t\t\t   :for=\"field.attribute\">\n\t\t\t{{ fieldLabel || field.label }}\n\t\t</label>\n\t\t<label v-else class=\"placeholder-label\"\n\t\t\t   :for=\"field.attribute\">\n\t\t\t&nbsp;\n\t\t</label>\n\t\t<slot name=\"field\"/>\n\t\t<slot name=\"errors\">\n\t\t\t<div v-if=\"hasError\"\n\t\t\t\t v-html=\"errorMessages\"\n\t\t\t\t class=\"invalid-feedback d-block\">\n\t\t\t</div>\n\t\t</slot>\n\t\t<small v-if=\"showHelpText && field.helpText\"\n\t\t\t   class=\"form-text text-muted\">\n\t\t\t{{ field.helpText }}\n\t\t</small>\n\t</div>\n</template>\n\n<script>\n\timport FieldLayoutMixin from \"../mixins/FieldLayoutMixin\";\n\n\texport default {\n\t\tmixins: [ FieldLayoutMixin ]\n\t}\n</script>\n\n<style type=\"text/scss\" scoped>\n\t.placeholder-label {\n\t\tdisplay: none;\n\t}\n\n\t.col .placeholder-label {\n\t\tdisplay: block;\n\t}\n\t[class*=\" col-\"] .placeholder-label {\n\t\tdisplay: block;\n\t}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-5d054abf";
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/layouts/VericalLayout.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var VericalLayout = __vue_normalize__$3(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    __vue_create_injector__,
    undefined
  );

//

var script$4 = {
	mixins: [ FieldLayoutMixin ]
};

/* script */
            const __vue_script__$4 = script$4;
            
/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "form-group row", class: _vm.errorClasses }, [
    _vm.showLabel
      ? _c(
          "label",
          {
            staticClass: "col-sm-4 col-form-label text-sm-right",
            attrs: { for: _vm.field.attribute }
          },
          [
            _vm._v(
              "\n\t\t" + _vm._s(_vm.fieldLabel || _vm.field.label) + "\n\t"
            )
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "col-sm-8", class: { "offset-sm-4": !_vm.showLabel } },
      [
        _vm._t("field"),
        _vm._v(" "),
        _vm._t("errors", [
          _vm.hasError
            ? _c("div", {
                staticClass: "invalid-feedback d-block",
                domProps: { innerHTML: _vm._s(_vm.errorMessages) }
              })
            : _vm._e()
        ]),
        _vm._v(" "),
        _vm.showHelpText && _vm.field.helpText
          ? _c("small", { staticClass: "form-text text-muted" }, [
              _vm._v("\n\t\t\t" + _vm._s(_vm.field.helpText) + "\n\t\t")
            ])
          : _vm._e()
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* component normalizer */
  function __vue_normalize__$4(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/layouts/HorizontalLayout.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var HorizontalLayout = __vue_normalize__$4(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );

//

var script$5 = {
	mixins: [ FieldLayoutMixin ]
};

/* script */
            const __vue_script__$5 = script$5;
            
/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "d-inline-block mb-2 mr-sm-2", class: _vm.errorClasses },
    [
      _c(
        "label",
        { staticClass: "sr-only", attrs: { for: _vm.field.attribute } },
        [_vm._v("\n\t\t" + _vm._s(_vm.field.label || _vm.fieldLabel) + "\n\t")]
      ),
      _vm._v(" "),
      _vm._t("field"),
      _vm._v(" "),
      _vm._t("errors", [
        _vm.hasError
          ? _c("div", {
              staticClass: "invalid-tooltip d-block",
              domProps: { innerHTML: _vm._s(_vm.errorMessages) }
            })
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm.showHelpText && _vm.field.helpText
        ? _c("small", { staticClass: "form-text text-muted" }, [
            _vm._v("\n\t\t" + _vm._s(_vm.field.helpText) + "\n\t")
          ])
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* component normalizer */
  function __vue_normalize__$5(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/layouts/InlineLayout.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var InlineLayout = __vue_normalize__$5(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    undefined
  );

//
//
//
//

var script$6 = {
	name: 'FormUndefinedField'
};

/* script */
            const __vue_script__$6 = script$6;
            
/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div")
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* component normalizer */
  function __vue_normalize__$6(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/fields/Undefined.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Undefined = __vue_normalize__$6(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    undefined
  );

function setProp(obj, props, value) {
	if (typeof props === "string") {
		props = props.split('.');
	}

	const prop = props.shift();

	if (!obj[prop] && props.length) {
		Vue.set(obj, prop, {});
	}

	if (!props.length) {
		Vue.set(obj, prop, value);
		return;
	}

	setProp(obj[prop], props, value);
}

function getProp(obj, props) {
	if (typeof props === "string") {
		props = props.split('.');
	}

	const prop = props.shift();

	if (!obj[prop] || !props.length) {
		return obj[prop];
	}

	return getProp(obj[prop], props);
}

var FormField = {
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
			let values$$1 = mapValues(keyBy(this.field.dependentFields, 'attribute'), 'value');
			this.handleDependentChange(attribute, value, values$$1);
		},

		handleDependentChange(attribute, value, values$$1) {
			//console.log(this.field.attribute + ':handleDependentChange', arguments)
		}
	},
};

class FieldList {

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
						.replace('.', '][') + ']';
				}

				return name;
			};

			// Add default form data fill method
			field.fillFormData = (formData) => {
				function append(value, name) {
					if (value === null || value === undefined) {
						value = '';
					}
					else if (value === true) {
						value = 1;
					}
					else if (value === false) {
						value = 0;
					}
					else if (typeof value === 'object' && !(value instanceof File)) {
						forOwn(value, (value, key) => {
							append(value, `${name}[${key}]`);
						});

						return;
					}

					formData.append(name, value);
				}

				append(field.value, field.formDataName());
			};

			// Add default model data fill method
			field.fillModel = model => {
				setProp(model, field.attribute, field.value);
			};

			if (!field.depends) {
				return;
			}

			field.dependentFields = this.only(...field.depends);
		});
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

var FormComponent = {
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
				field.fillFormData(formData);
			});

			return formData
		},

		setValidationErrors(errors) {
			this.errors = new Errors(errors);
		},

	}
};

//

var script$7 = {
	name: 'FormTextField',

	mixins: [ FormField ],

	props: {
		readonly: {},
		disabled: {},
		placeholder: {},
		step: {},
		min: {},
		max: {},
		pattern: {},
	},

	computed: {
		/**
		 * Get the input type.
		 */
		inputType() {
			return this.field.type || 'text'
		},

		/**
		 * Get the input placeholder.
		 */
		inputPlaceholder() {
			return this.placeholder || this.field.placeholder
		},

		/**
		 * Get the input readonly state.
		 */
		inputReadonly() {
			return this.readonly || this.field.readonly
		},

		/**
		 * Get the input disabled state.
		 */
		inputDisabled() {
			return this.disabled || this.field.disabled
		},

		/**
		 * Get the input step amount.
		 */
		inputStep() {
			return this.step || this.field.step
		},

		/**
		 * Get the input minimum amount.
		 */
		inputMin() {
			return this.min || this.field.min
		},

		/**
		 * Get the input maximum amount.
		 */
		inputMax() {
			return this.max || this.field.max
		},

		/**
		 * Get the pattern that should be used for the field
		 */
		inputPattern() {
			return this.pattern || this.field.pattern
		},
	},

	methods: {
		sanitizeValue(value) {
			if (this.field.type === 'number') {
				return Number(value);
			}

			return value;
		},
	},
};

/* script */
            const __vue_script__$7 = script$7;
            
/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.layoutComponent,
    { tag: "component", attrs: { field: _vm.field, errors: _vm.errors } },
    [
      _c("template", { slot: "field" }, [
        _vm.inputType === "checkbox"
          ? _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fieldValue,
                  expression: "fieldValue"
                }
              ],
              staticClass: "form-control",
              class: _vm.errorClasses,
              attrs: {
                id: _vm.field.attribute,
                dusk: _vm.field.attribute,
                min: _vm.inputMin,
                max: _vm.inputMax,
                step: _vm.inputStep,
                pattern: _vm.inputPattern,
                placeholder: _vm.inputPlaceholder,
                readonly: _vm.inputReadonly,
                disabled: _vm.inputDisabled,
                type: "checkbox"
              },
              domProps: {
                checked: Array.isArray(_vm.fieldValue)
                  ? _vm._i(_vm.fieldValue, null) > -1
                  : _vm.fieldValue
              },
              on: {
                change: function($event) {
                  var $$a = _vm.fieldValue,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false;
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v);
                    if ($$el.checked) {
                      $$i < 0 && (_vm.fieldValue = $$a.concat([$$v]));
                    } else {
                      $$i > -1 &&
                        (_vm.fieldValue = $$a
                          .slice(0, $$i)
                          .concat($$a.slice($$i + 1)));
                    }
                  } else {
                    _vm.fieldValue = $$c;
                  }
                }
              }
            })
          : _vm.inputType === "radio"
            ? _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fieldValue,
                    expression: "fieldValue"
                  }
                ],
                staticClass: "form-control",
                class: _vm.errorClasses,
                attrs: {
                  id: _vm.field.attribute,
                  dusk: _vm.field.attribute,
                  min: _vm.inputMin,
                  max: _vm.inputMax,
                  step: _vm.inputStep,
                  pattern: _vm.inputPattern,
                  placeholder: _vm.inputPlaceholder,
                  readonly: _vm.inputReadonly,
                  disabled: _vm.inputDisabled,
                  type: "radio"
                },
                domProps: { checked: _vm._q(_vm.fieldValue, null) },
                on: {
                  change: function($event) {
                    _vm.fieldValue = null;
                  }
                }
              })
            : _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fieldValue,
                    expression: "fieldValue"
                  }
                ],
                staticClass: "form-control",
                class: _vm.errorClasses,
                attrs: {
                  id: _vm.field.attribute,
                  dusk: _vm.field.attribute,
                  min: _vm.inputMin,
                  max: _vm.inputMax,
                  step: _vm.inputStep,
                  pattern: _vm.inputPattern,
                  placeholder: _vm.inputPlaceholder,
                  readonly: _vm.inputReadonly,
                  disabled: _vm.inputDisabled,
                  type: _vm.inputType
                },
                domProps: { value: _vm.fieldValue },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.fieldValue = $event.target.value;
                  }
                }
              })
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* component normalizer */
  function __vue_normalize__$7(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/fields/TextField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var TextField = __vue_normalize__$7(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

//

var script$8 = {
	name: 'FormTextField',

	mixins: [ FormField ],

	props: {
		placeholder: {}
	},

	computed: {
		/**
		 * Get the input placeholder.
		 */
		inputPlaceholder() {
			return this.placeholder || this.field.placeholder
		}
	},

	methods: {

		input ($event) {
			let files = [];
			for (let i = 0; i < $event.target.files.length; i++) {
				files.push($event.target.files[i]);
			}

			this.fieldValue = this.field.multiple ? files : files[0];
			this.$refs.inputElement.value = '';
		}

	}

};

/* script */
            const __vue_script__$8 = script$8;
            
/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.layoutComponent,
    { tag: "component", attrs: { field: _vm.field, errors: _vm.errors } },
    [
      _c("template", { slot: "field" }, [
        _c("input", {
          ref: "inputElement",
          staticClass: "form-control",
          class: _vm.errorClasses,
          attrs: {
            id: _vm.field.attribute,
            dusk: _vm.field.attribute,
            type: "file",
            multiple: _vm.field.multiple || false,
            placeholder: _vm.inputPlaceholder,
            accept: _vm.field.mimeTypes
          },
          on: {
            input: function($event) {
              _vm.input($event);
            }
          }
        })
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* component normalizer */
  function __vue_normalize__$8(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/fields/FileField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var FileField = __vue_normalize__$8(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    undefined,
    undefined
  );

//

var script$9 = {
	mixins: [ FormField ],

	props: {
		disabled: {},
	},

	computed: {
		/**
		 * Get the input disabled state.
		 */
		inputDisabled() {
			return this.disabled || this.field.disabled
		},
	}
};

/* script */
            const __vue_script__$9 = script$9;
            
/* template */
var __vue_render__$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.layoutComponent,
    { tag: "component", attrs: { field: _vm.field, errors: _vm.errors } },
    [
      _c("template", { slot: "field" }, [
        _c(
          "select",
          {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.fieldValue,
                expression: "fieldValue"
              }
            ],
            staticClass: "form-control",
            class: _vm.errorClasses,
            attrs: {
              id: _vm.field.name,
              multiple: _vm.field.multiple || false,
              disabled: _vm.inputDisabled
            },
            on: {
              change: function($event) {
                var $$selectedVal = Array.prototype.filter
                  .call($event.target.options, function(o) {
                    return o.selected
                  })
                  .map(function(o) {
                    var val = "_value" in o ? o._value : o.value;
                    return val
                  });
                _vm.fieldValue = $event.target.multiple
                  ? $$selectedVal
                  : $$selectedVal[0];
              }
            }
          },
          [
            _c("option", { attrs: { value: "", selected: "", disabled: "" } }, [
              _vm._v(
                "\n\t\t\t\t" +
                  _vm._s(_vm.field.placeholder || "Choose an option") +
                  "\n\t\t\t"
              )
            ]),
            _vm._v(" "),
            _vm._l(_vm.field.options, function(option) {
              return _c(
                "option",
                {
                  domProps: {
                    value: option.value,
                    selected: option.value == _vm.fieldValue
                  }
                },
                [_vm._v("\n\t\t\t\t" + _vm._s(option.label) + "\n\t\t\t")]
              )
            })
          ],
          2
        )
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  const __vue_inject_styles__$9 = undefined;
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* component normalizer */
  function __vue_normalize__$9(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/fields/SelectField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var SelectField = __vue_normalize__$9(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    undefined,
    undefined
  );

//

var script$a = {
	name: 'RadiosField',

	mixins: [ FormField ],

	props: {
		radiosLayout: { type: String }
	},

	computed: {
		radiosLayoutClass() {
			let layout = this.radiosLayout || this.field.radiosLayout;
			return `form-check-${layout}`;
		}
	}

};

/* script */
            const __vue_script__$a = script$a;
            
/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.layoutComponent,
    {
      tag: "component",
      attrs: { field: _vm.field, errors: _vm.errors, "show-label": false }
    },
    [
      _c(
        "template",
        { slot: "field" },
        _vm._l(_vm.field.options, function(option, index) {
          return _c(
            "div",
            {
              key: option.value,
              staticClass: "form-check",
              class: _vm.radiosLayoutClass
            },
            [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fieldValue,
                    expression: "fieldValue"
                  }
                ],
                staticClass: "form-check-input",
                attrs: { id: _vm.field.attribute + index, type: "radio" },
                domProps: {
                  value: option.value,
                  checked: _vm._q(_vm.fieldValue, option.value)
                },
                on: {
                  change: function($event) {
                    _vm.fieldValue = option.value;
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "label",
                {
                  staticClass: "form-check-label",
                  attrs: { for: _vm.field.attribute + index }
                },
                [_vm._v("\n\t\t\t\t" + _vm._s(option.label) + "\n\t\t\t")]
              )
            ]
          )
        })
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* component normalizer */
  function __vue_normalize__$a(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/fields/RadiosField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var RadiosField = __vue_normalize__$a(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    undefined,
    undefined
  );

//

var script$b = {
	name: 'CheckboxField',

	mixins: [ FormField ],

	props: {
		fieldLabel: { type: String },
		disabled: {},
	},

	computed: {
		/**
		 * Get the input disabled state.
		 */
		inputDisabled() {
			return this.disabled || this.field.disabled
		},
	},


};

/* script */
            const __vue_script__$b = script$b;
            
/* template */
var __vue_render__$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.layoutComponent,
    {
      tag: "component",
      attrs: { field: _vm.field, errors: _vm.errors, "show-label": false }
    },
    [
      _c("template", { slot: "field" }, [
        _c("div", { staticClass: "form-check" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.fieldValue,
                expression: "fieldValue"
              }
            ],
            staticClass: "form-check-input",
            class: _vm.errorClasses,
            attrs: {
              id: _vm.field.attribute,
              dusk: _vm.field.attribute,
              type: "checkbox",
              disabled: _vm.inputDisabled
            },
            domProps: {
              checked: Array.isArray(_vm.fieldValue)
                ? _vm._i(_vm.fieldValue, null) > -1
                : _vm.fieldValue
            },
            on: {
              change: function($event) {
                var $$a = _vm.fieldValue,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false;
                if (Array.isArray($$a)) {
                  var $$v = null,
                    $$i = _vm._i($$a, $$v);
                  if ($$el.checked) {
                    $$i < 0 && (_vm.fieldValue = $$a.concat([$$v]));
                  } else {
                    $$i > -1 &&
                      (_vm.fieldValue = $$a
                        .slice(0, $$i)
                        .concat($$a.slice($$i + 1)));
                  }
                } else {
                  _vm.fieldValue = $$c;
                }
              }
            }
          }),
          _vm._v(" "),
          _c("label", { attrs: { for: _vm.field.attribute } }, [
            _vm._v(
              "\n\t\t\t\t" +
                _vm._s(_vm.field.label || _vm.fieldLabel) +
                "\n\t\t\t"
            )
          ]),
          _vm._v(" "),
          _vm.hasError
            ? _c("div", { staticClass: "invalid-feedback" }, [
                _vm._v("\n\t\t\t\t" + _vm._s(_vm.errorMessages) + "\n\t\t\t")
              ])
            : _vm._e()
        ])
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  const __vue_inject_styles__$b = undefined;
  /* scoped */
  const __vue_scope_id__$b = undefined;
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* component normalizer */
  function __vue_normalize__$b(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/fields/CheckboxField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CheckboxField = __vue_normalize__$b(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    undefined,
    undefined
  );

//

var script$c = {
	name: 'CheckboxesField',

	mixins: [ FormField ],

	props: {
		checkboxLayout: { type: String }
	},

	computed: {
		checkboxLayoutClass() {
			let layout = this.checkboxLayout || this.field.checkboxLayout;
			return `form-check-${layout}`;
		}
	},

	methods: {
		/*
		 * Set the initial value for the field
		 */
		setInitialValue() {
			if (!isArray(this.fieldValue)) {
				this.fieldValue = [];
			}
		},
	}
};

/* script */
            const __vue_script__$c = script$c;
            
/* template */
var __vue_render__$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.layoutComponent,
    {
      tag: "component",
      attrs: { field: _vm.field, errors: _vm.errors, "show-label": false }
    },
    [
      _c(
        "template",
        { slot: "field" },
        _vm._l(_vm.field.options, function(option, index) {
          return _c(
            "div",
            {
              key: option.value,
              staticClass: "form-check",
              class: _vm.checkboxLayoutClass
            },
            [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fieldValue,
                    expression: "fieldValue"
                  }
                ],
                staticClass: "form-check-input",
                attrs: { id: _vm.field.attribute + index, type: "checkbox" },
                domProps: {
                  value: option.value,
                  checked: Array.isArray(_vm.fieldValue)
                    ? _vm._i(_vm.fieldValue, option.value) > -1
                    : _vm.fieldValue
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.fieldValue,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false;
                    if (Array.isArray($$a)) {
                      var $$v = option.value,
                        $$i = _vm._i($$a, $$v);
                      if ($$el.checked) {
                        $$i < 0 && (_vm.fieldValue = $$a.concat([$$v]));
                      } else {
                        $$i > -1 &&
                          (_vm.fieldValue = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)));
                      }
                    } else {
                      _vm.fieldValue = $$c;
                    }
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "label",
                {
                  staticClass: "form-check-label",
                  attrs: { for: _vm.field.attribute + index }
                },
                [_vm._v("\n\t\t\t\t" + _vm._s(option.label) + "\n\t\t\t")]
              )
            ]
          )
        })
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* component normalizer */
  function __vue_normalize__$c(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/fields/CheckboxesField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CheckboxesField = __vue_normalize__$c(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    undefined,
    undefined
  );

//

var script$d = {
	name: 'FormTextareaField',

	mixins: [ FormField ],

	props: {
		readonly: {},
		disabled: {},
		placeholder: {},
		cols: {},
		rows: {},
		maxlength: {},
	},

	computed: {

		/**
		 * Get the input readonly state.
		 */
		inputReadonly() {
			return this.readonly || this.field.readonly
		},

		/**
		 * Get the input disabled state.
		 */
		inputDisabled() {
			return this.disabled || this.field.disabled
		},

		/**
		 * Get the input placeholder.
		 */
		inputPlaceholder() {
			return this.placeholder || this.field.placeholder
		},

		/**
		 * Get the textarea cols.
		 */
		inputCols() {
			return this.cols || this.field.rows
		},

		/**
		 * Get the textarea rows.
		 */
		inputRows() {
			return this.rows || this.field.rows
		},

		/**
		 * Get the textarea maxlength.
		 */
		inputMaxlength() {
			return this.maxlength || this.field.maxlength
		},
	},
};

/* script */
            const __vue_script__$d = script$d;
            
/* template */
var __vue_render__$d = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.layoutComponent,
    { tag: "component", attrs: { field: _vm.field, errors: _vm.errors } },
    [
      _c("template", { slot: "field" }, [
        _c("textarea", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.fieldValue,
              expression: "fieldValue"
            }
          ],
          staticClass: "form-control",
          class: _vm.errorClasses,
          attrs: {
            id: _vm.field.attribute,
            dusk: _vm.field.attribute,
            cols: _vm.inputCols,
            rows: _vm.inputRows,
            maxlength: _vm.inputMaxlength,
            placeholder: _vm.inputPlaceholder,
            readonly: _vm.inputReadonly,
            disabled: _vm.inputDisabled
          },
          domProps: { value: _vm.fieldValue },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.fieldValue = $event.target.value;
            }
          }
        })
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$d = [];
__vue_render__$d._withStripped = true;

  /* style */
  const __vue_inject_styles__$d = undefined;
  /* scoped */
  const __vue_scope_id__$d = undefined;
  /* module identifier */
  const __vue_module_identifier__$d = undefined;
  /* functional template */
  const __vue_is_functional_template__$d = false;
  /* component normalizer */
  function __vue_normalize__$d(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/fields/TextareaField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var TextareaField = __vue_normalize__$d(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    undefined,
    undefined
  );



var components = /*#__PURE__*/Object.freeze({
Field: Field,
Fields: Fields,
EmptyLayout: EmptyLayout,
VerticalLayout: VericalLayout,
HorizontalLayout: HorizontalLayout,
InlineLayout: InlineLayout,
FormUndefined: Undefined,
FormTextField: TextField,
FormFileField: FileField,
FormSelectField: SelectField,
FormRadiosField: RadiosField,
FormCheckboxField: CheckboxField,
FormCheckboxesField: CheckboxesField,
FormTextareaField: TextareaField
});

var plugin = {
	install (Vue$$1, options) {
		assign(config, options);

		Object.keys(components).forEach(function (name) {
			Vue$$1.component(name, components[name]);
		});
	}
};

export { plugin as BasePlugin, HandlesValidationErrors, FieldLayoutMixin, FormField, FormComponent, Field, Fields, EmptyLayout, VericalLayout as VerticalLayout, HorizontalLayout, InlineLayout, Undefined as FormUndefined, TextField as FormTextField, FileField as FormFileField, SelectField as FormSelectField, RadiosField as FormRadiosField, CheckboxField as FormCheckboxField, CheckboxesField as FormCheckboxesField, TextareaField as FormTextareaField, setProp, getProp };
//# sourceMappingURL=base.esm.js.map
