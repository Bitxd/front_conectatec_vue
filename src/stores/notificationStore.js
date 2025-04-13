import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    show: false,
    message: '',
    type: 'info' 
  }),
  actions: {
    showNotification(message, type = 'info', duration = 5000) {
      this.message = message;
      this.type = type;
      this.show = true;

      if (duration > 0) {
        setTimeout(() => this.hideNotification(), duration);
      }
    },
    hideNotification() {
      this.show = false;
    }
  }
});