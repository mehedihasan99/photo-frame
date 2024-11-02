import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <nav className="py-4 md:py-6 border-b">
      <div className="container mx-auto flex items-center justify-between gap-x-6">
        <Link href="/">
          <Image
            className="max-w-[100px] md:max-w-[165px]"
            src="/lws_logo.png"
            width={150}
            height={50}
            alt="Logo"
          />
        </Link>
      </div>
    </nav>
  )
}
