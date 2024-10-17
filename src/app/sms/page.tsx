import LinesBackground from "@/components/_ui/lines-background"
import SmsClient from "@/components/_ui/sms-client"
import fetchAllSms from "@/lib/data/fetch-all-sms"
import React from "react"

const SmsPage: React.FC = async () => {
  const allSms = await fetchAllSms()

  return (
    <div className="relative">
      <LinesBackground className="h-line1 sm:h-line1-sm" />

      <div className="w-full">
        <SmsClient allSms={allSms} />
      </div>
    </div>
  )
}

export default SmsPage
