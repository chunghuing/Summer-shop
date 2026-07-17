<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen flex-col bg-surface-white">
    <LayoutAnnouncementBar />
    <LayoutNavBar />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>
