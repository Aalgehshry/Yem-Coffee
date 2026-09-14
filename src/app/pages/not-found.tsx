import { Link } from 'react-router-dom';
import { Coffee, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

/**
 * 404 page. Unknown routes previously rendered an empty `<main>` with a header
 * and nothing else, which reads as a broken site.
 */
export function NotFoundPage() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sand">
        <Coffee className="h-9 w-9 text-copper" aria-hidden="true" />
      </div>

      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-copper">
        Error 404
      </p>

      <h1 className="mt-3 text-4xl text-primary sm:text-5xl">This cup is empty</h1>

      <p className="mt-4 max-w-md text-pretty text-muted-foreground">
        The page you were looking for has been moved or never existed. The
        coffee, thankfully, is exactly where you left it.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="bg-copper text-white hover:bg-copper-dark">
          <Link to="/shop">
            Browse the collection
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
