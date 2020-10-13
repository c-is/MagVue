<template>
  <div class="newsletter" :class="subClass">
    <div class="newsletter__content">
      <div class="newsletter__inner">
        <div class="newsletter__text">
          <h2>Newsletter</h2>
          <p class="newsletter__sub">
            Sign up for the free* newsletter{{ }}
            - get monthly freebies and read a chapter of my e-book 😏
          </p>
        </div>

        <form
          ref="view"
          class="form newsletter__form"
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
              class="form__progress"
              data-cursor="standard"
              :class="{
                'is-loading': isLoading,
                'is-success': isSuccess,
                'is-error': isError,
              }"
            >
              <button v-tilt class="form__submit button button--link">
                <span class="button__text">Submit</span>
              </button>

              <ProgressCircle ref="svgCircle" class="progress-circle" />
              <Check ref="svgCheck" class="checkmark" />
              <Cross ref="svgCross" class="cross" />
            </div>
          </div>
        </form>

        <i
          class="newsletter__background"
          data-aos="draw"
          data-aos-timing="400"
          data-aos-delay="100"
        >
          <NewsLetterBg ref="svg" class="background" />
        </i>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import mixinForm from '~/mixins/form';
import NewsLetterBg from '~/svgs/newsletter.svg';

export default {
  components: {
    NewsLetterBg,
  },
  mixins: [mixinForm],
  props: {
    subClass: String,
  },
  data() {
    return {
      name: '',
      email: '',
    };
  },
  mounted() {
    const { svg } = this.$refs;

    if (svg && svg.$el) {
      const paths = svg.$el.querySelectorAll('path');

      if (paths) {
        paths.forEach(path => {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDashoffset: length,
            strokeDasharray: length,
          });
        });
      }
    }
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
  },
};
</script>

<style lang="postcss" scoped>
.newsletter {
  position: relative;
  padding: 0 var(--grid-margin);

  @media (--screen-sm-max) {
    padding: 0;
  }

  &__title {
    @media (--screen-sm-max) {
      margin-bottom: 1.7143rem;
    }
  }

  &__background {
    position: absolute;
    top: -8rem;
    right: 0;
    left: 0;
    z-index: -1;
    margin: auto;
    color: var(--colour-primary);
    text-align: center;

    .is-post-visual & {
      color: var(--colour-secondary);
    }
  }

  &__content {
    position: relative;
    z-index: 1;
    height: 443px;
    overflow: hidden;
    background-color: var(--colour-secondary);

    .is-post-visual & {
      background-color: var(--colour-primary);
    }

    @media (--screen-sm-max) {
      height: auto;
    }
  }

  &__inner {
    display: flex;
    align-items: center;
    max-width: var(--content-max-width);
    height: 100%;
    margin: auto;

    @media (--screen-sm-max) {
      flex-direction: column;
      padding: 4.5714rem var(--gutter-space-mobile);
    }
  }

  &__text {
    width: 50%;
    padding-bottom: 4rem;
    color: var(--colour-primary);
    text-align: center;

    .is-post-visual & {
      color: var(--colour-secondary);
    }

    @media (--screen-sm-max) {
      width: 100%;
      padding-bottom: 0.5rem;
    }
  }

  &__sub {
    width: 23rem;
    margin: auto;

    @media (--screen-xs-max) {
      width: 100%;
    }
  }

  &__form {
    width: 50%;

    @media (--screen-sm-max) {
      width: 100%;
    }
  }
}

.background {
  transform: translateX(-20%);

  @media (--screen-sm-max) {
    height: 38vh;
  }

  .newsletter__background.aos-animate & {
    opacity: 1;

    >>> path {
      stroke-dashoffset: 0 !important;
      transition: stroke-dashoffset 4s var(--ease-out-sin);
      transition-delay: 0.8s;
    }
  }
}

.form {
  &__submit {
    color: var(--colour-secondary);
    background-color: var(--colour-primary);

    .is-post-visual & {
      color: var(--colour-primary);
      background-color: var(--colour-secondary);
    }
  }

  &__row {
    width: 23rem;
    margin: 1.66666rem auto;

    @media (--screen-sm-max) {
      width: 100%;
      margin: 1.7857rem auto;
    }

    &--button {
      margin: 3.33333rem auto 0;

      @media (--screen-sm-max) {
        width: 100%;
        margin: 3.5714rem auto 0;
      }
    }
  }

  input {
    &::-moz-placeholder {
      color: var(--colour-primary);
      opacity: 0.8;
    }

    &::-webkit-input-placeholder {
      color: var(--colour-primary);
      opacity: 0.8;
    }

    &:-ms-input-placeholder {
      color: var(--colour-primary);
      opacity: 0.8;
    }

    &:-moz-placeholder {
      color: var(--colour-primary);
      opacity: 0.8;
    }

    .is-post-visual & {
      &::-moz-placeholder {
        color: var(--colour-secondary);
      }

      &::-webkit-input-placeholder {
        color: var(--colour-secondary);
      }

      &:-ms-input-placeholder {
        color: var(--colour-secondary);
      }

      &:-moz-placeholder {
        color: var(--colour-secondary);
      }
    }
  }

  input[type="text"],
  input[type="email"] {
    color: var(--colour-primary);
    border-color: var(--colour-primary);

    .is-post-visual & {
      color: var(--colour-secondary);
      border-color: var(--colour-secondary);
    }
  }
}

</style>
