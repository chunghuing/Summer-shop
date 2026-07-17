<script setup lang="ts"></script>

<template>
  <section class="bg-surface-white">
    <div class="h-0.5 w-full bg-[#C7A868]" />

    <div class="flex flex-col items-center gap-3.5 px-8 pb-11 pt-16 md:px-16">
      <div class="flex items-center gap-2.5">
        <h2 class="font-heading text-4xl font-bold tracking-wide text-surface-brick md:text-[54px]">
          2 FOR NT.598
        </h2>
        <span
          class="font-caption inline-block -rotate-6 rounded-full border border-surface-brick px-3.5 py-1 text-[11px] tracking-widest text-surface-brick"
        >
          2022
        </span>
      </div>
      <p
        class="font-caption max-w-[560px] text-center text-[11px] leading-loose tracking-wide text-text-primary"
      >
        FASHION YOU CAN BUY, BUT STYLE YOU POSSESS. THE KEY TO STYLE IS LEARNING WHO YOU ARE, WHICH
        TAKES YEARS. THERE'S NO HOW-TO ROAD MAP TO STYLE. IT'S ABOUT SELF-EXPRESSION AND, ABOVE ALL,
        ATTITUDE.
      </p>
    </div>

    <!-- 桌面版：4 張滿版照片 + 唯一有拍立得白邊的第 2 張 -->
    <div class="relative hidden h-[480px] w-full lg:block">
      <NuxtLink
        to="/products"
        class="absolute left-0 top-[3.13%] h-[93.54%] w-[24.86%] overflow-hidden shadow-[0_10px_22px_rgba(0,0,0,0.13)]"
      >
        <img
          src="https://images.unsplash.com/photo-1643443578800-10e7839eecba?q=80&w=1080"
          alt="穿搭示範 1"
          class="h-full w-full object-cover"
        />
      </NuxtLink>
      <NuxtLink
        to="/products"
        class="absolute left-[24.65%] top-0 h-[83.33%] w-[22.92%] -rotate-[7deg] overflow-hidden border-[16px] border-[#F1EAD9] shadow-[0_10px_22px_rgba(0,0,0,0.13)]"
      >
        <img
          src="https://images.unsplash.com/photo-1783961797133-dd0fc5a722ec?q=80&w=1080"
          alt="穿搭示範 2"
          class="h-full w-full object-cover"
        />
      </NuxtLink>
      <NuxtLink
        to="/products"
        class="absolute left-[50.21%] top-[3.13%] h-[93.54%] w-[24.58%] overflow-hidden shadow-[0_10px_22px_rgba(0,0,0,0.13)]"
      >
        <img
          src="https://images.unsplash.com/photo-1783512528338-39681f25e27e?q=80&w=1080"
          alt="穿搭示範 3"
          class="h-full w-full object-cover"
        />
      </NuxtLink>
      <NuxtLink
        to="/products"
        class="absolute left-[74.72%] top-[3.13%] h-[93.54%] w-[25.28%] overflow-hidden shadow-[0_10px_22px_rgba(0,0,0,0.13)]"
      >
        <img
          src="https://images.unsplash.com/photo-1783181155188-89dbe82951c6?q=80&w=1080"
          alt="穿搭示範 4"
          class="h-full w-full object-cover"
        />
      </NuxtLink>
      <p
        class="font-heading absolute left-[69.79%] top-[91.67%] -rotate-[8deg] text-[46px] italic text-surface-brick drop-shadow-[0_2px_6px_rgba(255,255,255,0.69)]"
      >
        Lovable!
      </p>
    </div>

    <!-- 手機版：2x2 排列 -->
    <div class="grid grid-cols-2 gap-2 px-4 lg:hidden">
      <NuxtLink to="/products" class="block">
        <img
          src="https://images.unsplash.com/photo-1643443578800-10e7839eecba?q=80&w=1080"
          alt="穿搭示範 1"
          class="h-56 w-full object-cover shadow-[0_10px_22px_rgba(0,0,0,0.13)]"
        />
      </NuxtLink>
      <NuxtLink to="/products" class="block">
        <img
          src="https://images.unsplash.com/photo-1783961797133-dd0fc5a722ec?q=80&w=1080"
          alt="穿搭示範 2"
          class="h-56 w-full border-8 border-[#F1EAD9] object-cover shadow-[0_10px_22px_rgba(0,0,0,0.13)]"
        />
      </NuxtLink>
      <NuxtLink to="/products" class="block">
        <img
          src="https://images.unsplash.com/photo-1783512528338-39681f25e27e?q=80&w=1080"
          alt="穿搭示範 3"
          class="h-56 w-full object-cover shadow-[0_10px_22px_rgba(0,0,0,0.13)]"
        />
      </NuxtLink>
      <NuxtLink to="/products" class="block">
        <img
          src="https://images.unsplash.com/photo-1783181155188-89dbe82951c6?q=80&w=1080"
          alt="穿搭示範 4"
          class="h-56 w-full object-cover shadow-[0_10px_22px_rgba(0,0,0,0.13)]"
        />
      </NuxtLink>
    </div>
    <p class="font-heading py-6 text-center text-3xl italic text-surface-brick lg:hidden">
      Lovable!
    </p>

    <div class="px-6 pb-12 pt-5 md:px-16">
      <p
        class="font-caption max-w-[320px] text-[10px] leading-loose tracking-wide text-text-primary"
      >
        STYLE IS SOMETHING EACH OF US ALREADY HAS, ALL WE NEED TO DO IS FIND IT.
      </p>
    </div>
  </section>
</template>
