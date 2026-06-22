import { Coffee, Mountain, Heart } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-semibold text-primary">
            Our Story
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Bringing Yemen's ancient coffee heritage to your cup
          </p>
        </div>

        {/* About Content */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1746623691157-c4c7a3bad0c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGNvZmZlZSUyMGZhcm18ZW58MXx8fHwxNzY2MDQwNDM3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Coffee farm"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="mb-4 text-3xl font-semibold text-primary">
                A Legacy of Excellence
              </h2>
              <p className="mb-4 text-foreground/80">
                Yemen is the birthplace of coffee, where the ancient art of coffee cultivation has been perfected over centuries. Our beans come from terraced mountain farms, where traditional methods meet exceptional quality.
              </p>
              <p className="mb-4 text-foreground/80">
                We work directly with Yemeni farmers to bring you the most authentic and premium coffee experience. Each bean is handpicked at peak ripeness and processed using time-honored natural methods.
              </p>
              <p className="text-foreground/80">
                By choosing our coffee, you're not just getting an exceptional product – you're supporting sustainable farming practices and helping preserve Yemen's rich coffee heritage.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-primary text-center">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: '#D4A574' }}>
                  <Coffee className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Authenticity</h3>
                <p className="text-sm text-muted-foreground">
                  Every bean is sourced directly from Yemen's heritage coffee regions, ensuring authentic flavor profiles.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: '#D4A574' }}>
                  <Mountain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Handpicked at elevation, our coffee beans undergo meticulous quality control at every stage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: '#D4A574' }}>
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Sustainability</h3>
                <p className="text-sm text-muted-foreground">
                  We support fair trade practices and sustainable farming methods that benefit local communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Heritage Section */}
        <div className="rounded-lg p-12 text-center" style={{ backgroundColor: '#E8D5B7' }}>
          <h2 className="mb-4 text-3xl font-semibold text-primary">
            The Birthplace of Coffee
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-foreground/80">
            Yemen's coffee history dates back to the 15th century, when Sufi monks first discovered coffee's energizing properties. Today, we continue this legacy by bringing you the finest Yemeni coffee, grown in the same mountainous regions where it all began.
          </p>
        </div>
      </div>
    </div>
  );
}
