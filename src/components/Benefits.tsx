
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Globe, Heart, Shield } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: <Clock className="h-12 w-12" />,
      title: "Save 90% Time",
      description: "What used to take hours now takes minutes. Automate your image processing workflow.",
      stat: "90%",
      statLabel: "Time Saved"
    },
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Faster Websites",
      description: "Smaller image files mean faster loading times and better user experience.",
      stat: "3x",
      statLabel: "Faster Loading"
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Easy to Use",
      description: "Intuitive interface that anyone can master in minutes. No technical skills required.",
      stat: "100%",
      statLabel: "User Friendly"
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Secure",
      description: "We never store any of your data. All processing happens locally in your browser.",
      stat: "0%",
      statLabel: "Data Stored"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose PhotoResize?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Join thousands of professionals who trust us with their image optimization needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center border-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-600/50 hover:border-cyan-400/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center text-cyan-300 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-cyan-400/30">
                  {benefit.icon}
                </div>
                
                <div className="mb-4">
                  <div className="text-4xl font-bold text-white mb-1">
                    {benefit.stat}
                  </div>
                  <div className="text-sm text-slate-400 uppercase tracking-wide">
                    {benefit.statLabel}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
