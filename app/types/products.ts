export type ProjectStatus = "fundraising" | "live-trading" | "failed"

export interface ProjectDetail {
  label: string
  value: string
  highlight?: boolean
}

export interface FundraisingData {
  type: "fundraising"
  progress: number
  funded: string
  raised: string
  target: string
  details: ProjectDetail[]
}

export interface LiveTradingData {
  type: "live-trading"
  milestonesCompleted: number
  milestonesTotal: number
  milestoneProgress: number
  details: ProjectDetail[]
}

export interface FailedData {
  type: "failed"
  message: string
  details: ProjectDetail[]
}

export type ProjectData = FundraisingData | LiveTradingData | FailedData
