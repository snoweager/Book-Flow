import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, X } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const Bookings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate("/auth");
      } else {
        setUser(user);
        fetchBookings(user.id);
      }
    });
  }, [navigate]);

  const fetchBookings = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", userId)
        .order("booking_date", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", bookingId);

      if (error) throw error;
      toast.success("Booking cancelled");
      if (user) fetchBookings(user.id);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      
      <div className="flex-1 py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">
            My <span className="bg-gradient-hero bg-clip-text text-transparent">Bookings</span>
          </h1>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : bookings.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                <p className="text-muted-foreground mb-6">Start by browsing our services</p>
                <Button variant="hero" onClick={() => navigate("/services")}>
                  Browse Services
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="shadow-card hover:shadow-glow transition-smooth">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{booking.service_name}</CardTitle>
                        <CardDescription>{booking.service_description}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{format(new Date(booking.booking_date), "PPP")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.duration_minutes} min</span>
                      </div>
                    </div>
                    {booking.notes && (
                      <p className="text-sm text-muted-foreground">{booking.notes}</p>
                    )}
                    {booking.status === "pending" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancel(booking.id)}
                      >
                        <X className="h-4 w-4" />
                        Cancel Booking
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Bookings;
