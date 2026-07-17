<script setup lang="ts">
import { Music4 } from '@lucide/vue'

const linkColumns = [
  { heading: '品牌故事', links: ['關於我們', '永續承諾', '門市據點'] },
  { heading: '購物指南', links: ['尺寸對照', '付款方式', '常見問題'] },
  { heading: '客戶服務', links: ['運送與退換貨', '聯絡我們', '會員條款'] },
  { heading: '追蹤我們', links: ['Instagram', 'Facebook', 'Line 官方帳號'] }
]
</script>

<template>
  <footer class="flex flex-col gap-10 bg-surface-dark px-8 pb-8 pt-16 md:px-16">
    <div class="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
      <div class="flex flex-col gap-1.5">
        <h2 class="font-heading text-2xl italic text-text-inverse">訂閱電子報，掌握最新上架</h2>
        <p class="font-caption text-sm text-text-inverse-muted">
          每週新品、限時優惠，第一手通知不錯過
        </p>
      </div>
      <form class="flex items-center" @submit.prevent>
        <input
          type="email"
          placeholder="輸入您的 Email"
          class="font-caption w-[280px] border-b border-border-inverse bg-transparent px-4 py-3.5 text-sm text-text-inverse-muted focus:outline-none"
        />
        <button
          type="submit"
          class="font-caption whitespace-nowrap bg-surface-brick px-7 py-3.5 text-sm tracking-wide text-text-inverse"
        >
          訂閱
        </button>
      </form>
    </div>

    <div class="h-px bg-border-inverse" />

    <div class="grid grid-cols-2 gap-8 md:flex md:justify-between">
      <div v-for="col in linkColumns" :key="col.heading" class="flex w-[280px] flex-col gap-3.5">
        <h3 class="font-caption text-sm tracking-wide text-text-inverse">{{ col.heading }}</h3>
        <p v-for="link in col.links" :key="link" class="font-body text-sm text-text-inverse-muted">
          {{ link }}
        </p>
      </div>
    </div>

    <div class="h-px bg-border-inverse" />

    <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
      <p class="font-caption text-xs text-text-inverse-muted">
        © 2026 Summer. All rights reserved.
      </p>
      <div class="flex items-center gap-[18px] text-text-inverse-muted">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path d="M15 8h2V4h-2c-2.2 0-4 1.8-4 4v2H9v4h2v8h4v-8h3l1-4h-4V8c0-.6.4-1 1-1z" />
        </svg>
        <Music4 :size="18" :stroke-width="1.5" />
      </div>
    </div>
  </footer>
</template>
