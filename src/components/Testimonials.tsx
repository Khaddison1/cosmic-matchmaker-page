import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "I matched with a Scorpio on my third night. We've been inseparable for six months. The chart reading was spookily accurate.",
    name: "Aria L.",
    sign: "Pisces ♓",
  },
  {
    quote:
      "Finally a dating app that gets it. No more wasting time on incompatible signs — the synastry feature is genuinely magical.",
    name: "Marcus T.",
    sign: "Capricorn ♑",
  },
  {
    quote:
      "Beautiful, intuitive, and the daily horoscope match alerts feel like a love letter from the universe itself.",
    name: "Sienna K.",
    sign: "Leo ♌",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary/80 mb-4">Whispers from the Stars</p>
          <h2 className="font-serif-display text-4xl md:text-5xl text-gold-gradient">
            Souls already aligned
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-panel rounded-2xl p-8 hover:shadow-gold transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-serif-display text-xl text-foreground/90 leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="border-t border-border pt-4 flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-sm text-primary/80">{t.sign}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
