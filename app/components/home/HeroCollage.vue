<script setup lang="ts">
const captions = ['（安然自在）', '（微光時節）', '（可愛氛圍）']
</script>

<template>
  <section class="relative overflow-hidden bg-surface-linen">
    <!-- 桌面版：還原 Pencil 拼貼版型的絕對定位 -->
    <div class="relative hidden aspect-[1440/1460] w-full lg:block">
      <NuxtLink
        to="/products"
        class="absolute left-[5.56%] top-[2.74%] h-[38.36%] w-[31.94%] overflow-hidden shadow-[0_10px_26px_rgba(0,0,0,0.14)]"
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1782383827603-cb6533bc51ce?q=80&w=1080"
          alt="朋友一起購物"
          class="h-full w-full object-cover"
        />
      </NuxtLink>
      <NuxtLink
        to="/products"
        class="absolute left-[35.42%] top-[8.22%] h-[32.88%] w-[18.06%] overflow-hidden shadow-[0_10px_26px_rgba(0,0,0,0.14)]"
      >
        <img
          src="https://images.unsplash.com/photo-1782849206170-dba15f39acb7?q=80&w=1080"
          alt="配件特寫"
          class="h-full w-full object-cover"
        />
      </NuxtLink>

      <div class="absolute left-[5.56%] top-[43.15%] flex items-center gap-14">
        <span
          v-for="caption in captions"
          :key="caption"
          class="font-body text-sm italic text-text-secondary"
        >
          {{ caption }}
        </span>
      </div>

      <p
        class="font-heading absolute left-[56.6%] top-[38%] text-[92px] leading-none text-text-primary [writing-mode:vertical-rl]"
      >
        Women <em>on</em> Strength
      </p>

      <NuxtLink
        to="/products"
        class="absolute left-[69.44%] top-[2.74%] h-[52.05%] w-1/4 overflow-hidden shadow-[0_10px_26px_rgba(0,0,0,0.14)]"
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1781045230562-47c2edb4f77f?q=80&w=1080"
          alt="編輯感人像"
          class="h-full w-full object-cover"
        />
      </NuxtLink>

      <p
        class="font-body absolute left-[5.56%] top-[50.68%] w-[29.17%] text-base italic text-text-secondary"
      >
        「你所愛的人，也同樣愛著你嗎？」
      </p>

      <NuxtLink
        to="/products"
        class="absolute left-[5.56%] top-[54.11%] h-[35.62%] w-[36.11%] overflow-hidden shadow-[0_10px_26px_rgba(0,0,0,0.14)]"
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1780500270578-104f541ee554?q=80&w=1080"
          alt="斜倚人像"
          class="h-full w-full object-cover"
        />
      </NuxtLink>

      <div class="absolute left-[5.56%] top-[91.78%] flex items-center gap-9">
        <div class="flex items-end gap-2.5">
          <span class="font-heading text-[34px] text-text-primary">SAVE</span>
          <span class="font-heading text-[76px] font-bold text-text-primary">$100</span>
        </div>
        <p class="font-body w-[300px] text-[15px] leading-normal text-text-secondary">
          你堅強、獨立又勇敢，這些不凡的特質值得被溫柔提醒。
        </p>
      </div>

      <NuxtLink
        to="/products"
        class="absolute left-[69.44%] top-[54.11%] h-[31.51%] w-1/4 overflow-hidden shadow-[0_10px_26px_rgba(0,0,0,0.14)]"
      >
        <img
          src="https://images.unsplash.com/photo-1583012227331-cb575fc330a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="全身穿搭"
          class="h-full w-full object-cover"
        />
      </NuxtLink>
      <NuxtLink
        to="/products"
        class="absolute left-[81.25%] top-[80.82%] h-[10.96%] w-[13.89%] overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.14)]"
      >
        <img
          src="https://images.unsplash.com/photo-1782768025075-7b85ff26d281?q=80&w=1080"
          alt="飾品特寫"
          class="h-full w-full object-cover"
        />
      </NuxtLink>
    </div>

    <!-- 手機版：簡化為直向堆疊 -->
    <div class="flex flex-col gap-6 px-6 py-10 lg:hidden">
      <NuxtLink to="/products" class="block">
        <img
          src="https://plus.unsplash.com/premium_photo-1782383827603-cb6533bc51ce?q=80&w=1080"
          alt="朋友一起購物"
          class="h-80 w-full object-cover shadow-[0_10px_26px_rgba(0,0,0,0.14)]"
        />
      </NuxtLink>
      <div class="flex items-center justify-center gap-6">
        <span
          v-for="caption in captions"
          :key="caption"
          class="font-body text-xs italic text-text-secondary"
        >
          {{ caption }}
        </span>
      </div>
      <h1 class="font-heading text-center text-4xl text-text-primary">
        Women <em>on</em> Strength
      </h1>
      <NuxtLink to="/products" class="block">
        <img
          src="https://plus.unsplash.com/premium_photo-1780500270578-104f541ee554?q=80&w=1080"
          alt="斜倚人像"
          class="h-72 w-full object-cover shadow-[0_10px_26px_rgba(0,0,0,0.14)]"
        />
      </NuxtLink>
      <p class="font-body text-center text-sm italic text-text-secondary">
        「你所愛的人，也同樣愛著你嗎？」
      </p>
      <div class="flex flex-col items-center gap-4 text-center">
        <div class="flex items-end justify-center gap-2.5">
          <span class="font-heading text-2xl text-text-primary">SAVE</span>
          <span class="font-heading text-5xl font-bold text-text-primary">$100</span>
        </div>
        <p class="font-body max-w-xs text-sm leading-normal text-text-secondary">
          你堅強、獨立又勇敢，這些不凡的特質值得被溫柔提醒。
        </p>
      </div>
      <NuxtLink to="/products" class="block">
        <img
          src="https://images.unsplash.com/photo-1583012227331-cb575fc330a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="全身穿搭"
          class="h-80 w-full object-cover shadow-[0_10px_26px_rgba(0,0,0,0.14)]"
        />
      </NuxtLink>
    </div>
  </section>
</template>
