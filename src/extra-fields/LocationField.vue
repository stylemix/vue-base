<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <vue-google-autocomplete
        v-if="googleLoaded"
        :id="field.attribute + '-address'"
        :placeholder="field.placeholder"
        :types="geocodeTypes"
        ref="address"
        classname="form-control"
        @placechanged="setAddressData"
        @keypress.enter.prevent />
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
  import FieldMixin from '../mixins/FieldMixin';
  import defaults from 'lodash-es/defaults';
  import config from './config';

  export default {
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
          country: null,
          region: null,
          city: null,
          zip: null,
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
          mapsScript.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${config.googleKey}&libraries=places`);
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
        this.$set(this.fieldValue, 'country', null);
        this.$set(this.fieldValue, 'region', null);
        this.$set(this.fieldValue, 'city', null);
        this.$set(this.fieldValue, 'zip', null);

        if (placeResultData.address_components) {
          placeResultData.address_components.forEach(component => {
            if (component.types.indexOf('country') !== -1) {
              this.$set(this.fieldValue, 'country', component.short_name)
            }
            if (component.types.indexOf('administrative_area_level_1') !== -1) {
              this.$set(this.fieldValue, 'region', component.short_name)
            }
            if (component.types.indexOf('locality') !== -1) {
              this.$set(this.fieldValue, 'city', component.short_name)
            }
            if (component.types.indexOf('postal_code') !== -1) {
              this.$set(this.fieldValue, 'zip', component.short_name)
            }
          })
        }
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
</script>
