interface SectionHeadingProps {
  eyebrow: string
  title: string
  id?: string
  tone?: 'dark' | 'light'
}

export default function SectionHeading({ eyebrow, title, id, tone = 'dark' }: SectionHeadingProps) {
  return (
    <div>
      <p className={`eyebrow ${tone === 'dark' ? 'text-muted' : 'text-neutral-600'}`}>{eyebrow}</p>
      <h2 id={id} className="heading-xl mt-4 font-extrabold uppercase">
        {title}
      </h2>
    </div>
  )
}
