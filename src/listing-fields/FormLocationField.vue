<template>
  <component
    :is="layoutComponent"
    :field="field"
    :errors="errors">
    <template slot="field">
      <vue-google-autocomplete
        v-if="googleLoaded"
        :id="field.attribute + '-address'"
        :placeholder="field.placeholder"
        :types="field.types || 'address'"
        ref="address"
        classname="form-control"
        v-on:placechanged="setAddressData"/>
      <div
        v-if="field.withMap"
        class="mt-2 embed-responsive embed-responsive-16by9">
        <div
          ref="map"
          :id="field.attribute + '-map'"
          class="embed-responsive-item rounded">
          Map is loading ...
        </div>
      </div>
    </template>
  </component>
</template>

<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete';
  import FormField from '../mixins/FormField';
  import defaults from 'lodash-es/defaults';
  import config from './config';

  export default {
    name: 'FormLocationField',

    mixins: [FormField],

    components: {
      VueGoogleAutocomplete,
    },

    data: () => ({
      googleLoaded: false,
      map: null,
      marker: null,
      geocoder: null,
    }),

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
      setInitialValue() {
        if (!this.fieldValue) {
          this.fieldValue = {};
        }
      },
      loadGoogleMaps() {
        return new Promise((resolve) => {
          let mapsScript = document.createElement('script');
          mapsScript.onload = resolve;
          mapsScript.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${config.googleKey}&libraries=places`);
          document.head.appendChild(mapsScript);
        });
      },
      initAutocomplete() {
        if (this.fieldValue && this.fieldValue.address) {
          this.$refs.address.update(this.fieldValue.address);
        }

        if (this.field.withMap) {
          this.initMap();
        }
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
          this.$refs.address.update(this.fieldValue.address);
        }
      },
      setAddressData: function (addressData, placeResultData, id) {
        this.$set(this.fieldValue, 'latlng', addressData.latitude + ',' + addressData.longitude);
        this.$set(this.fieldValue, 'address', placeResultData.formatted_address);
        if (this.marker) {
          this.setMarkerFromResult(addressData);
        }
      },
      setMarkerFromResult(addressData) {
        let latlng = {
          lat: addressData.latitude,
          lng: addressData.longitude,
        };
        this.marker.setPosition(latlng);
        this.map.panTo(latlng);
      },
    },
  };
</script>
