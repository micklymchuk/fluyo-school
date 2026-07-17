<script setup lang="ts">
import { computed } from 'vue'
import TeacherShowcase from '~/components/teachers/TeacherShowcase.vue'
import UiSection from '~/components/sections/UiSection.vue'
import { teacherProfiles } from '~/data/content'

const { t, tm, rt } = useI18n()

const factIndexes = [0, 1] as const

function teacherFacts(teacherId: string) {
  return factIndexes.map((factIndex) => ({
    title: t(`teacherProfiles.${teacherId}.facts[${factIndex}].title`),
    body: t(`teacherProfiles.${teacherId}.facts[${factIndex}].body`)
  }))
}

function teacherFocus(teacherId: string): string[] {
  const items = tm(`teacherProfiles.${teacherId}.focus`)

  if (!Array.isArray(items)) {
    return []
  }

  return items.map((item) => rt(item))
}

const teachers = computed(() => {
  return teacherProfiles.map((teacher, index) => ({
    id: teacher.id,
    scriptName: teacher.scriptName,
    role: t(`teacherProfiles.${teacher.id}.role`),
    facts: teacherFacts(teacher.id),
    focusItems: teacherFocus(teacher.id),
    photoSrc: teacher.photo,
    photoAlt: t(`assets.portrait-${teacher.id}.alt`),
    // The founder leads the list, set apart by a badge and her sparkle lockup.
    isFounder: teacher.isFounder === true,
    badge: teacher.isFounder ? t('teachersSections.founder.badge') : undefined,
    reversed: index % 2 === 1
  }))
})
</script>

<template>
  <UiSection
    class="teachers-page__team"
    :eyebrow="t('teachersSections.team.eyebrow')"
    :title="t('teachersSections.team.title')"
    :description="t('teachersSections.team.description')"
  >
    <div class="team">
      <TeacherShowcase
        v-for="teacher in teachers"
        :key="teacher.id"
        :eyebrow="teacher.badge"
        :sparkles="teacher.isFounder"
        :script-name="teacher.scriptName"
        :role="teacher.role"
        :facts="teacher.facts"
        :focus-title="t('teachersSections.team.focusTitle')"
        :focus-items="teacher.focusItems"
        :photo-src="teacher.photoSrc"
        :photo-alt="teacher.photoAlt"
        :reversed="teacher.reversed"
      />
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.team {
  @apply flex flex-col gap-section-spacious;
}
</style>
