<template>
  <section class="sidebar">
    <div class="sidebar__item">
      <h2>Search</h2>

      <div ref="search" class="form">
        <p class="form__row">
          <input
            v-model="search"
            type="text"
            name="search"
            class="form__input search__input"
            placeholder="Search blog"
            @input="handleSearch"
          >
        </p>
      </div>
    </div>

    <div class="sidebar__item">
      <h2>Newsletter</h2>

      <p>
        Sign up for the free* newsletter{{ ' ' }}
        - get monthly freebies and read a chapter of my e-book 😏
      </p>

      <form
        ref="view"
        class="form"
        @submit="submitForm"
      >
        <input type="hidden" name="form-name" value="contact">

        <p class="u-hidden hidden">
          <label>
            Don’t fill this out if you're human:
            <input ref="robot" name="bot-field" class="is-robot">
          </label>
        </p>

        <p class="form__row">
          <input
            v-model="name"
            type="text"
            name="Name"
            class="form__input is-required"
            placeholder="Your name"
          >
        </p>
        <p class="form__row">
          <input
            v-model="email"
            type="text"
            name="Email"
            class="form__input is-required"
            placeholder="Your email"
          >
        </p>

        <p v-if="errorMessage" class="form__row form__row--error">
          {{ errorMessage }}
        </p>

        <div class="form__row form__row--button">
          <div
            ref="progressor"
            class="form__progress js-button-standard"
            :class="{
              'is-loading': isLoading,
              'is-success': isSuccess,
              'is-error': isError,
            }"
          >
            <button
              v-tilt
              class="form__submit js-submit button button--link"
              :class="{ 'is-active': name && email }"
              :data-colour="name && email ? 'primary' : 'disabled'"
            >
              <span class="button__text">Subscribe</span>
            </button>

            <ProgressCircle ref="svgCircle" class="progress-circle" />
            <Check ref="svgCheck" class="checkmark" />
            <Cross ref="svgCross" class="cross" />
          </div>
        </div>
      </form>
    </div>

    <div class="sidebar__item">
      <h2>Facebook</h2>
      <div
        class="fb-page"
        data-href="https://www.facebook.com/jigenstudio/"
        data-tabs=""
        data-width=""
        data-height=""
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote cite="https://www.facebook.com/jigenstudio/" class="fb-xfbml-parse-ignore">
          <a href="https://www.facebook.com/jigenstudio/">Ｊｉｇｅｎ 次 元 ー Ｓｔｕｄｉｏ</a>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script>
import mixinForm from '../../mixins/form';

const WAIT_INTERVAL = 620;

export default {
  mixins: [mixinForm],
  props: {
    onSearch: Function,
  },
  data() {
    return {
      name: '',
      email: '',
      search: '',
      timer: null,
    };
  },
  mounted() {
    if (window.FB) {
      window.FB.XFBML.parse();
      return;
    }

    this.$loadScript(
      'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v8.0&appId=817769049045332&autoLogAppEvents=1',
    )
      .then(() => {
        window.FB.XFBML.parse();
      })
      .catch(() => {
        console.log('SCRIPT LAODING ERROR');
      });
  },
  methods: {
    async submitForm(event) {
      event.preventDefault();

      const modifiedName = this.name.split(' ');
      const firstName = modifiedName[0];
      const lastName = modifiedName[1];

      const request = {
        url: `https://clientapi.benchmarkemail.com/Contact/${17410881}/ContactDetails`,
        // url: 'https://clientapi.benchmarkemail.com/Contact/',
        method: 'POST',
        headers: { AuthToken: this.$config.benchmark },
        data: {
          Data: {
            // Name: 'Yug List',
            // Description: 'Preacher maaaaaaaaan',
            // FirstName: 'Yugu',
            // LastName: 'Ug',
            // Email: 'preachermaaaaaaaan@trashbat.co.ck',
            FirstName: firstName,
            LastName: lastName,
            Email: this.email,
            EmailPerm: '1',
          },
        },
      };

      await this.submit(request);
      this.name = '';
      this.email = '';
    },

    async handleSearch(event) {
      const handleSearch = () => this.onSearch('search', event.target.value);
      clearTimeout(this.timer);
      this.timer = setTimeout(handleSearch, WAIT_INTERVAL);
    },
  },
};
</script>

<style lang="postcss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 34.5%;
  padding-left: var(--grid-margin);
  text-align: center;

  &__item {
    width: 100%;
    max-width: 350px;
    margin-bottom: var(--space-s);
  }
}

.form {
  margin-top: var(--content-space);
  color: var(--colour-font);

  input[type=email],
  input[type=text],
  textarea {
    color: var(--colour-font);
    border: 2px solid var(--colour-bg-secondary);
  }

  .checkmark {
    color: var(--colour-font-contrast);
  }

  &__row {
    margin-bottom: 1rem;
  }

  &__submit {
    .form__progress.is-loading & {
      color: var(--colour-font);
    }
  }
}

.search {
  &__input { margin-bottom: 0; }
}
</style>
