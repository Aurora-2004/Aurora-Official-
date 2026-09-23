import { SCRIPT_LOADSTRING } from '../siteConfig'
import { CopyButton } from './CopyButton'
import { ScriptPreview } from './ScriptPreview'
import { ShimmerText } from './ShimmerText'

export function Hero() {
  return (
    <section id="home" className="flex h-full items-center px-5 sm:px-8 lg:px-12">
      <div className="mx-auto grid h-full w-full max-w-[90rem] items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <div className="flex min-w-0 flex-col justify-center gap-6">
          <div>
            <h1 className="text-4xl font-bold leading-[0.95] tracking-tighter sm:text-6xl xl:text-7xl">
              <ShimmerText>Aurora Reborn</ShimmerText>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-300 sm:text-lg">
              Aurora, the best GUI for Lumber Tycoon 2 🌳
            </p>
          </div>
          <code className="block w-full break-all rounded-2xl border border-white/10 bg-tertiary px-5 py-4 font-mono text-sm leading-relaxed text-neutral-100 sm:text-base">
            {SCRIPT_LOADSTRING}
          </code>
          <div>
            <CopyButton text={SCRIPT_LOADSTRING} />
          </div>
        </div>
        <ScriptPreview />
      </div>
    </section>
  )
}
