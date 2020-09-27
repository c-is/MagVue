import axios from 'axios';
import ProgressCircle from '../svgs/progress-circle.svg';
import Check from '../svgs/check.svg';
import Cross from '../svgs/cross.svg';
import Progress from '../widgets/DrawProgress';

const DEFAULT_REQUIRED_MESSAGE = 'Please fill the required input';
const DEFAULT_ERROR_MESSAGE = 'Error has occurred so fuck off';

const delay = (t, v) => (
  new Promise(resolve => {
    setTimeout(resolve.bind(null, v), t);
  })
);

export default {
  components: {
    ProgressCircle,
    Check,
    Cross,
  },
  data() {
    return {
      errorMessage: null,
      isDisabled: false,
      isSuccess: false,
      isError: false,
      isLoading: false,
      progressEl: null,
      successEl: null,
      errorEl: null,
    };
  },
  mounted() {
    this.progressEl = new Progress(this.$refs.svgCircle.$el);
    this.successEl = new Progress(this.$refs.svgCheck.$el);
    this.errorEl = new Progress(this.$refs.svgCross.$el);
  },
  methods: {
    // setInitialPathStroke() {
    //   this.path = document.querySelector('.js-footer-cover .svg-line');
    //   if (this.path) {
    //     const length = this.path.getTotalLength();
    //     this.path.style.strokeDasharray = `${length} ${length}`;
    //     this.path.style.strokeDashoffset = length;
    //   }
    // },

    setError(message, el) {
      this.errorMessage = message;

      if (el) {
        el.classList.add('is-error');
      }
    },

    setProgress(val) {
      this.progressEl.draw(val);
    },

    enable() {
      this.isDisabled = false;
    },

    stop(status) {
      const endLoading = () => {
        this.progressEl.draw(0);

        if (typeof status === 'number') {
          const statusEl = status >= 0 ? this.successEl : this.errorEl;

          statusEl.draw(1);

          if (status >= 0) {
            this.isSuccess = true;
          } else {
            this.isError = true;
          }

          setTimeout(() => {
            this.isSuccess = false;
            this.isError = false;
            statusEl.draw(0);
            this.enable();
          }, 3000);
        } else {
          this.enable();
        }
        // finally remove class loading.
        this.isLoading = false;
      };

      setTimeout(endLoading, 300);
    },

    validation() {
      const inputs = this.$refs.view.querySelectorAll('.is-required');
      let valid = { status: true };

      if (this.$refs.robot.value) {
        valid = {
          status: false,
          message: 'You are a robot, ain\'t you?',
        };
      }

      for (let x = 0; x < inputs.length; x += 1) {
        if (!inputs[x].value) {
          valid = {
            status: false,
            message: DEFAULT_REQUIRED_MESSAGE,
            el: inputs[x],
          };
          break;
        }
      }

      return valid;
    },

    async sendForm(submitData) {
      // Utils.setAttribute(this.cursor, 'expand', false);
      this.isLoading = true;
      this.isDisabled = false;

      let progress = 0;

      const interval = setInterval(() => {
        progress = Math.min(progress + Math.random() * 0.1, 1);
        this.setProgress(progress);
      }, 150);

      await delay(1000);

      return axios(submitData)
        .then(() => {
          this.progressEl.draw(1);
          return delay(600);
        })
        .then(() => {
          this.stop(1);
          clearInterval(interval);
        })
        .catch(error => {
          // error.response
          this.stop(-1);
          clearInterval(interval);
          throw error;
        });
    },

    submit(submitData) {
      this.setError('');

      this.isError = false;
      const validation = this.validation();

      if (!validation.status) {
        const messages = this.$config.messages || {};
        const errorText = messages.required || validation.message;
        return this.setError(errorText, validation.el);
      }

      return this.sendForm(submitData)
        .catch(error => {
          if (error.status === 1) {
            return this.setError(error.message, error.el);
          }

          const messages = this.$config.messages || {};
          const errorText = messages.error || DEFAULT_ERROR_MESSAGE;
          this.setError(errorText);
          throw new Error(errorText);
        });
    },
  },
};
