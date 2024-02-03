import { Modal, Collapse, Offcanvas } from "bootstrap";

export default defineNuxtPlugin(() => ({
  provide: {
    bootstrap: {
      Modal,
      Collapse,
      Offcanvas,
    },
  },
}));
