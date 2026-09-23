import { ShimmerText } from './ShimmerText'

export function NotFound() {
  return (
    <section className="flex h-full items-center justify-center px-5 sm:px-8 lg:px-12">
      <div className="flex max-w-lg flex-col items-center gap-6 text-center">
        <h1 className="text-7xl font-bold leading-[0.95] tracking-tighter sm:text-8xl xl:text-9xl">
          <ShimmerText>404</ShimmerText>
        </h1>
        <p className="text-base leading-relaxed text-neutral-300 sm:text-lg">
          Sorry, this page isn't available.
        </p>
        <a
          href="/"
          className="group relative inline-flex min-h-12 items-center overflow-hidden rounded-lg border border-white/10 bg-secondary px-6 text-base font-medium text-white transition-colors hover:border-white/20"
        >
          <span className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-tertiary ring-1 ring-white/30 transition-transform duration-300 group-hover:scale-[100]" />
            <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
              Back to home
            </span>
          </span>
          <span className="absolute inset-0 z-10 flex translate-x-12 items-center justify-center text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Back to home
          </span>
        </a>
      </div>
    </section>
  )
}
