<script setup lang="ts">
import { computed } from 'vue'
import TeacherCard from '~/components/teachers/TeacherCard.vue'
import UiCard from '~/components/ui/UiCard.vue'
import TeacherCredentialStripItem from '~/components/teachers/TeacherCredentialStripItem.vue'
import TeacherProofItem from '~/components/teachers/TeacherProofItem.vue'
import { useSurfaceViewObserver } from '~/composables/useSurfaceViewObserver'
import {
  proofAssets,
  teacherProfiles,
  type ProofAsset,
  type TeacherProfile,
  type TeacherProofSurface,
  type TrackingTrigger
} from '~/data/content'

const route = useRoute()
const { locale } = useLocale()
const { t, tm, rt } = useI18n()
const { trackEvent } = useTracking()

const observedSurfaces = ['teacher-cards', 'credentials-proof', 'lesson-proof'] as const satisfies readonly TeacherProofSurface[]

const teachersProofAssets = proofAssets.filter((asset: ProofAsset) => asset.usageContext.includes('teachers'))
const credentialProofAssets = teachersProofAssets.filter((asset) => asset.kind === 'method')
const lessonProofAssets = teachersProofAssets.filter((asset) => asset.kind === 'classroom')

function isObservedSurface(value: string): value is TeacherProofSurface {
  return (observedSurfaces as readonly string[]).includes(value)
}

function getTeacherCredentials(teacherId: TeacherProfile['id']): string[] {
  const credentials = tm(`teacherProfiles.${teacherId}.credentials`)

  if (!Array.isArray(credentials)) {
    return []
  }

  return credentials.map((credential) => rt(credential))
}

function getTeacherInitials(teacherId: TeacherProfile['id']): string {
  return t(`teacherProfiles.${teacherId}.name`)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}

const teacherCards = computed(() => {
  return teacherProfiles.map((teacher) => ({
    id: teacher.id,
    initials: getTeacherInitials(teacher.id),
    name: t(`teacherProfiles.${teacher.id}.name`),
    role: t(`teacherProfiles.${teacher.id}.role`),
    bio: t(`teacherProfiles.${teacher.id}.bio`),
    fitItems: teacher.audienceFit.map((pathId) => t(`learningPaths.${pathId}.title`)),
    credentials: getTeacherCredentials(teacher.id)
  }))
})

const credentialStripItems = computed(() => {
  return teacherProfiles.map((teacher) => ({
    id: teacher.id,
    owner: t(`teacherProfiles.${teacher.id}.name`),
    facts: getTeacherCredentials(teacher.id).join(' · ')
  }))
})

const credentialProofItems = computed(() => {
  return credentialProofAssets.map((asset) => ({
    id: asset.id,
    kindLabel: t(`teachersSections.proofKindLabels.${asset.kind}`),
    title: t(`proofAssets.${asset.id}.title`),
    caption: t(`proofAssets.${asset.id}.caption`)
  }))
})

const lessonProofItems = computed(() => {
  return lessonProofAssets.map((asset) => ({
    id: asset.id,
    kindLabel: t(`teachersSections.proofKindLabels.${asset.kind}`),
    title: t(`proofAssets.${asset.id}.title`),
    caption: t(`proofAssets.${asset.id}.caption`)
  }))
})

function trackTeacherProofView(surface: TeacherProofSurface, trigger: TrackingTrigger) {
  trackEvent('teacher_proof_view', {
    route: route.fullPath,
    locale: locale.value,
    sourceRoute: 'teachers',
    surface,
    trigger
  })
}

useSurfaceViewObserver('data-proof-surface', (surface) => {
  if (isObservedSurface(surface)) {
    trackTeacherProofView(surface, 'observe')
  }
})
</script>

<template>
  <div class="proof-columns">
    <div class="proof-columns__inner">
      <UiCard
        as="section"
        class="proof-column"
        data-proof-surface="teacher-cards"
        aria-labelledby="teacher-cards-title"
      >
        <h2 id="teacher-cards-title" class="proof-column__title">
          {{ t('teachersSections.teacherCards.title') }}
        </h2>
        <p class="proof-column__description">{{ t('teachersSections.teacherCards.description') }}</p>

        <TeacherCard
          v-for="card in teacherCards"
          :id="card.id"
          :key="card.id"
          :initials="card.initials"
          :name="card.name"
          :role="card.role"
          :bio="card.bio"
          :fit-label="t('teachersSections.teacherCards.audienceFitLabel')"
          :fit-items="card.fitItems"
          :credentials="card.credentials"
        />
      </UiCard>

      <UiCard
        as="section"
        class="proof-column"
        data-proof-surface="credentials-proof"
        aria-labelledby="credentials-proof-title"
      >
        <h2 id="credentials-proof-title" class="proof-column__title">
          {{ t('teachersSections.credentials.title') }}
        </h2>
        <p class="proof-column__description">{{ t('teachersSections.credentials.description') }}</p>

        <ul class="credential-strip">
          <TeacherCredentialStripItem
            v-for="stripItem in credentialStripItems"
            :key="stripItem.id"
            :owner="stripItem.owner"
            :facts="stripItem.facts"
          />
        </ul>

        <TeacherProofItem
          v-for="proofItem in credentialProofItems"
          :key="proofItem.id"
          :kind-label="proofItem.kindLabel"
          :title="proofItem.title"
          :caption="proofItem.caption"
        />

        <p class="proof-column__note">{{ t('teachersSections.credentials.proofNote') }}</p>
      </UiCard>

      <UiCard
        as="section"
        class="proof-column"
        data-proof-surface="lesson-proof"
        aria-labelledby="lesson-proof-title"
      >
        <h2 id="lesson-proof-title" class="proof-column__title">
          {{ t('teachersSections.lessonProof.title') }}
        </h2>
        <p class="proof-column__description">{{ t('teachersSections.lessonProof.description') }}</p>

        <TeacherProofItem
          v-for="proofItem in lessonProofItems"
          :key="proofItem.id"
          :kind-label="proofItem.kindLabel"
          :title="proofItem.title"
          :caption="proofItem.caption"
        />

        <p class="proof-column__note">{{ t('teachersSections.lessonProof.privacyNote') }}</p>
      </UiCard>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.proof-columns {
  @apply bg-page px-page-gutter py-section-compact text-text;
}

.proof-columns__inner {
  @apply mx-auto grid w-full max-w-6xl gap-component-gap lg:grid-cols-3 lg:items-start;
}

.proof-column {
  @apply flex flex-col gap-control-compact;
}

.proof-column__title {
  @apply font-display text-section-heading font-bold uppercase leading-tight tracking-display text-text;
}

.proof-column__description {
  @apply text-body text-text-muted;
}

.proof-column__note {
  @apply border-t border-border-hairline pt-control-compact text-small text-text-muted;
}

.credential-strip {
  @apply grid gap-control-compact;
}
</style>
