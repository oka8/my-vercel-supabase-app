import Image from "next/image"

export function Footer() {
  const links = [
    {
      href: "https://nextjs.org/learn",
      icon: "/file.svg",
      alt: "File icon",
      text: "Next.js Learn"
    },
    {
      href: "https://supabase.com/docs/guides/getting-started/quickstarts/nextjs",
      icon: "/window.svg", 
      alt: "Window icon",
      text: "Supabase + Next.js"
    },
    {
      href: "https://vercel.com/templates?framework=next.js",
      icon: "/globe.svg",
      alt: "Globe icon", 
      text: "Vercel Templates"
    }
  ]

  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      {links.map((link, index) => (
        <a
          key={index}
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src={link.icon}
            alt={link.alt}
            width={16}
            height={16}
            loading="lazy"
            sizes="16px"
          />
          {link.text}
        </a>
      ))}
    </footer>
  )
}