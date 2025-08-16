import { memo } from "react"

export const InstructionList = memo(function InstructionList() {
  return (
    <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
      <li className="mb-2 tracking-[-.01em]">
        Configure your Supabase credentials in{" "}
        <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
          .env.local
        </code>
      </li>
      <li className="tracking-[-.01em]">
        Start building your app with Next.js and Supabase
      </li>
    </ol>
  )
})