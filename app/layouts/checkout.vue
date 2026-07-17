<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-surface-white">
    <header
      class="flex items-center justify-between border-b border-border-subtle bg-surface-linen px-6 py-5 md:px-16 md:py-6"
    >
      <NuxtLink to="/" class="font-heading text-xl italic text-text-primary md:text-2xl">
        Summer
      </NuxtLink>

      <div class="hidden items-center gap-3 md:flex">
        <span class="font-caption text-sm tracking-wide text-text-secondary">1 購物車</span>
        <ChevronRight class="h-3.5 w-3.5 text-border-subtle" />
        <span class="font-caption text-sm tracking-wide text-accent-brick">2 運送資訊</span>
        <ChevronRight class="h-3.5 w-3.5 text-border-subtle" />
        <span class="font-caption text-sm tracking-wide text-text-secondary">3 確認訂單</span>
      </div>

      <span class="font-caption text-xs tracking-wide text-accent-brick md:hidden">
        步驟 2／3：運送資訊
      </span>
    </header>

    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
