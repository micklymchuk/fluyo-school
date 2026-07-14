import { computed } from 'vue'
import { useRoute } from '#imports'
import {
  learningPaths,
  type LearningPathId,
  type TelegramFormatContext,
  type TelegramPathContext
} from '~/data/content'

const knownPathIds = learningPaths.map((path) => path.id)

const isKnownPathId = (value: unknown): value is LearningPathId => {
  return typeof value === 'string' && (knownPathIds as readonly string[]).includes(value)
}

export const usePricingPathContext = () => {
  const route = useRoute()

  const activePathId = computed<LearningPathId | undefined>(() => {
    const rawPath = Array.isArray(route.query.path) ? route.query.path[0] : route.query.path

    return isKnownPathId(rawPath) ? rawPath : undefined
  })

  const pathContext = computed<TelegramPathContext>(() => activePathId.value ?? 'generic')

  const recommendedFormat = computed<TelegramFormatContext>(() => {
    const path = learningPaths.find((learningPath) => learningPath.id === activePathId.value)

    return path?.telegramFormat ?? 'generic'
  })

  return {
    activePathId,
    pathContext,
    recommendedFormat
  }
}
