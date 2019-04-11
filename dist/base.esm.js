/* stylemix-base v1.4.0 (c) Azamat X <azamat@stylemix.net> - UNLICENSED */
import Vue from 'vue';
import forOwn from 'lodash-es/forOwn';
import cloneDeep from 'lodash-es/cloneDeep';
import keyBy from 'lodash-es/keyBy';
import mapValues from 'lodash-es/mapValues';
import isEqual from 'lodash-es/isEqual';
import has from 'lodash-es/has';
import pick from 'lodash-es/pick';
import values from 'lodash-es/values';
import omit from 'lodash-es/omit';
import filter from 'lodash-es/filter';
import find from 'lodash-es/find';
import isArray from 'lodash-es/isArray';
import { quillEditor } from 'vue-quill-editor';
import assign from 'lodash-es/assign';
import loadImage from 'blueimp-load-image';
import draggable from 'vuedraggable';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import defaults from 'lodash-es/defaults';
import map from 'lodash-es/map';
import debounce from 'lodash-es/debounce';
import castArray from 'lodash-es/castArray';
import head from 'lodash-es/head';
import uniqBy from 'lodash-es/uniqBy';
import vSelect from 'vue-select';

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

/**
 * Append given data to formData object with given base name
 *
 * @param {FormData} formData
 * @param value
 * @param {String} name
 */
function appendFormData(formData, value, name) {
  if (value === null || value === undefined) {
    value = '';
  } else if (value === true) {
    value = 1;
  } else if (value === false) {
    value = 0;
  } else if (typeof value === 'object' && !(value instanceof File)) {
    if (value instanceof Array && value.length === 0) {
      formData.append(name, '');
      return;
    }

    forOwn(value, (value, key) => {
      appendFormData(formData, value, `${name}[${key}]`);
    });

    return;
  }

  formData.append(name, value);
}

/**
 * Resolves field attribute name to form data name
 *
 * @param {Object} field
 * @returns {String}
 */
function formDataName(field) {
  let name = field.attribute;

  if (field.attribute.indexOf('.') !== -1) {
    name = field
      .attribute.replace(/\./, '[')
      .replace('.', '][') + ']';
  }

  return name;
}

/**
 * @property {String} attribute
 * @property {String} component
 * @property {Boolean} multiple
 * @property {*} initialValue
 * @property {Array} depends
 * @property {Array} dependentFields
 */
class Field {

  /**
   * Construct the Field instance
   *
   * @param {Object} field
   */
  constructor(field) {
    Object.assign(this, field);
  }

  /**
   * Sets model value to initial value
   *
   * @param {Object} model
   */
  applyInitialValue(model) {
    setProp(model, this.attribute, cloneDeep(this.initialValue) || (this.multiple ? [] : null));
  }

  /**
   * Appends model value to FormValue
   *
   * @param {FormData} formData
   * @param {Object} model
   */
  appendFormData(formData, model) {
    appendFormData(formData, getProp(model, this.attribute), formDataName(this));
  }
}

//

