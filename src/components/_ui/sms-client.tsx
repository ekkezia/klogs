"use client"

import SmsInput from "@/components/_ui/sms-input"
import SmsLog from "@/components/_ui/sms-log"
import { TSms, TSmss } from "@/types/sms-types"
import React, { useCallback, useEffect, useOptimistic } from "react"

export type TOptimisticSms = TSms & { pending?: boolean }

const SmsClient: React.FC<{ allSms: TSmss }> = ({ allSms }) => {
  const [optimisticSms, addOptimisticSms] = useOptimistic<TSmss, TOptimisticSms>(allSms, (state, newSms) => [
    { ...newSms, pending: true },
    ...state,
  ])

  useEffect(() => {
    console.log("allSms updated:", allSms)
  }, [allSms])

  const handleAddOptimisticSms = useCallback(
    (newSms: TSms) => {
      addOptimisticSms(newSms)
    },
    [addOptimisticSms]
  )

  return (
    <>
      <SmsInput addOptimisticSms={handleAddOptimisticSms} />
      <SmsLog optimisticSms={optimisticSms} />
    </>
  )
}

export default SmsClient
