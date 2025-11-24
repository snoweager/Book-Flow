import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar as CalendarIcon, Clock, DollarSign } from "lucide-react";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const service = location.state?.service;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        toast.error("Please sign in to book");
        navigate("/auth");
      } else {
        setUser(user);
      }
    });
  }, [navigate]);

  if (!service) {
    navigate("/services");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        service_name: service.name,
        service_description: service.description,
        booking_date: date.toISOString(),
        duration_minutes: service.duration,
        total_amount: service.price,
        notes,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Booking created! Redirecting to payment...");
      navigate("/payment");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      
      <div className="flex-1 py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Complete Your <span className="bg-gradient-hero bg-clip-text text-transparent">Booking</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
                <CardDescription>Review your selected service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2 text-lg font-bold text-primary">
                  <DollarSign className="h-5 w-5" />
                  <span>${service.price}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>Choose your preferred slot</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requirements or preferences..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" variant="hero" className="w-full" disabled={loading || !date}>
                    {loading ? "Processing..." : "Proceed to Payment"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;
