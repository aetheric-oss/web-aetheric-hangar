import { Modal, Collapse, Offcanvas, Dropdown } from "bootstrap";

export default defineNuxtPlugin(() => ({
  provide: {
    bootstrap: {
      Modal,
      Collapse,
      Offcanvas,
      Dropdown
    },
  },
}));
