<template>
  <svg
    viewBox="0 0 32 32"
    :style="style">
    <use :xlink:href="`/static/images/icons.svg#icons-${symbol.toLowerCase()}`"/>
  </svg>
</template>

<script>
export default {
  name: 'CurrencyIcon',
  props: {
    symbol: {
      type: String,
      default: '404',
    },
    size: {
      type: String,
      default: '32',
    },
  },
  data() {
    return {
      padding: 0,
    };
  },
  computed: {
    style() {
      const receivedSize = parseInt(this.size, 10);
      const padding = receivedSize < 32 ? 32 - receivedSize : 0;
      const fixedSize = receivedSize < 32 ? 32 : receivedSize;
      return {
        'max-width': `${fixedSize}px`,
        'max-height': `${fixedSize}px`,
        'padding-top': padding > 0 ? `${padding / 2}px` : 0,
        'padding-bottom': padding > 0 ? `${padding / 2}px` : 0,
      };
    },
  },
};
</script>
