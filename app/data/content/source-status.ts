import type { RenderMode, SourceStatus } from './types'

export type ContentRecordWithSourceStatus = {
  id?: string
  sourceStatus: SourceStatus
  requiredForLaunch?: boolean
}

export type LaunchGateSeverity = 'blocking' | 'warning'

export type LaunchGateIssue = {
  collection: string
  id: string
  sourceStatus: SourceStatus
  severity: LaunchGateSeverity
  message: string
}

export const UNRESOLVED_SOURCE_STATUSES = ['mock', 'needs_input', 'needs_review'] as const
export const REQUIRED_BLOCKING_SOURCE_STATUSES = ['mock', 'hidden', 'needs_input', 'needs_review'] as const

export const canRenderSourceStatus = (sourceStatus: SourceStatus, mode: RenderMode): boolean => {
  if (sourceStatus === 'hidden') {
    return false
  }

  if (mode === 'preview') {
    return true
  }

  return sourceStatus === 'approved'
}

export const shouldRenderContentRecord = (
  record: ContentRecordWithSourceStatus,
  mode: RenderMode
): boolean => {
  return canRenderSourceStatus(record.sourceStatus, mode)
}

export const filterRenderableContentRecords = <RecordType extends ContentRecordWithSourceStatus>(
  records: readonly RecordType[],
  mode: RenderMode
): RecordType[] => {
  return records.filter((record) => shouldRenderContentRecord(record, mode))
}

export const isUnresolvedSourceStatus = (sourceStatus: SourceStatus): boolean => {
  return UNRESOLVED_SOURCE_STATUSES.includes(sourceStatus as (typeof UNRESOLVED_SOURCE_STATUSES)[number])
}

export const isRequiredBlockingSourceStatus = (sourceStatus: SourceStatus): boolean => {
  return REQUIRED_BLOCKING_SOURCE_STATUSES.includes(sourceStatus as (typeof REQUIRED_BLOCKING_SOURCE_STATUSES)[number])
}

export const getLaunchGateIssues = <RecordType extends ContentRecordWithSourceStatus>(
  collection: string,
  records: readonly RecordType[]
): LaunchGateIssue[] => {
  return records.flatMap((record) => {
    const id = record.id ?? 'unknown'
    const isRequired = record.requiredForLaunch === true

    if (isRequired && isRequiredBlockingSourceStatus(record.sourceStatus)) {
      return [
        {
          collection,
          id,
          sourceStatus: record.sourceStatus,
          severity: 'blocking',
          message: `${collection}/${id} is required for launch but is ${record.sourceStatus}.`
        }
      ]
    }

    if (!isRequired && isUnresolvedSourceStatus(record.sourceStatus)) {
      return [
        {
          collection,
          id,
          sourceStatus: record.sourceStatus,
          severity: 'warning',
          message: `${collection}/${id} is unresolved and will be hidden in production.`
        }
      ]
    }

    return []
  })
}

export const getBlockingLaunchGateIssues = (
  issues: readonly LaunchGateIssue[]
): LaunchGateIssue[] => {
  return issues.filter((issue) => issue.severity === 'blocking')
}

export const formatLaunchGateReport = (issues: readonly LaunchGateIssue[]): string => {
  if (issues.length === 0) {
    return 'No launch content gate issues.'
  }

  return issues
    .map((issue) => `${issue.severity}: ${issue.message}`)
    .join('\n')
}

export const assertLaunchContentReady = (issues: readonly LaunchGateIssue[]): void => {
  const blockingIssues = getBlockingLaunchGateIssues(issues)

  if (blockingIssues.length > 0) {
    throw new Error(formatLaunchGateReport(blockingIssues))
  }
}
