import { Link } from 'react-router-dom';
import { Coffee, Mountain, Heart, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { SectionHeading } from '../components/section-heading';

const FARM_IMAGE =
  'https://images.unsplash.com/photo-1746623691157-c4c7a3bad0c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGNvZmZlZSUyMGZhcm18ZW58MXx8fHwxNzY2MDQwNDM3fDA&ixlib=rb-4.1.0&q=80&w=1080';

interface Value {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const VALUES: Value[] = [
  {
    Icon: Coffee,
    title: 'Authenticity',
    description:
      "Every bean is sourced directly from Yemen's heritage coffee regions, ensuring authentic flavor profiles.",
  },
  {
    Icon: Mountain,
    title: 'Quality',
    description:
      'Handpicked at elevation, our coffee beans undergo meticulous quality control at every stage.',
  },
  {
    Icon: Heart,
    title: 'Sustainability',
    description:
      'We support fair trade practices and sustainable farming methods that benefit local communities.',
  },
];

const TIMELINE = [
  {
    period: '15th century',
    text: 'Sufi monks in Yemen brew the first cup of coffee as we know it, to stay awake through night prayers.',
  },
  {
    period: '16th century',
    text: 'The port of Mokha turns Yemen into the centre of the world coffee trade — and gives the mocha its name.',
  },
  {
    period: 'Today',
    text: 'Fewer than a hundred thousand smallholder families keep the terraces alive. We buy from them directly.',
  },
];

export function AboutPage() {
  return (
    <div className="pb-4">
      {/* --------------------------------------------------------------- Hero */}
      <section className="border-b border-border/50 bg-deep py-20 text-deep-foreground">
        <div className="container-page text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            <span aria-hidden="true" className="h-px w-10 bg-accent/60" />
            Since the 15th century
            <span aria-hidden="true" className="h-px w-10 bg-accent/60" />
          </p>

          <h1 className="mt-5 text-balance text-5xl sm:text-6xl">Our story</h1>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-xl text-deep-foreground/75">
            Bringing Yemen's ancient coffee heritage to your cup
          </p>
        </div>
      </section>

      <div className="container-page">
        {/* ------------------------------------------------------------ Legacy */}
        <section className="py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl shadow-[var(--shadow-card)]">
              <img
                src={FARM_IMAGE}
                alt="A terraced Yemeni coffee farm on a mountainside"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div>
              <SectionHeading eyebrow="Our roots" title="A legacy of excellence" />

              <div className="mt-6 space-y-4 text-pretty leading-relaxed text-foreground/80">
                <p>
                  Yemen is the birthplace of coffee, where the ancient art of
                  coffee cultivation has been perfected over centuries. Our beans
                  come from terraced mountain farms, where traditional methods
                  meet exceptional quality.
                </p>
                <p>
                  We work directly with Yemeni farmers to bring you the most
                  authentic and premium coffee experience. Each bean is handpicked
                  at peak ripeness and processed using time-honored natural
                  methods.
                </p>
                <p>
                  By choosing our coffee, you're not just getting an exceptional
                  product – you're supporting sustainable farming practices and
                  helping preserve Yemen's rich coffee heritage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ Values */}
        <section id="values" className="scroll-mt-24 pb-20">
          <SectionHeading
            eyebrow="Our values"
            title="What we stand for"
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map(({ Icon, title, description }) => (
              <Card
                key={title}
                className="border-border/60 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
              >
                <CardContent className="p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                    <Icon className="h-8 w-8 text-bean" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl">{title}</h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- Heritage */}
        <section className="rounded-2xl bg-sand px-6 py-14 sm:px-12">
          <SectionHeading
            eyebrow="Heritage"
            title="The birthplace of coffee"
            align="center"
          />

          <p className="mx-auto mt-5 max-w-3xl text-pretty text-center text-lg leading-relaxed text-foreground/80">
            Yemen's coffee history dates back to the 15th century, when Sufi monks
            first discovered coffee's energizing properties. Today, we continue
            this legacy by bringing you the finest Yemeni coffee, grown in the
            same mountainous regions where it all began.
          </p>

          {/* The heritage claim was a single paragraph; the timeline gives it
              something to stand on. */}
          <ol className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-3">
            {TIMELINE.map((entry) => (
              <li key={entry.period} className="border-t-2 border-copper/40 pt-5">
                <p className="font-display text-lg font-semibold text-copper">
                  {entry.period}
                </p>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-foreground/75">
                  {entry.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------------------- CTA */}
        <section className="py-20 text-center">
          <h2 className="text-balance text-3xl text-primary sm:text-4xl">
            Taste six centuries of tradition
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
            Every bag is roasted to order and shipped within two business days.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-12 bg-copper px-7 text-base text-white hover:bg-copper-dark"
          >
            <Link to="/shop">
              Browse the collection
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
