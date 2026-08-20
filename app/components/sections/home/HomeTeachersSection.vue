<script setup lang="ts">
import { computed } from 'vue'
import TeacherCard from '~/components/teachers/TeacherCard.vue'
import UiLockupHeading from '~/components/ui/UiLockupHeading.vue'
import {type TeacherProfile, teacherProfiles} from '~/data/content'

const { t } = useI18n()

// Flat card data for the row; the carousel will consume the same shape later.
const teachers = computed(() => {
  return teacherProfiles.map((teacher: TeacherProfile) => ({
    id: teacher.id,
    avatar: teacher.avatar,
    avatarAlt: t(`assets.avatar-${teacher.id}.alt`),
    name: t(`teacherProfiles.${teacher.id}.name`),
    role: t(`teacherProfiles.${teacher.id}.role`),
    description: t(`teacherProfiles.${teacher.id}.description`),
    badge: teacher.isFounder ? t('teachersSections.founder.badge') : undefined
  }))
})
</script>

<template>
  <section id="teachers" class="teachers" aria-labelledby="home-teachers-title">
    <div class="teachers__container">
      <UiLockupHeading
        id="home-teachers-title"
        level="h2"
        align="center"
        size="display"
        :caps="t('homeSections.teachers.title')"
      />
      <p class="teachers__line">{{ t('homeSections.teachers.description') }}</p>

      <div class="teachers__row">
        <TeacherCard
          v-for="teacher in teachers"
          :key="teacher.id"
          class="teachers__card"
          :avatar="teacher.avatar"
          :avatar-alt="teacher.avatarAlt"
          :name="teacher.name"
          :role="teacher.role"
          :description="teacher.description"
          :badge="teacher.badge"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.teachers {
  @apply relative bg-page py-section text-text;
}

.teachers__container {
  @apply relative mx-auto flex w-full max-w-6xl flex-col items-center gap-component-gap px-page-gutter text-center;
}

.teachers__line {
  @apply max-w-2xl text-body text-text-muted;
}

/* Stacked on mobile, one flex row from md — the carousel replaces this wrapper later. */
.teachers__row {
  @apply flex w-full flex-col items-stretch justify-center gap-component-gap md:flex-row;
}

.teachers__card {
  @apply w-full md:max-w-sm md:flex-1;
}
</style>
