import { SERVICE_GROUPS } from '../data/site'
import FadeIn from './FadeIn'
import SectionHeading from './SectionHeading'
import ServiceItem from './ServiceItem'

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeading id="services-title" eyebrow="Services" title="Built to serve a purpose." />
        </FadeIn>
        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-20">
          {SERVICE_GROUPS.map((group) => (
            <div key={group.heading}>
              <FadeIn>
                <h3 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">{group.heading}</h3>
                <p className="mt-3 max-w-md font-light text-muted">{group.intro}</p>
              </FadeIn>
              <div className="mt-8">
                {group.items.map((service, i) => (
                  <ServiceItem key={service.title} service={service} delay={i * 0.06} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
