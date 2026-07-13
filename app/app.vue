<script setup lang="ts">
import { IconoirProvider } from '@iconoir/vue'
</script>

<template>
  <IconoirProvider
    :icon-props="{
      width: '1em',
      height: '1em',
      'stroke-width': 1.5
    }"
  >
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </IconoirProvider>
</template>
