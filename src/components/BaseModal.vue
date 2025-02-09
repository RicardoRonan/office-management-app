<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
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
  height: 100vh;
  background: rgba(0, 0, 0, 0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
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
