<template>
  <ul class="pagination">
    <li
      v-for="index in total"
      :key="index"
      :class="{ 'is-active': index === current }"
      class="pagination__item"
    >
      <button
        class="js-button-standard js-pagination-link pagination__link"
        :data-page="index"
        data-cursorSize="small"
        @click="onClick(index)"
      >
        {{ index }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    total: Number,
    current: Number,
    onClick: Function,
  },
};
</script>

<style lang="postcss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2.5rem;
  font-size: var(--fsize-l);
  font-weight: 500;

  &__link {
    display: inline-block;
    width: 1.65em;
    padding: 1em 0;
    font-weight: 500;
    line-height: 1.6;
    color: var(--colour-primary);
    text-align: center;
    background-color: transparent;
    border: none;
    outline: none;
  }

  li {
    position: relative;

    &::before {
      position: absolute;
      right: 0;
      bottom: 0.925em;
      left: 0;
      width: 0;
      height: 2px;
      margin: auto;
      content: '';
      background-color: var(--colour-primary);
    }
  }

  &__item {
    &:hover,
    &.is-active {
      &::before { width: 1em; }
    }

    &.is-active {
      pointer-events: none;
    }

    &.is-hidden {
      @apply --hide;

      width: 0;
    }
  }

  &__navigator {
    &--newer { margin-right: 1rem; }
    &--older { margin-left: 1rem; }

    &:hover,
    &.is-active {
      &::before { width: 100%; }
    }
  }
}
</style>
