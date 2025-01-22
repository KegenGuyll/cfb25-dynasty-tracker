import Link from 'next/link'

export default function Home() {
  return (
    <section className="w-full">
      <div className="text-left">
        <h1 className="text-4xl">CFB25 DYNASTY TRACK</h1>
      </div>
      <Link href="/dynasty">Get started now</Link>
    </section>
  )
}
