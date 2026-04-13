import { z } from "zod"

export const teamMemberSchema = z.object({
  name: z.string().min(3, "Min 3 characters").max(60, "Max 60 characters"),
  role: z.string().min(3, "Min 3 characters").max(60, "Max 60 characters"),
  bio: z.string().max(100, "Max 100 characters").optional(),
  links: z.string().optional(),
  image: z.any().optional(),
})

export const step1Schema = z.object({
  projectName: z
    .string()
    .min(3, "Min 3 characters")
    .max(60, "Max 60 characters"),
  tagline: z.string().max(32, "Max 32 characters").optional(),
  tokenSymbol: z.string().optional(),
  projectImage: z.any().optional(),
  links: z.object({
    twitter: z.string().optional(),
    website: z.string().optional(),
    telegram: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }),
  overview: z.string().max(1000, "Max 1,000 characters"),
  categories: z.array(z.string()).max(3, "Select up to 3 categories"),
  teamMembers: z.array(teamMemberSchema).min(1, "Add at least one team member"),
})

export type Step1FormValues = z.infer<typeof step1Schema>
export type TeamMember = z.infer<typeof teamMemberSchema>

export const step2Schema = z.object({
  fundingGoal: z.number().positive("Must be a positive number"),
  raiseDeadline: z.string().min(1, "Required"),
  investorVesting: z.enum([
    "none",
    "6m",
    "6m_wait_12m",
    "12m_wait_24m",
    "custom",
  ]),
  teamVesting: z.enum(["6m_wait_12m", "12m_wait_24m", "custom"]),
})

export type Step2FormValues = z.infer<typeof step2Schema>

export const milestoneSchema = z.object({
  name: z.string().max(100).optional(),
  description: z.string().max(1000).optional(),
  deliverable: z.string().max(500).optional(),
  unlockAmount: z.number(),
  pctOfTotal: z.number(),
  deadline: z.string(),
  link: z.string().optional(),
  attachments: z
    .array(z.object({ name: z.string(), type: z.string() }))
    .optional(),
})

export const step3Schema = z.object({
  mode: z.enum(["automatic", "manual"]),
  timeline: z.enum(["3m", "6m"]).optional(),
  milestones: z.array(milestoneSchema).min(1).max(5),
})

export type Step3FormValues = z.infer<typeof step3Schema>
export type MilestoneValue = z.infer<typeof milestoneSchema>
