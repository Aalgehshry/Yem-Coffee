import { Link } from 'react-router-dom';
import { Star, Award, Truck, ArrowRight, Mountain, Leaf } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ProductCard } from '../components/product-card';
import { SectionHeading } from '../components/section-heading';
import { products } from '../data/products';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1687324960664-5a0b9ef76e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxZZW1lbmklMjBjb2ZmZWUlMjBiZWFucyUyMHJvYXN0aW5nfGVufDF8fHx8MTc2NjA0MDQzN3ww&ixlib=rb-4.1.0&q=80&w=1080';

interface TrustBadge {
  Icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Content that used to be written out three times in near-identical JSX blocks
 * now lives in arrays, so a change to the layout is a one-line change.
 */
const TRUST_BADGES: TrustBadge[] = [
  {
    Icon: Award,
    title: 'Premium quality',
    description: 'Handpicked beans from mountain farms',
  },
  {
    Icon: Star,
    title: 'Authentic origin',
    description: "Direct from Yemen's heritage regions",
  },
  {
    Icon: Truck,
    title: 'Fast delivery',
    description: 'Freshly roasted and shipped to you',
  },
];

const HERO_STATS = [
  { value: '600+', label: 'Years of heritage' },
  { value: '2,400m', label: 'Peak growing altitude' },
  { value: '100%', label: 'Single origin' },
];

const REVIEWS = [
  {
    name: 'Sarah Johnson',
    location: 'Portland, OR',
    comment:
      "The Mocha Sanani is absolutely incredible. The flavor complexity is unlike any coffee I've tried before.",
    rating: 5,
  },
  {
    name: 'Michael Chen',
    location: 'Toronto, ON',
    comment:
      'Authentic Yemeni coffee delivered to my door. The Haraaz Reserve is my new favorite!',
    rating: 5,
  },
  {
    name: 'Emma Williams',
    location: 'London, UK',
    comment:
      'Amazing quality and rich heritage. You can taste the tradition in every cup.',
    rating: 5,
  },
];

export function HomePage() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative isolate flex min-h-[560px] items-center overflow-hidden lg:min-h-[640px]">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          // The hero is the largest element on the first screen, so it loads
          // eagerly and at high priority rather than lazily like the grids.
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />

        {/* Two stacked scrims: a horizontal one to anchor the text column and a
            vertical one so the copy stays readable over a busy photo. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-bean/95 via-bean/75 to-bean/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-bean/70 via-transparent to-bean/40"
        />

        <div className="container-page py-20">
          <div className="max-w-2xl text-white">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              <span aria-hidden="true" className="h-px w-10 bg-accent/60" />
              The birthplace of coffee
            </p>

            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl">
              Authentic Yemeni Coffee
            </h1>

            <p className="mt-5 max-w-xl text-pretty text-lg text-white/85 md:text-xl">
              Experience the rich heritage and complex flavors of Yemen's finest
              coffee beans — grown on terraced mountain farms and roasted in
              small batches.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 bg-copper px-7 text-base text-white hover:bg-copper-dark"
              >
                <Link to="/shop">
                  Shop the collection
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>

              {/*
                The old secondary button was `border-white text-primary` — dark
                brown text on a transparent dark background, which was close to
                unreadable. It is now white-on-transparent with a white border.
              */}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-white/70 bg-transparent px-7 text-base text-white hover:bg-white hover:text-bean"
              >
                <Link to="/about">Our story</Link>
              </Button>
            </div>

            <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/20 pt-7">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-semibold text-accent">
                    {stat.value}
                  </dd>
                  <p aria-hidden="true" className="mt-0.5 text-xs uppercase tracking-[0.12em] text-white/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Trust badges */}
      <section className="border-b border-border/50 bg-card py-12">
        <div className="container-page">
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {TRUST_BADGES.map(({ Icon, title, description }) => (
              <li key={title} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Icon className="h-6 w-6 text-bean" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------- Featured products */}
      <section className="py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Featured"
            title="Our most-loved coffees"
            description="Three single origins that show the range of Yemeni coffee, from wild and fruity to deep and spiced."
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 3} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="h-12 px-7">
              <Link to="/shop">
                View all {products.length} coffees
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Origin teaser */}
      <section className="bg-deep py-20 text-deep-foreground">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
              From the terraces
            </p>
            <h2 className="mt-4 text-balance text-3xl sm:text-4xl">
              Grown where coffee began
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-deep-foreground/75">
              Yemeni coffee is still farmed the way it was six centuries ago —
              on hand-built stone terraces, dried whole in the sun, and sorted by
              hand. That is why it tastes like nothing else.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { Icon: Mountain, text: 'Grown between 1,600m and 2,400m' },
                { Icon: Leaf, text: 'Natural sun-dried processing, never washed' },
                { Icon: Award, text: 'Sourced directly from farming families' },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-deep-foreground/10">
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-deep-foreground/85">{text}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="mt-9 h-12 bg-accent px-7 text-base text-bean hover:bg-accent/90"
            >
              <Link to="/about">
                Read our story
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="overflow-hidden rounded-xl">
            <img
              src={products[3].image}
              alt="A terraced Yemeni coffee farm in the mountains"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Reviews */}
      <section className="border-t border-border/50 bg-card py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Reviews"
            title="What our customers say"
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <Card key={review.name} className="border-border/60 bg-background">
                <CardContent className="flex h-full flex-col p-6">
                  <div
                    className="mb-4 flex gap-1"
                    role="img"
                    aria-label={`Rated ${review.rating} out of 5`}
                  >
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-4 w-4 fill-current text-gold"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <blockquote className="flex-1 text-pretty text-sm leading-relaxed text-foreground/80">
                    “{review.comment}”
                  </blockquote>

                  <footer className="mt-5 border-t border-border/60 pt-4">
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </footer>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
