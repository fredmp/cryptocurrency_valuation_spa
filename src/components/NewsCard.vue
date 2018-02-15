<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-5">
            {{ formattedTitle() }}
          </p>
          <span>
            {{ formattedContent() }}
          </span>
          <a class="read-more">Read more</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardNews',
  props: ['news'],
  methods: {
    formattedTitle() {
      if (this.news.title.length > 40) {
        return `${this.news.title.substr(0, 40)}...`;
      }
      return this.news.title;
    },
    formattedContent() {
      if (this.news.content.length > 180) {
        return `${this.news.content.substr(0, 180)}...`;
      }
      return this.news.content;
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
