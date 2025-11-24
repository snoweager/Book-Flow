import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { toast } from "sonner";

const Services = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const services = [
    {
      id: 1,
      name: "Consultation",
      description: "One-on-one consultation session",
      duration: 60,
      price: 99.99,
    },
    {
      id: 2,
      name: "Workshop",
      description: "Interactive group workshop",
      duration: 120,
      price: 149.99,
    },
    {
      id: 3,
      name: "Quick Session",
      description: "30-minute focused session",
      duration: 30,
      price: 49.99,
    },
  ];

  const handleBookService = (service: typeof services[0]) => {
    if (!user) {
      toast.error("Please sign in to book a service");
      navigate("/auth");
      return;
    }
    navigate("/booking", { state: { service } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      
      <div className="flex-1 py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Our <span className="bg-gradient-hero bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our range of professional services and book your slot
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-glow transition-smooth hover:-translate-y-1">
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-lg font-bold text-primary">
                    <DollarSign className="h-5 w-5" />
                    <span>${service.price}</span>
                  </div>
                  <Button
                    variant="hero"
                    className="w-full"
                    onClick={() => handleBookService(service)}
                  >
                    <Calendar className="h-4 w-4" />
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
