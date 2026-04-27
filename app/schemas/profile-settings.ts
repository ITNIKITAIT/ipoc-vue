import { z } from "zod"

export const profileSettingsSchema = z.object({
  displayName: z
    .string()
    .min(3, "Min 3 characters")
    .max(60, "Max 60 characters"),
  bio: z.string().max(250, "Max 250 characters").optional().or(z.literal("")),
  xHandle: z.string().max(40).optional().or(z.literal("")),
  website: z
    .string()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  github: z.string().max(60).optional().or(z.literal("")),
  showActivityPublicly: z.boolean(),
  milestoneAlerts: z.array(z.boolean()).length(4),
  fundraiseAlerts: z.array(z.boolean()).length(3),
  accountAlerts: z.array(z.boolean()).length(2),
})

export type ProfileSettingsFormValues = z.infer<typeof profileSettingsSchema>
