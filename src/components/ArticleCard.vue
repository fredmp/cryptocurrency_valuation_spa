<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img :src="imageUrl()" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-5">
            {{ formattedTitle() }}
          </p>
          <span>
            {{ formattedDescription() }}
          </span>
          <a class="read-more">Read more</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: ['article'],
  methods: {
    formattedTitle() {
      if (this.article.title.length > 40) {
        return `${this.article.title.substr(0, 40)}...`;
      }
      return this.article.title;
    },
    formattedDescription() {
      if (this.article.description.length > 180) {
        return `${this.article.description.substr(0, 180)}...`;
      }
      return this.article.description;
    },
    imageUrl() {
      return this.article.imageUrl || '../assets/images/96x96.png';
    },
  },
};
</script>

<style scoped>
.card {
  height: 92px;
  margin-bottom: 1rem;
  overflow: hidden;
}
.card-content {
  padding: 0.8rem;
}
.title {
  margin-bottom: 5px;
}
.read-more {
  position: absolute;
  right: 8px;
  bottom: 6px;
}
</style>
