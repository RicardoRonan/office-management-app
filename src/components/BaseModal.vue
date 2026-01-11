<template>
  <transition name="modal-overlay">
    <div v-if="show" class="modal-overlay" @click.self="close">
      <div class="modal">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
  emits: ["close"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
}

.modal {
  background: var(--bg-color);
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  width: 21.563rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Modal Overlay Transitions */
.modal-overlay-enter-active {
  transition: opacity 0.2s ease-out;
}

.modal-overlay-leave-active {
  transition: opacity 0.15s ease-in;
}

.modal-overlay-enter-from,
.modal-overlay-leave-to {
  opacity: 0;
}

/* Modal Content Animations (child of overlay) */
.modal-overlay-enter-active .modal {
  animation: modalSlideIn 0.25s ease-out;
}

.modal-overlay-leave-active .modal {
  animation: modalSlideOut 0.15s ease-in;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes modalSlideOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .modal-overlay-enter-active,
  .modal-overlay-leave-active {
    transition: none;
  }
  .modal-overlay-enter-active .modal,
  .modal-overlay-leave-active .modal {
    animation: none;
  }
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
}
@media (min-width: 315px) and (max-width: 375px) {
  .modal {
  width: 16.563rem;
  }
}
</style>