var script = {
  name: "Field",

  props: {
    field: {
      type: Field,
      default: function () {
        return new Field({
          component: 'undefined'
        })
      }
    },
    model: Object,
    errors: {},
    eventBus: {type: Object},
    layout: {}
  },

  computed: {
    $events() {
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
  

  
  var Field$1 = __vue_normalize__(
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
    eventBus: {type: Object},
    layout: String
  },

  computed: {
    $events() {
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
  mixins: [FieldLayoutMixin]
};

/* script */
            const __vue_script__$2 = script$2;
            
/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.layoutClass, attrs: { attribute: _vm.field.attribute } },
    [_vm._t("field")],
    2
  )
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
//
//
//

var script$3 = {
	name: 'FormAsterisk'
};

/* script */
            const __vue_script__$3 = script$3;
            
/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("sup", { staticClass: "label-asterisk text-danger" }, [_vm._v("*")])
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-628c137e_0", { source: "\n.label-asterisk[data-v-628c137e] {\n\ttop: -.1em;\n\tfont-size: 1em;\n}\n", map: {"version":3,"sources":["/Users/azamatx/projects/base-js/package/src/common/Asterisk.vue"],"names":[],"mappings":";AAWA;CACA,WAAA;CACA,eAAA;CACA","file":"Asterisk.vue","sourcesContent":["<template>\n\t<sup class=\"label-asterisk text-danger\">*</sup>\n</template>\n\n<script>\n\texport default {\n\t\tname: 'FormAsterisk'\n\t}\n</script>\n\n<style type=\"text/scss\" scoped>\n\t.label-asterisk {\n\t\ttop: -.1em;\n\t\tfont-size: 1em;\n\t}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-628c137e";
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
    component.__file = "/Users/azamatx/projects/base-js/package/src/common/Asterisk.vue";

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
    const head$$1 = document.head || document.getElementsByTagName('head')[0];
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

          head$$1.appendChild(el);
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
  

  
  var Asterisk = __vue_normalize__$3(
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
  return _c(
    "div",
    {
      staticClass: "form-group",
      class: _vm.errorClasses,
      attrs: { attribute: _vm.field.attribute }
    },
    [
      _vm.showLabel
        ? _c(
            "label",
            { attrs: { for: _vm.field.attribute } },
            [
              _vm._v(
                "\n\t\t\t" +
                  _vm._s(_vm.fieldLabel || _vm.field.label) +
                  "\n\t\t\t"
              ),
              _vm.field.required ? _c("form-asterisk") : _vm._e()
            ],
            1
          )
        : _c(
            "label",
            {
              staticClass: "placeholder-label",
              attrs: { for: _vm.field.attribute }
            },
            [_vm._v("\n\t\t\t \n\t\t")]
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
            _vm._v("\n\t\t\t" + _vm._s(_vm.field.helpText) + "\n\t\t")
          ])
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-dee2f926_0", { source: "\n.placeholder-label[data-v-dee2f926] {\n\tdisplay: none;\n}\n.col .placeholder-label[data-v-dee2f926] {\n\tdisplay: block;\n}\n[class*=\" col-\"] .placeholder-label[data-v-dee2f926] {\n\tdisplay: block;\n}\n", map: {"version":3,"sources":["/Users/azamatx/projects/base-js/package/src/layouts/VericalLayout.vue"],"names":[],"mappings":";AAoCA;CACA,cAAA;CACA;AAEA;CACA,eAAA;CACA;AACA;CACA,eAAA;CACA","file":"VericalLayout.vue","sourcesContent":["<template>\n\t<div class=\"form-group\"\n         :attribute=\"field.attribute\"\n         :class=\"errorClasses\">\n\t\t<label v-if=\"showLabel\"\n\t\t\t   :for=\"field.attribute\">\n\t\t\t{{ fieldLabel || field.label }}\n\t\t\t<form-asterisk v-if=\"field.required\" />\n\t\t</label>\n\t\t<label v-else class=\"placeholder-label\"\n\t\t\t   :for=\"field.attribute\">\n\t\t\t&nbsp;\n\t\t</label>\n\t\t<slot name=\"field\"/>\n\t\t<slot name=\"errors\">\n\t\t\t<div v-if=\"hasError\"\n\t\t\t\t v-html=\"errorMessages\"\n\t\t\t\t class=\"invalid-feedback d-block\">\n\t\t\t</div>\n\t\t</slot>\n\t\t<small v-if=\"showHelpText && field.helpText\"\n\t\t\t   class=\"form-text text-muted\">\n\t\t\t{{ field.helpText }}\n\t\t</small>\n\t</div>\n</template>\n\n<script>\n\timport FieldLayoutMixin from \"../mixins/FieldLayoutMixin\";\n\n\texport default {\n\t\tmixins: [ FieldLayoutMixin ]\n\t}\n</script>\n\n<style type=\"text/scss\" scoped>\n\t.placeholder-label {\n\t\tdisplay: none;\n\t}\n\n\t.col .placeholder-label {\n\t\tdisplay: block;\n\t}\n\t[class*=\" col-\"] .placeholder-label {\n\t\tdisplay: block;\n\t}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = "data-v-dee2f926";
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
  function __vue_create_injector__$1() {
    const head$$1 = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
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

          head$$1.appendChild(el);
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
  

  
  var VericalLayout = __vue_normalize__$4(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    __vue_create_injector__$1,
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
    {
      staticClass: "form-group row",
      class: _vm.errorClasses,
      attrs: { attribute: _vm.field.attribute }
    },
    [
      _vm.showLabel
        ? _c(
            "label",
            {
              staticClass: "col-sm-4 col-form-label text-sm-right",
              attrs: { for: _vm.field.attribute }
            },
            [
              _vm._v(
                "\n\t\t\t" +
                  _vm._s(_vm.fieldLabel || _vm.field.label) +
                  "\n\t\t\t"
              ),
              _vm.field.required ? _c("form-asterisk") : _vm._e()
            ],
            1
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
                _vm._v("\n\t\t\t\t" + _vm._s(_vm.field.helpText) + "\n\t\t\t")
              ])
            : _vm._e()
        ],
        2
      )
    ]
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
  

  
  var HorizontalLayout = __vue_normalize__$5(
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

var script$6 = {
	mixins: [ FieldLayoutMixin ]
};

/* script */
            const __vue_script__$6 = script$6;
            
/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "d-inline-block mb-2 mr-sm-2",
      class: _vm.errorClasses,
      attrs: { attribute: _vm.field.attribute }
    },
    [
      _c(
        "label",
        { staticClass: "sr-only", attrs: { for: _vm.field.attribute } },
        [
          _vm._v(
            "\n\t\t\t" + _vm._s(_vm.field.label || _vm.fieldLabel) + "\n\t\t\t"
          ),
          _vm.field.required ? _c("form-asterisk") : _vm._e()
        ],
        1
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
            _vm._v("\n\t\t\t" + _vm._s(_vm.field.helpText) + "\n\t\t")
          ])
        : _vm._e()
    ],
    2
  )
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
  

  
  var InlineLayout = __vue_normalize__$6(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    undefined
  );

//
//
//
//

var script$7 = {
	name: 'FormUndefinedField'
};

/* script */
            const __vue_script__$7 = script$7;
            
/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div")
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
  

  
  var Undefined = __vue_normalize__$7(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

var FieldMixin = {
  mixins: [HandlesValidationErrors],

  props: {
    field: {type: Field, required: true},
    model: {type: Object},
    eventBus: {type: Object},
    layout: {type: String},
    layoutClass: {type: String},
  },

  data: () => ({
    errorClass: 'is-invalid',
    eventBusListeners: [],
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
    $events() {
      return this.eventBus || this.$root;
    }
  },

  created() {
    if (this.model && !has(this.model, this.field.attribute)) {
      this.field.applyInitialValue(this.model);
    }

    // Register a global event for setting the field's value
    this.listenEventBus('field-value-' + this.field.attribute, this.fill);

    if (this.field.depends && this.field.depends.length) {
      this.field.depends.forEach(attr => {
        this.listenEventBus('field-change-' + attr, value => {
          this.triggerDependentChange(attr, value);
        });
      });

      this.triggerDependentChange();
    }
  },

  destroyed() {
    this.unlistenEventBus();
  },

  methods: {

    /**
     * Perform some sanitize actions when filling the value
     *
     * @param {*} value
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
      let valueSet = this.sanitizeValue(value);

      if (isEqual(valueSet, this.value())) {
        return;
      }

      if (this.model) {
        setProp(this.model, this.field.attribute, valueSet);
      }

      this.triggerChange();
    },

    /**
     * Get field's value
     * @returns {*}
     */
    value() {
      return this.model ? getProp(this.model, this.field.attribute) : (this.field.multiple ? [] : null);
    },

    triggerChange() {
      this.$events.$emit('field-change', this.value(), this.field.attribute);
      this.$events.$emit('field-change-' + this.field.attribute, this.value());
    },

    triggerDependentChange(attribute, value) {
      let values$$1 = mapValues(keyBy(this.field.dependentFields, 'attribute'), (field) => {
        return getProp(this.model, field.attribute);
      });
      this.handleDependentChange(attribute, value, values$$1);
    },

    handleDependentChange(attribute, value, values$$1) {
      // console.log(this.field.attribute + ':handleDependentChange', arguments)
    },

    listenEventBus(event, callback) {
      this.$events.$on(event, callback);
      this.eventBusListeners.push({ event, callback });
    },

    unlistenEventBus() {
      this.eventBusListeners.forEach(({ event, callback}) => {
        this.$events.$off(event, callback);
      });
    }
  },
};

class FieldList {

  constructor(fields) {
    this.list = [];
    this.byAttribute = {};

    // Collect Field instances
    fields.forEach(fieldConfig => {
      let field = new Field(fieldConfig);
      this.list.push(field);
      this.byAttribute[field.attribute] = field;
    });

    // Collect dependencies and assign
    this.list.forEach(field => {
      if (!field.depends) {
        return;
      }

      field.dependentFields = this.only(...field.depends);
    });
  }

  /**
   * Get all fields
   *
   * @returns {Field[]}
   */
  all() {
    return this.list
  }

  /**
   * @returns {Field}
   */
  get(attribute) {
    return this.byAttribute[attribute];
  }

  /**
   * @returns {Field}
   */
  find(predicate) {
    return find(this.list, predicate);
  }

  /**
   * @returns {Field[]}
   */
  only(...attributes) {
    return values(pick(this.byAttribute, attributes))
  }

  /**
   * @returns {Field[]}
   */
  except(...attributes) {
    return values(omit(this.byAttribute, attributes))
  }

  /**
   * @returns {Field[]}
   */
  filter(predicate) {
    return filter(this.list, predicate)
  }

}

var FormMixin = {
  data() {
    return {
      fields: new FieldList([]),
      errors: new Errors()
    }
  },

  methods: {

    /**
     * Set new field list.
     * Implemented form components should use this function when setting up fields.
     *
     * @param {Array} fields
     */
    setFields(fields) {
      this.fields = new FieldList(fields);
    },

    /**
     * Create FormData object for the model data.
     * Used when data going to be sent as multipart/form-data
     *
     * @param {Object} model Source model
     * @param {Array|null} only (Optional) List of fields to use instead of main fields
     * @returns {FormData}
     */
    formData(model, only = null) {
      let formData = new FormData();
      let fields = only || this.fields.all();

      fields.forEach(field => {
        field.appendFormData(formData, model);
      });

      return formData;
    },

    /**
     * Set new validation errors.
     * Usually used when setting up error messages came from server.
     *
     * @param errors
     */
    setValidationErrors(errors) {
      this.errors = new Errors(errors);
    },

    /**
     * Reset field values for model. Sets initial field value.
     *
     * @param {Object} model
     */
    resetModel(model) {
      this.fields.all().forEach(field => {
        field.applyInitialValue(model);
      });
    }
  }
};

//

var script$8 = {
	name: 'FormTextField',

	mixins: [ FieldMixin ],

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
  

  
  var TextField = __vue_normalize__$8(
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
	name: 'FormTextField',

	mixins: [ FieldMixin ],

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
  

  
  var FileField = __vue_normalize__$9(
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
	mixins: [ FieldMixin ],

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
            const __vue_script__$a = script$a;
            
/* template */
var __vue_render__$a = function() {
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
  

  
  var SelectField = __vue_normalize__$a(
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
	name: 'RadiosField',

	mixins: [ FieldMixin ],

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
  

  
  var RadiosField = __vue_normalize__$b(
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
	name: 'CheckboxField',

	mixins: [ FieldMixin ],

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
  

  
  var CheckboxField = __vue_normalize__$c(
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
  name: 'CheckboxesField',

  mixins: [FieldMixin],

  props: {
    checkboxLayout: {type: String}
  },

  computed: {
    checkboxLayoutClass() {
      let layout = this.checkboxLayout || this.field.checkboxLayout;
      return `form-check-${layout}`;
    }
  },

  created() {
    if (!isArray(this.field.initialValue)) {
      this.field.initialValue = [];
    }

    if (!isArray(this.value())) {
      this.fill([]);
    }
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
                [_vm._v("\n        " + _vm._s(option.label) + "\n      ")]
              )
            ]
          )
        })
      )
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
  

  
  var CheckboxesField = __vue_normalize__$d(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    undefined,
    undefined
  );

//

var script$e = {
	name: 'FormTextareaField',

	mixins: [ FieldMixin ],

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
			return this.cols || this.field.cols
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
            const __vue_script__$e = script$e;
            
/* template */
var __vue_render__$e = function() {
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
var __vue_staticRenderFns__$e = [];
__vue_render__$e._withStripped = true;

  /* style */
  const __vue_inject_styles__$e = undefined;
  /* scoped */
  const __vue_scope_id__$e = undefined;
  /* module identifier */
  const __vue_module_identifier__$e = undefined;
  /* functional template */
  const __vue_is_functional_template__$e = false;
  /* component normalizer */
  function __vue_normalize__$e(
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
  

  
  var TextareaField = __vue_normalize__$e(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    undefined,
    undefined
  );

//

var script$f = {
  name: 'FormEditorField',

  components: {
    Editor: quillEditor,
  },

  mixins: [FieldMixin],

  data() {
    return {
    };
  },

  computed: {
    options() {
      let options = {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
          ],
        },
      };

      assign(options, this.field.options);
      assign(options.modules, this.field.modules);

      return options;
    }
  }
};

/* script */
            const __vue_script__$f = script$f;
            
/* template */
var __vue_render__$f = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.layoutComponent,
    { tag: "component", attrs: { field: _vm.field, errors: _vm.errors } },
    [
      _c(
        "template",
        { slot: "field" },
        [
          _c("editor", {
            staticClass: "editor-field",
            attrs: { options: _vm.options },
            model: {
              value: _vm.fieldValue,
              callback: function($$v) {
                _vm.fieldValue = $$v;
              },
              expression: "fieldValue"
            }
          })
        ],
        1
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$f = [];
__vue_render__$f._withStripped = true;

  /* style */
  const __vue_inject_styles__$f = function (inject) {
    if (!inject) return
    inject("data-v-7353c2a3_0", { source: "\n.editor-field[data-v-7353c2a3] .ql-editor {\n  height: 140px;\n}\n", map: {"version":3,"sources":["/Users/azamatx/projects/base-js/package/src/fields/EditorField.vue"],"names":[],"mappings":";AA6DA;EACA,cAAA;CACA","file":"EditorField.vue","sourcesContent":["<template>\n  <component\n    :is=\"layoutComponent\"\n    :field=\"field\"\n    :errors=\"errors\">\n    <template slot=\"field\">\n      <editor\n        v-model=\"fieldValue\"\n        :options=\"options\"\n        class=\"editor-field\" />\n    </template>\n  </component>\n</template>\n\n<script>\nimport { quillEditor } from 'vue-quill-editor';\nimport assign from 'lodash-es/assign';\nimport FieldMixin from '../mixins/FieldMixin';\n\nexport default {\n  name: 'FormEditorField',\n\n  components: {\n    Editor: quillEditor,\n  },\n\n  mixins: [FieldMixin],\n\n  data() {\n    return {\n    };\n  },\n\n  computed: {\n    options() {\n      let options = {\n        modules: {\n          toolbar: [\n            ['bold', 'italic', 'underline', 'strike'], // toggled buttons\n            ['blockquote', 'code-block'],\n            [{ list: 'ordered' }, { list: 'bullet' }],\n            ['link', 'image'],\n            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown\n            [{ header: [1, 2, 3, 4, 5, 6, false] }],\n            [{ font: [] }],\n            [{ align: [] }],\n            ['clean'],\n          ],\n        },\n      };\n\n      assign(options, this.field.options);\n      assign(options.modules, this.field.modules);\n\n      return options;\n    }\n  }\n};\n</script>\n\n<style scoped>\n  .editor-field >>> .ql-editor {\n    height: 140px;\n  }\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$f = "data-v-7353c2a3";
  /* module identifier */
  const __vue_module_identifier__$f = undefined;
  /* functional template */
  const __vue_is_functional_template__$f = false;
  /* component normalizer */
  function __vue_normalize__$f(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/fields/EditorField.vue";

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
  function __vue_create_injector__$2() {
    const head$$1 = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
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

          head$$1.appendChild(el);
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
  

  
  var EditorField = __vue_normalize__$f(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    __vue_create_injector__$2,
    undefined
  );



var components = /*#__PURE__*/Object.freeze({
Field: Field$1,
Fields: Fields,
EmptyLayout: EmptyLayout,
FormAsterisk: Asterisk,
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
FormTextareaField: TextareaField,
FormEditorField: EditorField
});

var plugin = {
	install (Vue$$1, options) {
		assign(config, options);

		Object.keys(components).forEach(function (name) {
			Vue$$1.component(name, components[name]);
		});
	}
};

let config$1 = {
  previewMaxWidth: 200,
  previewMaxHeight: 200,
  previewMinWidth: null,
  previewMinHeight: null,
  previewCrop: false,
  googleKey: null,
};

//

var script$g = {
  name: 'AttachmentPreview',

  props: {
    attachment: { type: Object, required: true },
    options: { type: Object },
  },

  data: () => ({
    imagePreview: null
  }),

  mounted() {
    this.setImagePreview();
  },

  computed: {
    isImage() {
      return this.attachment.mime_type &&
        this.attachment.mime_type.match(/image/);
    },
    previewOptions() {
      return assign(pick(config$1, [
        'previewMaxWidth',
        'previewMaxHeight',
        'previewMinWidth',
        'previewMinHeight',
        'previewCrop',
      ]), this.options)
    }
  },

  methods: {
    setImagePreview() {
      if (!this.isImage) {
        return;
      }

      if (this.attachment.file instanceof File) {
        loadImage(
          this.attachment.file,
          (canvas) => {
            this.imagePreview = canvas.toDataURL();
          },
          {
            canvas: true,
            maxWidth: this.previewOptions.previewMaxWidth,
            maxHeight: this.previewOptions.previewMaxHeight,
            minWidth: this.previewOptions.previewMinWidth,
            minHeight: this.previewOptions.previewMinHeight,
            crop: this.previewOptions.previewCrop,
          }
        );
      } else {
        this.imagePreview = this.attachment.url;
      }
    }
  },

  watch: {
    'attachment': function () {
      this.setImagePreview();
    }
  },
};

/* script */
            const __vue_script__$g = script$g;
            
/* template */
var __vue_render__$g = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "field-attachment-preview",
      class: { "field-attachment-preview-image": _vm.isImage },
      style: { "max-width": _vm.previewOptions.previewMaxWidth + "px" }
    },
    [
      _vm.isImage
        ? _c("img", {
            staticClass: "img-fluid mb-1",
            attrs: { src: _vm.imagePreview }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.attachment.url
        ? _c(
            "a",
            {
              staticClass: "d-block",
              attrs: { href: _vm.attachment.url, target: "_blank" }
            },
            [_vm._v("\n    " + _vm._s(_vm.attachment.filename) + "\n  ")]
          )
        : _c("div", [
            _vm._v("\n    " + _vm._s(_vm.attachment.filename) + "\n  ")
          ])
    ]
  )
};
var __vue_staticRenderFns__$g = [];
__vue_render__$g._withStripped = true;

  /* style */
  const __vue_inject_styles__$g = undefined;
  /* scoped */
  const __vue_scope_id__$g = undefined;
  /* module identifier */
  const __vue_module_identifier__$g = undefined;
  /* functional template */
  const __vue_is_functional_template__$g = false;
  /* component normalizer */
  function __vue_normalize__$g(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/extra-fields/AttachmentPreview.vue";

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
  

  
  var AttachmentPreview = __vue_normalize__$g(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    undefined,
    undefined
  );

//

  function fileToAttached(file) {
  return {
    id: Math.random(),
    file,
    filename: file.name,
    mime_type: file.type,
    size: file.size,
  };
}

var script$h = {
  components: {
    draggable,
    AttachmentPreview,
  },

  mixins: [FieldMixin],

  data() {
    return {
    };
  },

  computed: {
    hasAttached() {
      return this.field.multiple ?
        !! this.field.attached.length :
        !! this.field.attached;
    },
    draggableOptions() {
      const options = { direction: 'horizontal' };
      assign(options, this.field.draggableOptions);
      return options;
    },
    previewOptions() {
      return pick(this.field, [
        'previewMaxWidth',
        'previewMaxHeight',
        'previewMinWidth',
        'previewMinHeight',
        'previewCrop',
      ]);
    },
    sortables: {
      get() {
        return this.field.attached;
      },
      set(sorted) {
        this.field.attached = sorted;
        this.fieldValue = this.field.attached.map((attachment) => {
          return attachment.file ? attachment.file : attachment.id;
        });
      }
    },
  },

  created() {
    if (this.field.multiple) {
      // For correct reactivity and sorting
      if (!this.field.attached) {
        this.field.attached = [];
      }

      if (!this.fieldValue) {
        this.fieldValue = [];
      }
    }
  },

  methods: {
    remove(attachment) {
      if (this.field.multiple) {
        this.field.attached = this.field.attached.filter((a) => a.id !== attachment.id);
        this.fieldValue = this.fieldValue.filter((id) => {
          if (attachment.file) {
            return id !== attachment.file;
          }

          return id !== attachment.id
        });
      } else {
        this.field.attached = null;
        this.fieldValue = null;
      }
    },
    clear() {
      if (this.field.multiple) {
        this.field.attached = [];
        this.fieldValue = [];
      } else {
        this.field.attached = null;
        this.fieldValue = null;
      }
    },
    input($event) {
      const files = [];

      for (let i = 0; i < $event.target.files.length; i += 1) {
        files.push($event.target.files[i]);
      }

      this.field.attached = this.field.multiple ?
        this.field.attached.concat(files.map(fileToAttached)) :
        fileToAttached(files[0]);

      this.fieldValue = this.field.multiple ? this.fieldValue.concat(files) : files[0];

      this.$refs.input.value = '';
    },
  },
};

/* script */
            const __vue_script__$h = script$h;
            
/* template */
var __vue_render__$h = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.layoutComponent,
    { tag: "component", attrs: { field: _vm.field, errors: _vm.errors } },
    [
      _c("template", { slot: "field" }, [
        _c("div", { staticClass: "custom-file" }, [
          _c("input", {
            ref: "input",
            staticClass: "custom-file-input",
            class: _vm.errorClasses,
            attrs: {
              id: _vm.field.attribute,
              dusk: _vm.field.attribute,
              multiple: _vm.field.multiple || false,
              accept: _vm.field.mimeTypes,
              type: "file"
            },
            on: {
              input: function($event) {
                _vm.input($event);
              }
            }
          }),
          _vm._v(" "),
          _c(
            "label",
            {
              staticClass: "custom-file-label",
              attrs: { for: _vm.field.attribute }
            },
            [_vm._v(_vm._s(_vm.field.placeholder || "Click to select files"))]
          )
        ]),
        _vm._v(" "),
        _vm.hasAttached && _vm.field.multiple
          ? _c(
              "div",
              [
                _c(
                  "draggable",
                  {
                    staticClass: "field-attachments mt-4",
                    attrs: { options: _vm.draggableOptions },
                    model: {
                      value: _vm.sortables,
                      callback: function($$v) {
                        _vm.sortables = $$v;
                      },
                      expression: "sortables"
                    }
                  },
                  _vm._l(_vm.field.attached, function(attachment) {
                    return _c(
                      "div",
                      {
                        key: attachment.id,
                        staticClass:
                          "field-attachment field-attachment-draggable bg-light rounded p-2"
                      },
                      [
                        _c("attachment-preview", {
                          attrs: {
                            attachment: attachment,
                            options: _vm.previewOptions
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass:
                              "close rounded btn-remove bg-secondary",
                            attrs: { type: "button" },
                            on: {
                              click: function($event) {
                                $event.preventDefault();
                                _vm.remove(attachment);
                              }
                            }
                          },
                          [
                            _c("span", { attrs: { "aria-hidden": "true" } }, [
                              _vm._v("×")
                            ])
                          ]
                        )
                      ],
                      1
                    )
                  })
                ),
                _vm._v(" "),
                _vm.hasAttached && _vm.field.multiple
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btn-sm btn-warning",
                        on: {
                          click: function($event) {
                            $event.stopPropagation();
                            $event.preventDefault();
                            _vm.clear();
                          }
                        }
                      },
                      [_vm._v("Clear all")]
                    )
                  : _vm._e()
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.hasAttached && !_vm.field.multiple
          ? _c("div", [
              _c("div", { staticClass: "field-attachments mt-4" }, [
                _c(
                  "div",
                  { staticClass: "field-attachment bg-light rounded p-2" },
                  [
                    _c("attachment-preview", {
                      attrs: {
                        attachment: _vm.field.attached,
                        options: _vm.previewOptions
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "close rounded btn-remove bg-secondary",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            $event.stopPropagation();
                            $event.preventDefault();
                            _vm.clear();
                          }
                        }
                      },
                      [
                        _c("span", { attrs: { "aria-hidden": "true" } }, [
                          _vm._v("×")
                        ])
                      ]
                    )
                  ],
                  1
                )
              ])
            ])
          : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$h = [];
__vue_render__$h._withStripped = true;

  /* style */
  const __vue_inject_styles__$h = function (inject) {
    if (!inject) return
    inject("data-v-102b0677_0", { source: "\n.field-attachments[data-v-102b0677] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n}\n.field-attachment[data-v-102b0677] {\n  position: relative;\n  margin-right: 1rem;\n  margin-bottom: 1rem;\n}\n.btn-remove[data-v-102b0677] {\n  position: absolute;\n  top: -.5rem;\n  right: -.5rem;\n  line-height: 100%;\n  height: 1.5rem;\n  width: 1.5rem;\n  opacity: 1;\n  color: white;\n}\n.field-attachment-preview[data-v-102b0677] {\n  font-size: 85%;\n}\n.field-attachment-draggable[data-v-102b0677] {\n  cursor: move;\n}\n\n/*# sourceMappingURL=FormAttachmentField.vue.map */", map: {"version":3,"sources":["/Users/azamatx/projects/base-js/package/src/extra-fields/FormAttachmentField.vue","FormAttachmentField.vue"],"names":[],"mappings":";AA6LA;EACA,cAAA;EACA,gBAAA;EACA,wBAAA;CACA;AAEA;EACA,mBAAA;EACA,mBAAA;EACA,oBAAA;CACA;AAEA;EACA,mBAAA;EACA,YAAA;EACA,cAAA;EACA,kBAAA;EACA,eAAA;EACA,cAAA;EACA,WAAA;EACA,aAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,aAAA;CACA;;AChMA,mDAAmD","file":"FormAttachmentField.vue","sourcesContent":[null,".field-attachments {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start; }\n\n.field-attachment {\n  position: relative;\n  margin-right: 1rem;\n  margin-bottom: 1rem; }\n\n.btn-remove {\n  position: absolute;\n  top: -.5rem;\n  right: -.5rem;\n  line-height: 100%;\n  height: 1.5rem;\n  width: 1.5rem;\n  opacity: 1;\n  color: white; }\n\n.field-attachment-preview {\n  font-size: 85%; }\n\n.field-attachment-draggable {\n  cursor: move; }\n\n/*# sourceMappingURL=FormAttachmentField.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$h = "data-v-102b0677";
  /* module identifier */
  const __vue_module_identifier__$h = undefined;
  /* functional template */
  const __vue_is_functional_template__$h = false;
  /* component normalizer */
  function __vue_normalize__$h(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/extra-fields/FormAttachmentField.vue";

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
  function __vue_create_injector__$3() {
    const head$$1 = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
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

          head$$1.appendChild(el);
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
  

  
  var FormAttachmentField = __vue_normalize__$h(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    __vue_create_injector__$3,
    undefined
  );

//

var script$i = {
  name: 'FormLocationField',

  mixins: [FieldMixin],

  components: {
    VueGoogleAutocomplete,
  },

  data: () => ({
    googleLoaded: false,
    map: null,
    marker: null,
    geocoder: null,
  }),

  computed: {
    geocodeTypes() {
      return this.field.types;
    }
  },

  created() {
    if (!this.field.initialValue) {
      this.field.initialValue = {
        address: null,
        latlng: null,
        zoom: null,
      };
    }

    if (!this.fieldValue) {
      this.field.applyInitialValue(this.model);
    }

    this.$watch('fieldValue.address', this.updateAddress);
    this.$watch('fieldValue.latlng', this.updateMarker);
    this.$watch('fieldValue.zoom', this.updateZoom);
  },

  mounted() {
    if (window.google === undefined) {
      this.loadGoogleMaps().then(() => {
        this.googleLoaded = true;
        this.$nextTick(this.initAutocomplete);
      });
    } else {
      this.googleLoaded = true;
      this.$nextTick(this.initAutocomplete);
    }
  },

  methods: {
    loadGoogleMaps() {
      return new Promise((resolve) => {
        let mapsScript = document.createElement('script');
        mapsScript.onload = resolve;
        mapsScript.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${config$1.googleKey}&libraries=places`);
        document.head.appendChild(mapsScript);
      });
    },
    initAutocomplete() {
      if (this.fieldValue && this.fieldValue.address) {
        this.updateAddress();
      }

      if (this.field.withMap) {
        this.initMap();
      }
    },
    updateAddress() {
      this.$refs.address.update(this.fieldValue.address);
    },
    initMap() {
      const options = defaults(this.field.withMap, {
        center: {lat: 41.299, lng: 69.24},
        zoom: 1
      });

      if (this.fieldValue && this.fieldValue.latlng) {
        const [lat, lng] = this.fieldValue.latlng.split(',').map(parseFloat);
        options.center = {lat, lng};
      }

      if (this.fieldValue && this.fieldValue.zoom) {
        options.zoom = this.fieldValue.zoom;
      }

      this.map = new google.maps.Map(this.$refs.map, options);

      this.marker = new google.maps.Marker({
        position: options.center,
        map: this.map,
        draggable: true,
      });

      this.geocoder = new google.maps.Geocoder;

      this.marker.addListener('dragend', () => {
        this.setAddressFromMarker();
      });

      this.map.addListener('zoom_changed', () => {
        this.setZoomFromMap();
      });
    },
    setAddressFromMarker() {
      let position = this.marker.getPosition();
      this.$set(this.fieldValue, 'latlng', [position.lat(), position.lng()].join(','));

      this.geocoder.geocode({'location': position}, (results, status) => {
        if (status === 'OK') {
          this.setAddressFromGeocode(results);
        } else {
          console.error('Geocoder failed due to: ' + status);
        }
      });
    },
    setAddressFromGeocode(results) {
      if (results[0]) {
        this.$set(this.fieldValue, 'address', results[0].formatted_address);
      }
    },
    setAddressData: function (addressData, placeResultData, id) {
      this.$set(this.fieldValue, 'latlng', addressData.latitude + ',' + addressData.longitude);
      this.$set(this.fieldValue, 'address', placeResultData.formatted_address);
    },
    updateMarker() {
      if (!this.marker || !this.fieldValue.latlng) {
        return;
      }

      let latlng = {
        lat: parseFloat(this.fieldValue.latlng.split(',')[0]),
        lng: parseFloat(this.fieldValue.latlng.split(',')[1]),
      };

      this.marker.setPosition(latlng);
      this.map.panTo(latlng);
      this.map.setZoom(this.fieldValue.zoom || 12);
    },
    updateZoom() {
      if (!this.map || !this.fieldValue.zoom) {
        return;
      }

      this.map.setZoom(this.fieldValue.zoom);
    },
    setMarkerFromResult(addressData) {
      let latlng = {
        lat: addressData.latitude,
        lng: addressData.longitude,
      };
      this.marker.setPosition(latlng);
      this.map.panTo(latlng);
      this.map.setZoom(this.fieldValue.zoom || 12);
    },
    setZoomFromMap() {
      this.$set(this.fieldValue, 'zoom', this.map.getZoom());
    },
  },
};

/* script */
            const __vue_script__$i = script$i;
            
/* template */
var __vue_render__$i = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.layoutComponent,
    { tag: "component", attrs: { field: _vm.field, errors: _vm.errors } },
    [
      _c(
        "template",
        { slot: "field" },
        [
          _vm.googleLoaded
            ? _c("vue-google-autocomplete", {
                ref: "address",
                attrs: {
                  id: _vm.field.attribute + "-address",
                  placeholder: _vm.field.placeholder,
                  types: _vm.geocodeTypes,
                  classname: "form-control"
                },
                on: {
                  placechanged: _vm.setAddressData,
                  keypress: function($event) {
                    if (
                      !("button" in $event) &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    $event.preventDefault();
                  }
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.field.withMap
            ? _c(
                "div",
                { staticClass: "mt-2 embed-responsive embed-responsive-16by9" },
                [
                  _c(
                    "div",
                    {
                      ref: "map",
                      staticClass: "embed-responsive-item rounded",
                      attrs: { id: _vm.field.attribute + "-map" }
                    },
                    [_vm._v("\n        Map is loading ...\n      ")]
                  )
                ]
              )
            : _vm._e()
        ],
        1
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$i = [];
__vue_render__$i._withStripped = true;

  /* style */
  const __vue_inject_styles__$i = undefined;
  /* scoped */
  const __vue_scope_id__$i = undefined;
  /* module identifier */
  const __vue_module_identifier__$i = undefined;
  /* functional template */
  const __vue_is_functional_template__$i = false;
  /* component normalizer */
  function __vue_normalize__$i(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/extra-fields/FormLocationField.vue";

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
  

  
  var FormLocationField = __vue_normalize__$i(
    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    undefined,
    undefined
  );

//

var script$j = {
  components: {
    vSelect,
  },

  mixins: [FieldMixin],

  data() {
    return {
      options: [],
      params: {},
      busy: false,
    };
  },

  computed: {
    selected: {
      get() {
        const selected = [];
        const values$$1 = this.fieldValue === null || this.fieldValue === undefined
          ? []
          : castArray(this.fieldValue);
        values$$1.forEach((value) => {
          selected.push(find(this.options, {value}) || this.getMissedOption(value));
        });

        if (this.field.multiple) {
          return uniqBy(selected, 'value');
        }

        return head(selected);
      },
      set(option) {
        if (this.field.multiple) {
          const values$$1 = map(option, 'value');
          if (!isEqual(values$$1, this.fieldValue)) {
            this.fieldValue = uniqBy(values$$1);
          }
          return;
        }
        this.fieldValue = option ? option.value : null;
      },
    },
    filterable() {
      return !this.field.ajax;
    }
  },

  created() {
    // Take initial options from field config
    // It could contain initially selected option
    this.options = this.field.options || [];
    this.params = defaults(this.field.source ? this.field.source.params : {}, {
      per_page: 9,
    });

    this.fetch = debounce(() => {
      this.loading(true);

      const promise = this.$http({
        url: this.field.source.url,
        params: this.params,
      });

      promise
        .then((response) => {
          this.setOptions(response.data.data);
        })
        .finally(() => {
          this.loading(false);
        });

      return promise;
    }, 300);
  },

  mounted() {
    if (this.field.preload) {
      this.fetch();
    }
  },

  methods: {
    loading(value = true) {
      this.$refs.select.toggleLoading(value);
    },
    onSearch(search) {
      if (!this.field.ajax) {
        return;
      }
      this.params[this.field.queryParam || 'query'] = search;
      this.fetch();
    },
    getMissedOption(value) {
      return {
        value,
        label: this.$refs.select && this.$refs.select.mutableLoading ? '...' : value,
      };
    },
    setOptions(options) {
      let preserveOptions = castArray(this.selected);
      this.options = uniqBy(preserveOptions.concat(options), 'value');
    }
  },
};

/* script */
            const __vue_script__$j = script$j;
            
/* template */
var __vue_render__$j = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.layoutComponent,
    { tag: "component", attrs: { field: _vm.field, errors: _vm.errors } },
    [
      _c(
        "template",
        { slot: "field" },
        [
          _c("v-select", {
            ref: "select",
            staticClass: "form-control",
            class: _vm.errorClasses,
            attrs: {
              disabled: _vm.busy,
              id: _vm.field.attribute,
              options: _vm.options,
              filterable: _vm.filterable,
              placeholder: _vm.field.placeholder,
              multiple: _vm.field.multiple || false
            },
            on: { search: _vm.onSearch },
            scopedSlots: _vm._u([
              {
                key: "option",
                fn: function(option) {
                  return [
                    option.image
                      ? _c("img", {
                          staticClass: "float-left mr-2 rounded",
                          staticStyle: { width: "45px" },
                          attrs: { src: option.image }
                        })
                      : _vm._e(),
                    _vm._v(" "),
                    _c("div", [_vm._v(_vm._s(option.label))]),
                    _vm._v(" "),
                    option.extra
                      ? _c("div", { staticClass: "text-muted text-sm" }, [
                          _vm._v(
                            "\n          " + _vm._s(option.extra) + "\n        "
                          )
                        ])
                      : _vm._e()
                  ]
                }
              }
            ]),
            model: {
              value: _vm.selected,
              callback: function($$v) {
                _vm.selected = $$v;
              },
              expression: "selected"
            }
          })
        ],
        1
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$j = [];
__vue_render__$j._withStripped = true;

  /* style */
  const __vue_inject_styles__$j = function (inject) {
    if (!inject) return
    inject("data-v-b92b8b94_0", { source: "\n.form-control.v-select {\n  padding: 0 10px;\n  height: auto;\n  min-height: calc(2.25rem + 2px);\n}\n.form-control.v-select .dropdown-toggle {\n    border: none;\n    padding: 0;\n}\n.form-control.v-select .dropdown-toggle::after {\n      display: none;\n}\n.form-control.v-select .dropdown-toggle input[type=search] {\n      margin: 0;\n      height: auto;\n      min-height: calc(2.25rem + 2px);\n}\n.form-control.v-select .selected-tag {\n    margin-top: 3px;\n    margin-bottom: 5px;\n}\n.form-control.v-select .vs__selected-options {\n    margin-left: -9px;\n    padding: 0;\n}\n.form-control.v-select .vs__actions {\n    padding-right: 0;\n}\n\n/*# sourceMappingURL=FormRelationField.vue.map */", map: {"version":3,"sources":["/Users/azamatx/projects/base-js/package/src/extra-fields/FormRelationField.vue","FormRelationField.vue"],"names":[],"mappings":";AA8JA;EACA,gBAAA;EACA,aAAA;EACA,gCAAA;CA8BA;AAjCA;IAMA,aAAA;IACA,WAAA;CAWA;AAlBA;MAUA,cAAA;CACA;AAXA;MAcA,UAAA;MACA,aAAA;MACA,gCAAA;CACA;AAjBA;IAqBA,gBAAA;IACA,mBAAA;CACA;AAvBA;IA0BA,kBAAA;IACA,WAAA;CACA;AA5BA;IA+BA,iBAAA;CACA;;ACxKA,iDAAiD","file":"FormRelationField.vue","sourcesContent":[null,".form-control.v-select {\n  padding: 0 10px;\n  height: auto;\n  min-height: calc(2.25rem + 2px); }\n  .form-control.v-select .dropdown-toggle {\n    border: none;\n    padding: 0; }\n    .form-control.v-select .dropdown-toggle::after {\n      display: none; }\n    .form-control.v-select .dropdown-toggle input[type=search] {\n      margin: 0;\n      height: auto;\n      min-height: calc(2.25rem + 2px); }\n  .form-control.v-select .selected-tag {\n    margin-top: 3px;\n    margin-bottom: 5px; }\n  .form-control.v-select .vs__selected-options {\n    margin-left: -9px;\n    padding: 0; }\n  .form-control.v-select .vs__actions {\n    padding-right: 0; }\n\n/*# sourceMappingURL=FormRelationField.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$j = undefined;
  /* module identifier */
  const __vue_module_identifier__$j = undefined;
  /* functional template */
  const __vue_is_functional_template__$j = false;
  /* component normalizer */
  function __vue_normalize__$j(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/azamatx/projects/base-js/package/src/extra-fields/FormRelationField.vue";

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
  function __vue_create_injector__$4() {
    const head$$1 = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$4.styles || (__vue_create_injector__$4.styles = {});
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

          head$$1.appendChild(el);
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
  

  
  var FormRelationField = __vue_normalize__$j(
    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
    __vue_inject_styles__$j,
    __vue_script__$j,
    __vue_scope_id__$j,
    __vue_is_functional_template__$j,
    __vue_module_identifier__$j,
    __vue_create_injector__$4,
    undefined
  );



var components$1 = /*#__PURE__*/Object.freeze({
FormAttachmentField: FormAttachmentField,
FormLocationField: FormLocationField,
FormRelationField: FormRelationField
});

var ExtraPlugin = {
  install (Vue$$1, options) {
    assign(config$1, options);

    Object.keys(components$1).forEach(function (name) {
      Vue$$1.component(name, components$1[name]);
    });
  }
};

export { plugin as BasePlugin, ExtraPlugin, Field, FieldList, ExtraPlugin as ListingPlugin, HandlesValidationErrors, FieldLayoutMixin, FieldMixin, FormMixin, FieldMixin as FormField, FormMixin as FormComponent, Fields, EmptyLayout, Asterisk as FormAsterisk, VericalLayout as VerticalLayout, HorizontalLayout, InlineLayout, Undefined as FormUndefined, TextField as FormTextField, FileField as FormFileField, SelectField as FormSelectField, RadiosField as FormRadiosField, CheckboxField as FormCheckboxField, CheckboxesField as FormCheckboxesField, TextareaField as FormTextareaField, EditorField as FormEditorField, FormAttachmentField, FormLocationField, FormRelationField, setProp, getProp };
//# sourceMappingURL=base.esm.js.map
