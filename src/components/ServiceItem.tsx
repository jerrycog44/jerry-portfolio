import type { Service } from '../data/site'
import FadeIn from './FadeIn'

export default function ServiceItem({ service, delay = 0 }: { service: Service; delay?: number }) {
  const Icon = service.icon
  return (
    <FadeIn delay={delay}>
      <div className="group flex gap-5 border-t border-line py-7 transition-colors duration-300 hover:border-white/50">
        <Icon aria-hidden strokeWidth={1.5} className="mt-1 h-7 w-7 shrink-0 text-soft transition-colors group-hover:text-white" />
        <div>
          <h4 className="text-xl font-bold uppercase tracking-tight">{service.title}</h4>
          <p className="mt-2 max-w-md font-light leading-relaxed text-soft">{service.description}</p>
        </div>
      </div>
    </FadeIn>
  )
}
