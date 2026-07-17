<script setup lang="ts"></script>

<template>
  <section class="relative overflow-hidden bg-surface-white">
    <!-- 桌面版 -->
    <div class="relative hidden aspect-[1440/1050] w-full lg:block">
      <NuxtLink to="/products" class="absolute left-0 top-0 h-[88.57%] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1750701977180-2e0ed4d371ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="黑白服裝背景"
          class="h-full w-full object-cover"
        />
      </NuxtLink>
      <NuxtLink
        to="/products"
        class="absolute left-[1.6%] top-[5.52%] h-[29.33%] w-[49.44%] overflow-hidden shadow-[0_10px_24px_rgba(0,0,0,0.2)]"
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1740020264402-3a493f16dac8?q=80&w=1080"
          alt="頂部特寫照"
          class="h-full w-full object-cover"
        />
      </NuxtLink>
      <p
        class="font-body absolute left-[87.36%] top-[1.9%] w-[180px] text-right text-[13px] italic leading-[1.7] text-text-inverse-muted"
      >
        A person who collects or has a great love of books
      </p>

      <div class="absolute left-[3.75%] top-[39.52%] flex items-center gap-3.5">
        <span class="font-heading text-[74px] text-text-inverse">Made</span>
        <span class="font-heading text-[74px] italic text-text-inverse">in</span>
        <span class="font-heading text-[74px] text-text-inverse">Taiwan</span>
      </div>

      <p
        class="font-caption absolute left-[3.75%] top-[49.05%] w-[480px] text-[11px] leading-[1.8] tracking-wide text-text-inverse-muted"
      >
        YOU'VE GOT TO HAVE STYLE. IT HELPS YOU GET DOWN THE STAIRS. IT HELPS YOU GET UP IN THE
        MORNING. IT'S A WAY OF LIFE. WITHOUT IT, YOU'RE NOBODY. I'M NOT TALKING ABOUT CLOTHES.
      </p>

      <NuxtLink
        to="/products"
        class="absolute left-[60.28%] top-[37.33%] h-[40.95%] w-[16.04%] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
      >
        <img
          src="https://images.unsplash.com/photo-1648046511858-b3987bf3b65a?q=80&w=1080"
          alt="黑白中景照"
          class="h-full w-full object-cover"
        />
      </NuxtLink>
      <NuxtLink
        to="/products"
        class="absolute left-[76.32%] top-[38.1%] h-[37.33%] w-[23.47%] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
      >
        <img
          src="https://images.unsplash.com/photo-1678441413186-a007d1909d86?q=80&w=1080"
          alt="彩色特寫照"
          class="h-full w-full object-cover"
        />
      </NuxtLink>
      <NuxtLink
        to="/products"
        class="absolute left-[20.83%] top-[68.1%] h-[20.48%] w-[16.53%] -rotate-3 overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
      >
        <img
          src="https://images.unsplash.com/photo-1648405746518-136226e83eda?q=80&w=1080"
          alt="野餐小照"
          class="h-full w-full object-cover"
        />
      </NuxtLink>
      <NuxtLink
        to="/products"
        class="absolute left-[29.86%] top-[82%] h-[13.14%] w-[18.19%] rotate-3 overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1782168547293-aa65f84af123?q=80&w=1080"
          alt="手部特寫小照"
          class="h-full w-full object-cover"
        />
      </NuxtLink>

      <p
        class="font-body absolute left-[84.31%] top-[77.62%] w-[220px] text-right text-sm italic text-text-inverse"
      >
        "I gave you all my love and youth"
      </p>
    </div>

    <!-- 手機版 -->
    <div class="flex flex-col gap-6 bg-surface-dark px-6 py-12 lg:hidden">
      <NuxtLink to="/products" class="block">
        <img
          src="https://images.unsplash.com/photo-1750701977180-2e0ed4d371ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="黑白服裝背景"
          class="h-72 w-full object-cover"
        />
      </NuxtLink>
      <div class="flex items-center gap-3">
        <span class="font-heading text-5xl text-text-inverse">Made</span>
        <span class="font-heading text-5xl italic text-text-inverse">in</span>
      </div>
      <span class="font-heading text-5xl text-text-inverse">Taiwan</span>
      <p class="font-caption text-[11px] leading-[1.8] tracking-wide text-text-inverse-muted">
        YOU'VE GOT TO HAVE STYLE. IT HELPS YOU GET DOWN THE STAIRS. IT HELPS YOU GET UP IN THE
        MORNING. IT'S A WAY OF LIFE. WITHOUT IT, YOU'RE NOBODY. I'M NOT TALKING ABOUT CLOTHES.
      </p>
      <div class="grid grid-cols-2 gap-3">
        <NuxtLink to="/products" class="block">
          <img
            src="https://images.unsplash.com/photo-1648046511858-b3987bf3b65a?q=80&w=1080"
            alt="黑白中景照"
            class="h-48 w-full object-cover shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
          />
        </NuxtLink>
        <NuxtLink to="/products" class="block">
          <img
            src="https://images.unsplash.com/photo-1678441413186-a007d1909d86?q=80&w=1080"
            alt="彩色特寫照"
            class="h-48 w-full object-cover shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
