export default function Loading() {
  return (
    <div className="fixed inset-0 bg-obsidian flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-2 border-gold/20 border-t-gold animate-spin mx-auto mb-4" />
        <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/40">Loading</span>
      </div>
    </div>
  );
}
