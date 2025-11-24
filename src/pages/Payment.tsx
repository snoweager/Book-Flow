import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CreditCard, CheckCircle } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate("/auth");
      } else {
        setUser(user);
      }
    });
  }, [navigate]);

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success("Payment successful! Booking confirmed.");
      navigate("/bookings");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      
      <div className="flex-1 py-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Secure <span className="bg-gradient-hero bg-clip-text text-transparent">Payment</span>
          </h1>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
              <CardDescription>Complete your booking payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary/50 p-6 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Secure Payment Processing</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your payment information is encrypted and secure
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Payment Method</p>
                  <p className="font-semibold">Demo Payment (Development Mode)</p>
                </div>

                <Button
                  variant="hero"
                  className="w-full"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? "Processing..." : "Complete Payment"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  You'll receive confirmation via email, SMS, and push notification
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
