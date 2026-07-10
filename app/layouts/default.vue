<script setup lang="ts">
import AppHeader from '~/components/navigation/AppHeader.vue'
import FooterContactStrip from '~/components/navigation/FooterContactStrip.vue'
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main id="main-content" class="site-main">
      <slot />
    </main>
    <FooterContactStrip />
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.app-shell {
  @apply min-h-screen bg-page text-text;
}

.site-main {
  @apply min-h-[40vh];
}
</style>
