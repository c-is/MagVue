<template>
  <form
    ref="view"
    class="form"
    name="contact"
    method="post"
    @submit="submitForm"
  >
    <input type="hidden" name="form-name" value="contact">

    <p class="u-hidden hidden">
      <label>
        Don’t fill this out if you're human:
        <input ref="robot" name="bot-field" class="is-robot">
      </label>
    </p>

    <p class="form__row form__row--text" data-aos="fade-up">
      <input
        v-model="email"
        type="email"
        placeholder="Your email *"
        name="email"
        class="is-required"
      >
      <span class="form__shadow">shadow</span>
    </p>

    <p class="form__row form__row--text" data-aos="fade-up" data-aos-delay="200">
      <input v-model="subject" type="text" placeholder="Subject" name="subject">
      <span class="form__shadow">shadow</span>
    </p>

    <p class="form__row form__row--textarea" data-aos="fade-up" data-aos-delay="400">
      <textarea
        v-model="message"
        cols="30"
        rows="10"
        placeholder="Your message *"
        name="message"
        class="is-required"
      />
      <span class="form__shadow">shadow</span>
    </p>

    <p v-if="errorMessage" class="form__row form__row--error">
      {{ errorMessage }}
    </p>

    <div
      class="form__row form__row--button"
      data-aos="fade"
      data-aos-delay="400"
    >
      <div
        ref="progressor"
        v-tilt
        data-cursor="standard"
        class="form__progress"
        :class="{
          'is-loading': isLoading,
          'is-success': isSuccess,
          'is-error': isError,
        }"
      >
        <button class="form__submit button button--link" data-colour="primary">
          <span class="button__text">Submit</span>
        </button>

        <ProgressCircle ref="svgCircle" class="progress-circle" />
        <Check ref="svgCheck" class="checkmark" />
        <Cross ref="svgCross" class="cross" />
      </div>
    </div>
  </form>
</template>

<script>
import mixinForm from '~/mixins/form';

export default {
  mixins: [mixinForm],
  data() {
    return {
      email: '',
      subject: '',
      message: '',
    };
  },
  methods: {
    async submitForm(event) {
      event.preventDefault();

      const request = {
        url: '/',
        method: 'POST',
        'Content-Type': 'application/x-www-form-urlencoded',
        data: {
          email: this.email,
          subject: this.subject,
          message: this.message,
        },
      };

      await this.submit(request);
      this.email = '';
      this.subject = '';
      this.message = '';
    },
  },
};
</script>
