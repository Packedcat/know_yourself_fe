<script>
/* eslint-disable */
export default {
  name: 'baseButton',
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
  render(createElement) {
    return createElement(
      'a', {
        class: [this.type, 'button', 'ripple'],
        on: {
          click: this.handleClick,
        },
      },
      this.$slots.default,
    );
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    },
  },
};
</script>
