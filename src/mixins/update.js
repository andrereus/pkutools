export default {
  data: () => ({
    refreshing: false,
    registration: null,
    updateExists: false
  }),
  created() {
    document.addEventListener("swUpdated", this.updateAvailable, { once: true });
    // Prevent multiple refreshes
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  methods: {
    // Store the SW registration so we can send it a message
    updateAvailable(event) {
      this.registration = event.detail;
      this.updateExists = true;
    },
    refreshApp() {
      this.updateExists = false;
      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return;
      // Send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  }
};
