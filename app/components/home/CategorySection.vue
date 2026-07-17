<script setup lang="ts">
defineProps<{
  categories: {
    id: string
    slug: string
    name: string
    description: string | null
    cover_image_url: string | null
  }[]
}>()
</script>

<template>
  <section class="flex flex-col items-center gap-14 bg-surface-brick px-8 py-20 md:px-16">
    <div class="flex w-full flex-col gap-8 md:flex-row md:justify-between">
      <NuxtLink
        v-for="category in categories"
        :key="category.id"
        :to="`/products?category=${category.slug}`"
        class="group relative block flex-1 overflow-hidden"
      >
        <img
          v-if="category.cover_image_url"
          :src="category.cover_image_url"
          :alt="category.name"
          class="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div v-else class="h-[420px] w-full bg-surface-card" />
        <div class="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 px-1 pb-0 pt-5">
          <span class="font-caption text-xs tracking-[0.15em] text-text-inverse-muted"
            >FOR. HER</span
          >
          <span class="font-heading text-2xl text-text-inverse">{{ category.name }}</span>
        </div>
      </NuxtLink>
    </div>

    <p class="font-heading max-w-3xl text-center text-3xl leading-snug text-text-inverse">
      永遠盛放的女孩，總能活出最動人的自己
    </p>
  </section>
</template>
