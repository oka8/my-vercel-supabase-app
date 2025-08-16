import Image from "next/image"
import { memo } from "react"

export const Logo = memo(function Logo() {
  return (
    <div className="flex items-center gap-4">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
        sizes="(max-width: 768px) 120px, 180px"
      />
      <span className="text-2xl font-bold">+</span>
      <div className="text-2xl font-bold text-green-600">Supabase</div>
    </div>
  )
})