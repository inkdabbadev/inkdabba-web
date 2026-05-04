import Link from "next/link";
import Navigation from "@/components/global/Navigation";

export default function NotFound() {
  return (
    <div data-nav-theme="light" className="relative min-h-screen overflow-hidden bg-paper text-ink">

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,102,91,0.16),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.45),transparent_42%,rgba(8,9,12,0.04)_100%)]" />
        <div className="absolute left-[-10rem] top-[10rem] h-[24rem] w-[24rem] rounded-full bg-[#F9665B]/14 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-6rem] h-[22rem] w-[22rem] rounded-full bg-black/8 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] items-center px-6 pb-16 pt-28 md:px-8">
        <section className="grid w-full gap-12 rounded-[2.2rem] border border-black/8 bg-white/70 p-8 shadow-[0_40px_120px_-70px_rgba(17,18,20,0.38)] backdrop-blur md:p-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end">
          <div className="max-w-[44rem]">
            <p className="brand-kicker text-ink/45">Page not found</p>
            <h1 className="brand-display mt-5 text-[clamp(3.6rem,9vw,7rem)] text-ink">
              404
            </h1>
            <p className="brand-display mt-3 text-[clamp(2rem,4.6vw,4.4rem)] text-ink">
              Wrong turn.
            </p>
            <p className="brand-body-copy mt-5 max-w-[34rem] text-ink/62">
              The page you asked for does not live here anymore, or it never existed in the
              first place. The rest of the studio is still ready to explore.
            </p>
          </div>

          <div className="rounded-[1.8rem] border border-black/8 bg-paper-soft p-5 md:p-6">
            <p className="brand-kicker text-ink/42">Try one of these</p>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/"
                className="rounded-[1.2rem] border border-black/10 bg-white px-4 py-3 font-body text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20"
              >
                Go back home
              </Link>
              <Link
                href="/work"
                className="rounded-[1.2rem] border border-black/10 bg-white px-4 py-3 font-body text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20"
              >
                Browse the work
              </Link>
              <Link
                href="/contact"
                className="rounded-[1.2rem] bg-ink px-4 py-3 font-body text-sm font-semibold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
              >
                Start a project
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
