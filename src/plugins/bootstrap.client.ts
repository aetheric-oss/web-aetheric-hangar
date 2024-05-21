import { Modal, Collapse, Offcanvas, Dropdown, Alert } from "bootstrap";

export default defineNuxtPlugin(() => ({
  provide: {
    bootstrap: {
      Modal,
      Collapse,
      Offcanvas,
      Dropdown,
      Alert
    },
  },
}));
