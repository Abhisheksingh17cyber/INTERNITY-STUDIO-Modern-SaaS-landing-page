import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-8xl md:text-9xl text-gold/10 mb-4">404</h1>
        <h2 className="font-display text-2xl text-gold uppercase tracking-wider mb-4">Page Not Found</h2>
        <p className="font-body text-silver/40 mb-8 max-w-md mx-auto">
          The page you are looking for has been moved, removed, or does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex h-12 px-10 bg-gold text-obsidian font-body text-sm font-semibold tracking-widest uppercase items-center hover:bg-gold/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}
