"use client"

import { TSms } from "@/types/sms-types"
import React, { startTransition, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { randomNumber } from "@/utils/random"
import { formatDateSanity } from "@/utils/dates"
import postSms from "@/lib/post/post-sms"

const alpha = "abcdefghijklmnopqrstuvwxyz"
const VOWELS = ["a", "e", "i", "o", "u"]
const ALPHABETS = alpha.split("")
const MAX_CHAR_NUM = 80

const randomifyText = (text: string) => {
  let newText = ""
  const array = text.split("")
  for (const alphabet of array) {
    if (VOWELS.includes(alphabet)) {
      const idx = ALPHABETS.indexOf(alphabet)
      newText += VOWELS[(idx + randomNumber(0, 4)) % VOWELS.length]
    } else {
      newText += alphabet
    }
  }
  return newText
}

const SmsInput: React.FC<{ addOptimisticSms: (newSms: TSms) => void }> = ({ addOptimisticSms }) => {
  const [sms, setSms] = useState("")
  const [typoSms, setTypoSms] = useState("")
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (formData: FormData) => {
    const newSms = {
      _id: "",
      date: "",
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      sms: sms,
      typoSms: typoSms,
    }

    startTransition(() => {
      setLoading(true)
      console.log(formatDateSanity(new Date(Date.now())))
      addOptimisticSms(newSms)
    })

    await postSms(sms, typoSms, formData)
      .then(() => {
        setLoading(false)
        if (formRef.current) {
          formRef.current.reset()
        }
        console.log("[Client] form is successfully submitted")
      })
      .catch((error) => {
        setLoading(false)
        console.error("[Client] Error submitting SMS:", error)
      })
  }

  return (
    <form action={handleSubmit} ref={formRef}>
      <div className="w-full">
        <div className="w-full">
          <label className="body1 px-4">🫵</label>
          <input
            name="name"
            className="body1 bg-transparent px-4 placeholder:text-slate-400"
            placeholder="Name/IG/anything!"
          ></input>
        </div>
        <div className="w-full">
          <label className="body1 px-4">📧</label>
          <input
            name="email"
            className="body1 bg-transparent px-4 placeholder:text-slate-400"
            placeholder="Email"
          ></input>
        </div>

        {/* Input Container */}
        <div className="relative cursor-text">
          {/* Decoy Input to display */}
          <div
            className="expandable-textarea body1 absolute z-[11] w-full resize-none bg-transparent px-4 text-primary opacity-70"
            role="textbox"
            ref={inputRef}
            contentEditable
            onInput={(e) => {
              const target = e.target as HTMLElement
              if (target.innerText.length > MAX_CHAR_NUM) {
                e.preventDefault()
              } else {
                setSms(target.innerText)
                setTypoSms(randomifyText(target.innerText))
              }
            }}
            onKeyDown={(e) => {
              const target = e.currentTarget as HTMLElement
              const inputText = target.innerText

              if (inputText.length >= MAX_CHAR_NUM && e.key !== "Backspace") {
                e.preventDefault()
              }
            }}
            onBlur={(e) => {
              const target = e.target as HTMLElement
              setSms(target.innerText)
            }}
          />

          {/* Actual Input */}
          <div className={twMerge("pointer-events-auto absolute w-full max-w-full")}>
            <p className={twMerge("body1 z-[10] break-words px-4 text-primary opacity-100")}>
              {sms ? typoSms : "Leave me your message"}
            </p>

            {/* Container for Max Character Count and Button */}
            {/* Max Character */}
            {sms.length > 0 && (
              <span className="body4 absolute bottom-0 left-0 z-[11] w-fit text-ellipsis bg-secondary px-1 text-center text-white backdrop-opacity-50 sm:body3">
                {sms.length}/{MAX_CHAR_NUM} 🖍️
              </span>
            )}

            {/* Submit Button */}
            {sms.length > 0 && (
              <button
                type="submit"
                className="body2 absolute bottom-0 right-0 z-[11] h-line1 w-fit border border-primary bg-primary px-4 text-secondary sm:body1 hover:bg-transparent disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-50 sm:h-line1-sm"
                disabled={sms === ""}
              >
                {loading ? "⌛️ Loading..." : "💌 Send"}
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

export default SmsInput
