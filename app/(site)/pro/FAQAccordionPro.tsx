'use client'

import { useState } from 'react'

type Question = {
  question?: string
  reponse?: string
}

export function FAQAccordionPro({ questions }: { questions: Question[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col divide-y divide-zinc-200">
      {questions.map((q, i) => {
        const isOpen = open === i
        return (
          <div key={q.question ?? i} className="py-4">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 text-left"
            >
              <span className="font-black text-zinc-900">{q.question}</span>
              <span className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && (
              <p className="text-zinc-600 mt-2 max-w-xl">{q.reponse}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
