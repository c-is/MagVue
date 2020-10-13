<template>
  <div class="filter">
    <div v-if="time" class="filter__inner">
      <h2 class="filter__title" data-aos="fade-up">
        Archive
      </h2>

      <div class="filter__wrapper">
        <div v-for="year in time" :key="year.year" class="filter__group">
          <h3>{{ year.year }}</h3>
          <ul
            v-for="(group, index) in year.months"
            :key="index"
            class="filter__list"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <li
              v-for="month in group"
              :key="month.value"
              class="filter__item"
            >
              <button
                class="filter__button"
                data-cursor="small"
                :data-filter-id="month.value"
                @click="onFilter('time', month.value)"
              >
                {{ month.label }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="categories" class="filter__inner">
      <h2 class="filter__title" data-aos="fade-up">
        Categories
      </h2>

      <div class="filter__wrapper">
        <ul
          v-for="(group, index) in modifiedCategories"
          :key="index"
          data-aos="fade-up"
          data-aos-delay="200"
          class="filter__list"
        >
          <li
            v-for="category in group"
            :key="category.id"
            class="filter__item"
          >
            <button
              class="filter__button"
              :class="{ 'is-active': selectedCategory === category.id}"
              data-cursor="small"
              :data-filter-id="category.id"
              @click="onFilter('category', category.id)"
            >
              {{ category.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
    years: Array,
    selectedCategory: [Number, String],
    selectedYear: String,
    onFilter: Function,
  },
  data() {
    const months = [
      [
        {
          label: 'January',
          value: 1,
        },
        {
          label: 'February',
          value: 2,
        },
        {
          label: 'March',
          value: 3,
        },
        {
          label: 'April',
          value: 4,
        },
      ],
      [
        {
          label: 'May',
          value: 5,
        },
        {
          label: 'June',
          value: 6,
        },
        {
          label: 'July',
          value: 7,
        },
        {
          label: 'Augst',
          value: 8,
        },
      ],
      [
        {
          label: 'September',
          value: 9,
        },
        {
          label: 'October',
          value: 10,
        },
        {
          label: 'November',
          value: 11,
        },
        {
          label: 'December',
          value: 12,
        },
      ],
    ];

    const modifiedCategories = [];
    let categoryGroup = [];

    if (this.categories) {
      const categoryWithDefault = [{ id: '0', name: 'All' }, ...this.categories];

      categoryWithDefault.forEach((category, index) => {
        categoryGroup.push(category);

        if (categoryWithDefault.length === index + 1) {
          modifiedCategories.push(categoryGroup);
          return;
        }

        if ((index + 1) % 4 === 0) {
          modifiedCategories.push(categoryGroup);
          categoryGroup = [];
        }
      });
    }

    const time = this.years ? this.years.map(y => ({
      year: y,
      months,
    })) : null;

    return {
      time,
      modifiedCategories,
    };
  },
};
</script>

<style lang="postcss" scoped>
.filter {
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, minmax(auto, var(--grid-width)));
  grid-row-start: 6;
  grid-column-start: 1;
  grid-column-end: 13;
  grid-column-gap: var(--gutter-space);
  align-items: center;
  justify-content: space-between;
  margin: 0;
  margin-top: 2rem;

  @media (--screen-sm-max) {
    grid-row-start: 5;
    grid-column-start: 4;
    grid-column-end: 6;
    margin: 0;
  }

  @media (--screen-xs-max) {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vw;
    background: var(--colour-primary);
    border-radius: 50%;
  }

  &__inner {
    position: relative;

    &:first-child {
      grid-column-start: 3;
      grid-column-end: 7;
    }

    &:nth-child(2) {
      grid-column-start: 7;
      grid-column-end: 11;
    }

    @media (--screen-xs-max) {
      left: 0;
      display: block;
      width: 100%;
      text-align: center;
    }
  }

  &__wrapper {
    display: flex;
  }

  &__group {
    display: flex;
    justify-content: space-between;
  }

  &__list {
    min-width: calc(8.4vw - 1rem);
    margin-right: 1rem;
  }

  &__item {
    margin: 0.333rem 0;
    margin-left: -1rem;
    &:first-child { margin-top: 0; }

    @media (--screen-xs-max) {
      margin-left: 0;
    }
  }

  &__button {
    z-index: 0;
    display: inline-block;
    padding: 0.125em 0.75rem;
    font-weight: 500;
    color: var(--colour-font);
    text-align: center;
    background-color: transparent;
    border: none;
    outline: none;

    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -1;
      width: 0;
      height: 100%;
      content: '';
      background-color: var(--colour-secondary);
      border-radius: 0.25rem;
      transition: width 0.4s;
    }

    &.is-active,
    &:hover {
      color: var(--colour-primary);
      &::before { width: 100%; }
    }

    &.is-active {
      pointer-events: none;
    }
  }
}
</style>
