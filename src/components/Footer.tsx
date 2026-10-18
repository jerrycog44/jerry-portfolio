import { SITE, SOCIALS } from '../data/site'
import SocialIcon from './SocialIcon'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="flex items-center gap-4">
          <img src="/brand/jerrystudios-mark.webp" alt="JerryStudios logo" width={388} height={400} loading="lazy" decoding="async" className="h-10 w-auto" />
          <div>
            <p className="text-lg font-black uppercase tracking-[0.18em]">{SITE.name}</p>
            <p className="text-sm text-muted">{SITE.title}</p>
          </div>
        </div>
        <ul className="flex items-center gap-1">
          {SOCIALS.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} (opens in a new tab)`}
                className="flex h-12 w-12 items-center justify-center text-soft transition-colors hover:text-white"
              >
                <SocialIcon id={s.id} />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted">&copy; {new Date().getFullYear()} Jerry. All rights reserved.</p>
      </div>
    </footer>
  )
}
