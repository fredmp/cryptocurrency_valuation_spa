<template>
  <div v-show="show" class="spinner">
    <img src="../../assets/images/loader.gif" alt="Loader">
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: ['show'],
};
</script>

<style scoped>
div > img {
  margin: auto;
  display: block;
  padding: 100px;
}
</style>
