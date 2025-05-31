
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
    <section className="py-24 bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">
            Join over 50,000 professionals who use PhotoResize daily
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-center md:justify-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                <span className="text-purple-100">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50 text-lg px-10 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-2xl">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-900 text-lg px-10 py-4 rounded-full font-semibold transition-all duration-300">
              View Pricing
            </Button>
          </div>

          <p className="text-sm text-purple-200 mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
