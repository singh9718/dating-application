const TESTIMONIALS = [
  {
    quote: "I used DateFlow to plan our anniversary. She filled the form and I had everything I needed — cuisine, budget, mood. It was the most stress-free planning I've ever done.",
    name: 'Arjun M.',
    role: 'Used for 3rd anniversary',
  },
  {
    quote: "Loved how simple it was. No app to download, just a link. I filled it in 2 minutes and the date was exactly what I wanted.",
    name: 'Priya K.',
    role: 'Partner perspective',
  },
  {
    quote: "The dashboard makes it so easy to see exactly what she submitted. I could start booking immediately. Genius idea.",
    name: 'Rahul S.',
    role: 'Used for surprise date',
  },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-500 mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Loved by couples</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map(({ quote, name, role }) => (
            <figure
              key={name}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col gap-4"
            >
              <blockquote className="text-sm text-muted-foreground leading-relaxed flex-1">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption>
                <p className="font-semibold text-sm text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
