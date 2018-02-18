<template>
  <div class="block">
    <div class="notification is-danger" v-show="errorMessage">
      <button class="delete" @click="errorMessage = null"></button>
      <span>{{ errorMessage }}</span>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-child">
        <p class="title">News</p>
        <article-card v-for="a in articles" :article="a" :key="a.id"></article-card>
      </div>
      <div class="tile is-child is-4">
        <p class="title">Popular</p>
        <currency-card v-for="c in currencies" :currency="c" :key="c.id"></currency-card>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from '@/components/ArticleCard';
import CurrencyCard from '@/components/CurrencyCard';

export default {
  name: 'Home',
  data() {
    return {
      errorMessage: null,
    };
  },
  mounted() {
    this.$store.dispatch('fetchPopular')
      .then(this.$store.dispatch('fetchArticles'))
      .catch((error) => {
        this.errorMessage = error.message;
      });
  },
  methods: {
    showErrorMessage(error) {
      this.errorMessage = (error.message || 'An error has occurred').toString().substr(0, 200);
    },
  },
  computed: {
    currencies() {
      return this.$store.getters.popular;
    },
    articles() {
      return this.$store.getters.articles;
    },
  },
  components: {
    ArticleCard,
    CurrencyCard,
  },
};
</script>

<style scoped>
.tile.is-ancestor {
  margin: 50px auto 20px auto;
}
.tile.is-child {
  margin-left: 10px !important;
  margin-right: 10px !important;
  margin-bottom: 10px !important;
}
.title {
  font-size: 1.4em;
  color: #3273dc;
}
</style>
