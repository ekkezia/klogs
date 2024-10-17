"use client"

import { TSms } from "@/types/sms-types"
import { randomNumber } from "@/utils/random"
import React from "react"
import { twMerge } from "tailwind-merge"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import { followCursor } from "tippy.js"
import { TOptimisticSms } from "./sms-client"
import { formatDate } from "@/utils/dates"

const ME_EMOJI = ["💋", "🧛🏻‍♀️ ", "🤡", "🐸", "👼🏻", "🍪", "☃️", "🍙", "🍅", "🎱", "🍄", "🐛", "🐠", "🐳", "🦄", "🐝", "🤠"]

const SmsLog: React.FC<{ optimisticSms: TOptimisticSms[] }> = ({ optimisticSms }) => {
  const sortedSms = optimisticSms?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // descending sort

  const senderInfo = (item: TSms) => {
    const randomIndex = randomNumber(0, ME_EMOJI.length - 1)
    const emoji = ME_EMOJI[randomIndex]

    return (
      <>
        <span>
          {emoji} {item.name}
        </span>
        <span className="body3"> 🗓️ {item.date ? formatDate(item.date) : "[PENDING]"}</span>:
      </>
    )
  }
  return (
    <div className="w-full" style={{ transform: "translateY(144px)" }}>
      <h3 className="body1 px-4 text-black">Your Logs...</h3>
      {sortedSms?.map((item) => (
        <div key={item._id}>
          <div className="relative mx-4 block h-line1 overflow-x-auto overflow-y-hidden sm:h-line1-sm">
            <p className="overflow-x body1 absolute left-0 top-0 z-[11] overflow-y-hidden text-primary">
              <span className="text-secondary">{senderInfo(item)}</span>
            </p>
          </div>

          <Tippy
            followCursor={true}
            plugins={[followCursor]}
            theme="custom"
            content={
              <div className="h-fit w-fit shadow">
                <p className="body3 text-primary">{item.typoSms}</p>
              </div>
            }
            onHidden={(instance) => {
              instance.unmount()
            }}
          >
            <div
              className={twMerge(
                "relative mx-4 block h-line1 w-full overflow-x-auto sm:h-line1-sm",
                item.pending ? "opacity-20" : "opacity-100"
              )}
              key={item._id}
            >
              <p className="body1 absolute left-0 top-0 z-[10] text-primary opacity-50">{item.sms}</p>
              <p className="body1 absolute left-0 top-0 z-[11] text-primary">{item.typoSms}</p>
            </div>
          </Tippy>
        </div>
      ))}
    </div>
  )
}

export default SmsLog
