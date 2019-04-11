import forOwn from "lodash-es/forOwn";

/**
 * Append given data to formData object with given base name
 *
 * @param {FormData} formData
 * @param value
 * @param {String} name
 */
export function appendFormData(formData, value, name) {
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
      appendFormData(formData, value, `${name}[${key}]`)
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
export function formDataName(field) {
  let name = field.attribute;

  if (field.attribute.indexOf('.') !== -1) {
    name = field
      .attribute.replace(/\./, '[')
      .replace('.', '][') + ']'
  }

  return name;
}
