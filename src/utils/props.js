import Vue from 'vue';

export function setProp(obj, props, value) {
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

export function getProp(obj, props) {
	if (typeof props === "string") {
		props = props.split('.');
	}

	const prop = props.shift();

	if (!obj[prop] || !props.length) {
		return obj[prop];
	}

	return getProp(obj[prop], props);
}
