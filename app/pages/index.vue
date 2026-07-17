<script setup lang="ts">
const categories = getCategories()
</script>

<template>
  <div>
    <HomeHeroCollage />
    <HomePromoBanner />
    <HomeBrandStory />
    <HomeCategorySection :categories="categories" />
  </div>
</template>
