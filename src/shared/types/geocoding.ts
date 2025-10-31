import { z } from "zod";

export const geocodingSchema = z.object({
  results: z
    .array(
      z
        .object({
          id: z.number(),
          name: z.string(),
          latitude: z.number(),
          longitude: z.number(),
          elevation: z.number(),
          feature_code: z.string(),
          country_code: z.string(),
          admin1_id: z.number().optional(),
          admin2_id: z.number().optional(),
          admin3_id: z.number().optional(),
          admin4_id: z.number().optional(),
          timezone: z.string(),
          country_id: z.number(),
          country: z.string(),
          admin1: z.string().optional(),
          admin2: z.string().optional(),
          admin3: z.string().optional(),
          admin4: z.string().optional(),
        })
        .refine(
          (value) =>
            (value.admin1 !== undefined && value.admin1_id !== undefined) ||
            (value.admin1 === undefined && value.admin1_id === undefined),
          {
            error: "admin1 requires admin1_id",
          },
        )
        .refine(
          (value) =>
            (value.admin2 !== undefined && value.admin2_id !== undefined) ||
            (value.admin2 === undefined && value.admin2_id === undefined),
          {
            error: "admin2 requires admin2_id",
          },
        )
        .refine(
          (value) =>
            (value.admin3 !== undefined && value.admin3_id !== undefined) ||
            (value.admin3 === undefined && value.admin3_id === undefined),
          {
            error: "admin3 requires admin3_id",
          },
        )
        .refine(
          (value) =>
            (value.admin4 !== undefined && value.admin4_id !== undefined) ||
            (value.admin4 === undefined && value.admin4_id === undefined),
          {
            error: "admin4 requires admin4_id",
          },
        ),
    )
    .optional(),
  generationtime_ms: z.number(),
});
