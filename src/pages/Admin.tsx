import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, LogOut, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import StarField from "@/components/StarField";

interface Signup {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    document.title = "Admin · Cosmic Match Waitlist";

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth", { replace: true });
        return;
      }
      setUserEmail(session.user.email ?? "");

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      const admin = !!roleData;
      setIsAdmin(admin);

      if (admin) {
        const { data, error } = await supabase
          .from("waitlist_signups")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) toast.error("Failed to load signups");
        else setSignups((data as Signup[]) ?? []);
      }
      setLoading(false);
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  const handleExport = () => {
    const header = "email,source,created_at\n";
    const rows = signups
      .map((s) => `${s.email},${s.source ?? ""},${s.created_at}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Loading the cosmos...
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-background text-foreground flex items-center justify-center px-6">
        <StarField />
        <div className="relative z-10 max-w-md text-center glass-panel rounded-3xl p-8">
          <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
          <h1 className="font-serif-display text-3xl text-gold-gradient mb-3">Not an admin</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Your account ({userEmail}) is signed in but doesn't have admin access yet.
            Open Lovable Cloud → Database → <code className="text-primary">user_roles</code> and
            insert a row with your user_id and role=<code className="text-primary">admin</code>.
          </p>
          <button
            onClick={handleSignOut}
            className="text-sm text-primary hover:underline"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <StarField />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-[0.3em] mb-2">
              <Sparkles className="h-3 w-3" />
              Cosmic Admin
            </div>
            <h1 className="font-serif-display text-4xl md:text-5xl text-gold-gradient">
              Waitlist Signups
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              disabled={signups.length === 0}
              className="inline-flex items-center gap-2 bg-gradient-gold text-background font-semibold px-5 py-2.5 rounded-xl shadow-gold hover:shadow-gold-strong transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 border border-border bg-card/50 text-foreground px-4 py-2.5 rounded-xl hover:bg-card transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 mb-6 inline-flex items-center gap-3">
          <Users className="h-5 w-5 text-primary" />
          <span className="font-serif-display text-2xl text-gold-gradient">{signups.length}</span>
          <span className="text-sm text-muted-foreground">total signups</span>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden">
          {signups.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              No signups yet. Share your link to start collecting them ✨
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-border">
                  <tr className="text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Source</th>
                    <th className="px-6 py-4">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {signups.map((s) => (
                    <tr key={s.id} className="border-b border-border/50 last:border-0 hover:bg-card/30 transition-colors">
                      <td className="px-6 py-4 text-foreground">{s.email}</td>
                      <td className="px-6 py-4 text-muted-foreground">{s.source ?? "—"}</td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">
                        {new Date(s.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
