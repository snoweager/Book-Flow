import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Bell, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-booking.jpg";

const Landing = () => {
  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Easy Booking",
      description: "Schedule appointments in seconds with our intuitive interface",
    },
    {
      icon: <Bell className="h-8 w-8 text-accent" />,
      title: "Real-time Notifications",
      description: "Get instant updates via email, SMS, and push notifications",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security",
    },
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: "Lightning Fast",
      description: "Book and manage appointments with zero lag",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Modern booking space"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Book Smarter with{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Advanced Notifications
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of booking management with real-time updates across email, SMS, and push notifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?signup=true">
                <Button size="lg" variant="hero" className="w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Browse Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make booking and managing appointments effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:shadow-glow transition-smooth hover:-translate-y-1">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-hero/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who are managing their bookings smarter
          </p>
          <Link to="/auth?signup=true">
            <Button size="lg" variant="secondary" className="shadow-glow">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
