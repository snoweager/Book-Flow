import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { User, Bell } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ full_name: "", phone: "" });
  const [preferences, setPreferences] = useState({
    email_enabled: true,
    sms_enabled: false,
    push_enabled: true,
    booking_confirmations: true,
    booking_cancellations: true,
    booking_reminders: true,
    promotional_offers: false,
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate("/auth");
      } else {
        setUser(user);
        fetchProfile(user.id);
        fetchPreferences(user.id);
      }
    });
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (data) {
      setProfile({ full_name: data.full_name || "", phone: data.phone || "" });
    }
  };

  const fetchPreferences = async (userId: string) => {
    const { data } = await supabase
      .from("notification_preferences")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (data) {
      setPreferences({
        email_enabled: data.email_enabled,
        sms_enabled: data.sms_enabled,
        push_enabled: data.push_enabled,
        booking_confirmations: data.booking_confirmations,
        booking_cancellations: data.booking_cancellations,
        booking_reminders: data.booking_reminders,
        promotional_offers: data.promotional_offers,
      });
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("user_id", user.id);
      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("notification_preferences")
        .update(preferences)
        .eq("user_id", user.id);
      if (error) throw error;
      toast.success("Notification preferences updated");
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
          <h1 className="text-4xl font-bold mb-8">
            My <span className="bg-gradient-hero bg-clip-text text-transparent">Profile</span>
          </h1>

          <div className="grid gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.email || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <Button variant="hero" onClick={handleSaveProfile} disabled={loading}>
                  {loading ? "Saving..." : "Save Profile"}
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Notification Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email">Email Notifications</Label>
                      <Switch
                        id="email"
                        checked={preferences.email_enabled}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, email_enabled: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms">SMS Notifications</Label>
                      <Switch
                        id="sms"
                        checked={preferences.sms_enabled}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, sms_enabled: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push">Push Notifications</Label>
                      <Switch
                        id="push"
                        checked={preferences.push_enabled}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, push_enabled: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="confirmations">Booking Confirmations</Label>
                      <Switch
                        id="confirmations"
                        checked={preferences.booking_confirmations}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, booking_confirmations: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="cancellations">Booking Cancellations</Label>
                      <Switch
                        id="cancellations"
                        checked={preferences.booking_cancellations}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, booking_cancellations: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="reminders">Booking Reminders</Label>
                      <Switch
                        id="reminders"
                        checked={preferences.booking_reminders}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, booking_reminders: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="offers">Promotional Offers</Label>
                      <Switch
                        id="offers"
                        checked={preferences.promotional_offers}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, promotional_offers: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button variant="hero" onClick={handleSavePreferences} disabled={loading}>
                  {loading ? "Saving..." : "Save Preferences"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
