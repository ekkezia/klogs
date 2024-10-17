import { z } from "zod"

export const SmsSchema = z.object({
  _id: z.string(),
  date: z.string(),
  name: z.string(),
  email: z.string(),
  sms: z.string(),
  typoSms: z.string(),
})

export type TSms = z.infer<typeof SmsSchema>

export const SmssSchema = z.array(SmsSchema)

export type TSmss = z.infer<typeof SmssSchema>

export const SmsCountSchema = z.number()

export type TLogsCount = z.infer<typeof SmsCountSchema>

export const SmsInputSchema = z.object({
  name: z.string(),
  email: z.string(),
  date: z.date(),
  sms: z.string(),
  typoSms: z.string(),
})

export type TSmsInput = z.infer<typeof SmsInputSchema>

export type TOptimisticSms = Omit<TSms, "_id" | "date">

export const sanityQueryConfig = (
  type: "count" | "fetchAll" | "fetchBy",
  fetchBy?: string | null,
  fetchByEqualsTo?: string | null
) => {
  let query: string

  const fields = `{
    _id,
    date,
    name,
    email,
    sms,
    typoSms
}`

  switch (type) {
    case "count":
      query = `count(*[_type == "sms"])`
      break
    case "fetchAll":
      query = `*[_type == "sms"]` + fields
      break
    case "fetchBy":
      query = `*[_type == "sms" && ${fetchBy} == "${fetchByEqualsTo}"]` + fields + "[0]"
      break
  }

  return query
}

export const COUNT_QUERY = `count(*[_type == "sms"])`
