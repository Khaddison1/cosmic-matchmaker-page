import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
              <Sparkles className="h-4 w-4 text-background" />
            </div>
            <div>
              <p className="font-serif-display text-xl text-gold-gradient leading-none">
                Cosmic Zodiac Connect
              </p>
              <p className="text-xs text-muted-foreground mt-1">Where the stars align hearts</p>
            </div>
          </div>

          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </nav>

          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Cosmic Zodiac Connect
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
