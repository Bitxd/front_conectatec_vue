// utils/v-click-outside.js
export default {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function(event) {
      // Si el clic no fue dentro de 'el', llama a la función
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  },
};
