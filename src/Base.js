import Vue from 'vue'

export default class Base {
    constructor(config) {
        this.bus = new Vue();
        this.bootingCallbacks = [];
        this.config = config;
    }

    /**
     * Register a callback to be called before Nova starts. This is used to bootstrap
     * addons, tools, custom fields, or anything else Nova needs
     */
    booting(callback) {
        this.bootingCallbacks.push(callback)
    }

    /**
     * Execute all of the booting callbacks.
     */
    boot() {
        //this.bootingCallbacks.forEach(callback => callback(Vue, router))

        this.bootingCallbacks = []
    }

    /**
     * Register a listener on Nova's built-in event bus
     */
    $on(...args) {
        this.bus.$on(...args)
    }

    /**
     * Register a one-time listener on the event bus
     */
    $once(...args) {
        this.bus.$once(...args)
    }

    /**
     * De-register a listener on the event bus
     */
    $off(...args) {
        this.bus.$off(...args)
    }

    /**
     * Emit an event on the event bus
     */
    $emit(...args) {
        this.bus.$emit(...args)
    }
}
