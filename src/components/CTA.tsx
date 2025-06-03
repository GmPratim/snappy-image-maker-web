
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const CTA = () => {
  const features = [
    "No watermarks or limitations",
    "Process unlimited images",
    "All formats supported",
    "24/7 customer support"
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Ready to Get Started?
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-slate-300">
            Join over 50,000 professionals who use PhotoResize daily
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-center md:justify-start space-x-3">
                <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-12 py-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl border-0">
              Start Resizing Now
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>

          <p className="text-sm text-slate-400 mt-6">
            No registration required • Completely free • Start instantly
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
