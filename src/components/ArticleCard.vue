<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <a :href="article.url" target="_blank">
              <img :src="article.imageUrl || '../assets/images/96x96.png'" alt="Placeholder image">
            </a>
          </figure>
        </div>
        <div class="media-content">
          <a :href="article.url" target="_blank">
            <p class="title is-6">
              {{ !!article.source ? `${article.source} - ` : '' }}{{ article.title }}
            </p>
          </a>
          <span>
            {{ !!article.author ? `By ${article.author}: ` : '' }}{{ article.description }}
          </span>
          <div class="div-bottom"></div>
          <a :href="article.url" target="_blank" class="read-more">Read more</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: ['article'],
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
  right: 4px;
  bottom: 0px;
  padding-left: 10px;
  background-color: white;
  font-size: 0.8rem;
  color: rgba(120, 120, 120, 0.5);
}
.div-bottom {
  position: absolute;
  background-color: white;
  width: 100%;
  bottom: 0px;
  padding-bottom: 15px;
}
</style>
