import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import StarField from "@/components/StarField";
import FloatingParticles from "@/components/FloatingParticles";
import ZodiacWheel from "@/components/ZodiacWheel";
import Stats from "@/components/Stats";

import Footer from "@/components/Footer";

export default function Home() {
  // ——— Original logic preserved exactly ———
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const joinWaitlist = async () => {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage("You're on the waitlist!");
      setEmail("");
    } else {
      setMessage("Error. Try again.");
    }
  };
  // ————————————————————————————————————————

  const isSuccess = message === "You're on the waitlist!";
  const isError = message === "Error. Try again.";

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Cosmic background layers */}
      <div className="fixed inset-0 bg-cosmic-radial pointer-events-none" aria-hidden="true" />
      <StarField count={160} />
      <FloatingParticles count={18} />

      {/* Hero */}
      <header className="relative z-10 px-6 pt-10 pb-6 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <Sparkles className="h-5 w-5 text-background" />
          </div>
          <span className="font-serif-display text-2xl text-gold-gradient">CosmicMatch</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 glass-panel rounded-full px-4 py-2">
          <Star className="h-3.5 w-3.5 text-primary fill-primary" />
          <span className="text-xs text-muted-foreground tracking-wider uppercase">Early access open</span>
        </div>
      </header>

      <main className="relative z-10">
        <section className="relative px-6 pt-8 pb-24 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Copy + form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-1.5 mb-6"
              >
                <span className="h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  CosmicMatch Waitlist
                </span>
              </motion.div>

              <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6">
                Find Your{" "}
                <span className="text-gold-gradient italic">Cosmic Match</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Zodiac-powered connections written in the stars. Join the waitlist and be
                among the first to discover love aligned with the cosmos.
              </p>

              {/* Waitlist form — original logic, restyled */}
              <div className="w-full max-w-xl mx-auto lg:mx-0">
                <div className="glass-panel rounded-2xl p-2 flex flex-col sm:flex-row gap-2 focus-within:shadow-gold transition-shadow duration-500">
                  <input
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address"
                    className="flex-1 bg-transparent px-5 py-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none rounded-xl"
                  />
                  <button
                    onClick={joinWaitlist}
                    className="relative overflow-hidden group bg-gradient-gold text-background font-semibold px-7 py-4 rounded-xl shadow-gold hover:shadow-gold-strong transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      aria-hidden="true"
                    />
                    <Sparkles className="h-4 w-4 relative" />
                    <span className="relative">Join</span>
                  </button>
                </div>

                {message && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 text-sm font-medium ${
                      isSuccess
                        ? "text-gold-gradient"
                        : isError
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {isSuccess && "✨ "}
                    {message}
                  </motion.p>
                )}

                <p className="text-xs text-muted-foreground/70 mt-4 text-center lg:text-left">
                  Early access · No spam · Unsubscribe anytime
                </p>
              </div>
            </motion.div>

            {/* Zodiac wheel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
            >
              <ZodiacWheel />
            </motion.div>
          </div>
        </section>

        <Stats />
      </main>

      <Footer />
    </div>
  );
}
