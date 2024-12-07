
<template>
    <div class="w-full max-w-4xl mx-auto">
      <div class="p-4 bg-white shadow-lg rounded-xl">
        <Transition name="fade">
            <div class="flex items-center justify-between mb-2" 
        v-if="!allowsLocation">
          <h2 class="text-2xl font-bold text-gray-900">Use Your Location?</h2>
          <label class="flex items-center cursor-pointer">
            <input type="checkbox"
              v-model="allowsLocation"
              @change="handleLocationToggle"
               class="toggle toggle-violet-600 checked:text-violet-600"
            />
          </label>
        </div>
        </Transition>
     
        <div id="map" class="overflow-hidden rounded-lg h-80"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  const props = defineProps({
    marker: {
      type: Array,
      required: false,
      default: () => [48.8566, 2.3522] // Default to Paris coordinates
    }
  });
  
  const emit = defineEmits(['setmarker']);
  
  const allowsLocation = ref(false);
  const selectedLocation = ref(null);
  const map = ref(null);
  const currentMarker = ref(null);
  
  onMounted(() => {
    initMap();
  });
  
  onUnmounted(() => {
    if (map.value) {
      map.value.remove();
    }
  });
  
  watch(() => props.marker, (newMarker) => {
    if (map.value && newMarker && newMarker.length === 2) {
      map.value.setView(newMarker, 13);
      updateMarker(newMarker[0], newMarker[1]);
    }
  }, { deep: true });
  
  function initMap() {
    const initialCoordinates = Array.isArray(props.marker) && props.marker.length === 2
      ? props.marker
      : [48.8566, 2.3522]; // Default to Paris if marker is invalid
  
    map.value = L.map('map').setView(initialCoordinates, 13);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value);
  
    map.value.on('click', handleMapClick);
    
    // Set initial marker if coordinates are provided
    if (initialCoordinates[0] && initialCoordinates[1]) {
      updateMarker(initialCoordinates[0], initialCoordinates[1]);
    }
  }
  
  function updateMarker(lat, lng) {
    if (currentMarker.value) {
      map.value.removeLayer(currentMarker.value);
    }
    currentMarker.value = L.marker([lat, lng]).addTo(map.value);
  }
  
  async function handleMapClick(e) {
    const { lat, lng } = e.latlng;
    updateMarker(lat, lng);
    await fetchLocationInfo(lat, lng);
  }
  
  async function fetchLocationInfo(lat, lng) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const data = await response.json();
  
      selectedLocation.value = {
        name: data.display_name || 'Unknown location',
        lat: lat.toFixed(6),
        lng: lng.toFixed(6)
      };
      emit('setmarker', selectedLocation.value);

    } catch (error) {
      console.error('Error fetching location data:', error);
      selectedLocation.value = {
        name: 'Unable to fetch location name',
        lat: lat.toFixed(6),
        lng: lng.toFixed(6)
      };
    }
  }
  
  function handleLocationToggle() {
    if (allowsLocation.value && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const { latitude, longitude } = position.coords;
          map.value.setView([latitude, longitude], 13);
          updateMarker(latitude, longitude);
          fetchLocationInfo(latitude, longitude);
        }, 
        function(error) {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please check your settings.');
          allowsLocation.value = false;
        }
      );
    }
  }
  </script>
  
  <style scoped>
  /* @import 'leaflet/dist/leaflet.css'; */
  </style>
  
  