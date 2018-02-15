<template>
  <div class="block">
    <div class="notification is-danger" v-show="errorMessage">
      <button class="delete" @click="errorMessage = null"></button>
      <span>{{ errorMessage }}</span>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-child">
        <p class="title">News</p>
        <news-card v-for="n in newsList" :news="n" :key="n.id"></news-card>
      </div>
      <div class="tile is-child is-4">
        <p class="title">Popular</p>
        <currency-card v-for="c in currencies" :currency="c" :key="c.id"></currency-card>
      </div>
    </div>
  </div>
</template>

<script>
import NewsCard from '@/components/NewsCard';
import CurrencyCard from '@/components/CurrencyCard';

export default {
  name: 'Home',
  data() {
    return {
      newsList: [{ id: 1, title: 'Lorem '.repeat(20), content: 'Lorem '.repeat(10) }, { id: 2, title: 'Lorem '.repeat(10), content: 'Lorem '.repeat(400) }, { id: 3, title: 'Lorem '.repeat(10), content: 'Lorem '.repeat(200) }, { id: 4, title: 'Lorem '.repeat(10), content: 'Lorem '.repeat(180) }],
      errorMessage: null,
    };
  },
  mounted() {
    this.$store.dispatch('fetchPopular');
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
  },
  components: {
    NewsCard,
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
