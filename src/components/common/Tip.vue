<template>
<div class="tip">
  <p>
    <icon :name="icon" :label="label"></icon>
    <span>
      <slot/>
    </span>
  </p>
</div>
</template>

<script>
export default {
  name: 'Tip',
  props: {
    icon: {
      type: String,
      default: 'info-circle',
    },
    label: {
      type: String,
      default: 'Info',
    },
  },
};
</script>

<style scoped>
.tip {
  padding-bottom: 10px;
  float: right;
}
.tip > p {
  margin: auto;
  padding-right: 2px;
  font-size: 0.8em;
  color: darkgrey;
}
.tip > p > span {
  vertical-align: middle;
}
.tip > p > svg {
  padding: 0px;
  margin: 0px;
  display: inline;
  vertical-align: middle;
  color: darkgrey;
}
</style>
