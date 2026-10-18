import { SITE, TOOLS } from '../data/site'
import FadeIn from './FadeIn'
import SectionHeading from './SectionHeading'

const worked = ['The CV School', 'JerryStudios', 'SharpWork', 'OrderFlow']

function ToolList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h3 className="eyebrow text-neutral-600">{label}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-md border border-ink/25 px-3 py-2 text-sm font-medium">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="on-light bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto grid w-full max-w-[1800px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <FadeIn className="lg:col-span-5">
          <SectionHeading id="about-title" eyebrow="About Me" title={SITE.philosophy} tone="light" />
          <dl className="mt-12 grid max-w-sm grid-cols-2 gap-6 border-t border-ink/15 pt-6">
            <div>
              <dt className="eyebrow text-neutral-600">Graphics design</dt>
              <dd className="mt-2 text-4xl font-extrabold">2 years</dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-600">Web development</dt>
              <dd className="mt-2 text-4xl font-extrabold">1 year</dd>
            </div>
          </dl>
        </FadeIn>

        <div className="lg:col-span-6 lg:col-start-7">
          <FadeIn delay={0.1}>
            <div className="space-y-6 text-lg font-light leading-relaxed text-neutral-800 sm:text-xl">
              <p>I&rsquo;m Jerry, a graphics designer and web developer focused on creating work that communicates effectively.</p>
              <p>My approach is simple: communication comes first, aesthetics second.</p>
              <p>
                Whether I&rsquo;m designing a flyer or developing a website, I make sure the final result serves its
                purpose, delivers the right message, and gives its audience a clear experience.
              </p>
              <p>I combine visual design with practical development to help ideas become effective digital experiences.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-14 grid gap-10 border-t border-ink/15 pt-10 sm:grid-cols-2">
              <ToolList label="Design tools" items={TOOLS.design} />
              <ToolList label="Development tools" items={TOOLS.development} />
            </div>
            <div className="mt-10 border-t border-ink/15 pt-10">
              <h3 className="eyebrow text-neutral-600">Brands and organisations I&rsquo;ve worked with</h3>
              <p className="mt-4 text-lg font-medium">{worked.join(' · ')}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
