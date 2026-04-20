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

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <StarField />
      <FloatingParticles />

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-primary backdrop-blur-sm"
        >
          <Sparkles className="h-3 w-3" />
          <span>Cosmic Connections Await</span>
          <Star className="h-3 w-3" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif-display text-5xl leading-tight text-gold-gradient md:text-7xl lg:text-8xl"
        >
          Find Your <br />
          Cosmic Match
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
        >
          Where ancient astrology meets modern connection. Discover love written in the stars.
        </motion.p>

        <div className="mt-10 w-full max-w-md">
          <ZodiacWheel />
        </div>
      </section>

      <Stats />
      <Footer />
    </div>
  );
}