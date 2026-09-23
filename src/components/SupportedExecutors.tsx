import { EXECUTOR_STATUS_URL } from '../siteConfig'

interface ExecutorLink {
  name: string
  href: string
}

const PAID_EXECUTORS: ExecutorLink[] = [
  { name: 'Potassium', href: 'https://www.potassium.pro/' },
  { name: 'Volt', href: 'https://voltbz.net/' },
  { name: 'Seli-Ware', href: 'https://seliware.com/' },
  { name: 'SirHurt', href: 'https://sirhurt.net/' },
]
const FREE_EXECUTORS: ExecutorLink[] = [{ name: 'Madium', href: 'https://getmadium.net/' }]

interface ExecutorGroupProps {
  label: string
  executors: ExecutorLink[]
}

function ExecutorGroup({ label, executors }: ExecutorGroupProps) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">{label}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-3">
        {executors.map((executor) => (
          <a
            key={executor.name}
            href={executor.href}
            target="_blank"
            rel="noopener"
            className="rounded-lg border border-white/10 bg-secondary px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/30"
          >
            {executor.name}
          </a>
        ))}
      </div>
    </div>
  )
}

function ExecutorStatusNote() {
  return (
    <p className="mt-8 text-sm text-neutral-400">
      Check executor status at{' '}
      <a href={EXECUTOR_STATUS_URL} target="_blank" rel="noopener" className="text-white transition hover:text-neutral-300">
        {new URL(EXECUTOR_STATUS_URL).hostname}
      </a>
    </p>
  )
}

export function SupportedExecutors() {
  return (
    <section id="executors" className="flex h-full items-center px-5 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[90rem] text-center">
        <h2 className="text-3xl font-bold text-white">Supported Executors</h2>
        <div className="mt-8 flex flex-col gap-8">
          <ExecutorGroup label="Paid" executors={PAID_EXECUTORS} />
          <ExecutorGroup label="Free" executors={FREE_EXECUTORS} />
        </div>
        <ExecutorStatusNote />
      </div>
    </section>
  )
}
