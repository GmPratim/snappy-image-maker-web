
import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, Globe, TrendingUp } from "lucide-react";

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
      icon: <DollarSign className="h-12 w-12" />,
      title: "Reduce Costs",
      description: "Lower bandwidth costs and improve site performance with optimized images.",
      stat: "60%",
      statLabel: "Cost Reduction"
    },
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Faster Websites",
      description: "Smaller image files mean faster loading times and better user experience.",
      stat: "3x",
      statLabel: "Faster Loading"
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
      title: "Better SEO",
      description: "Google loves fast websites. Optimized images improve your search rankings.",
      stat: "40%",
      statLabel: "SEO Improvement"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose PhotoResize?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of professionals who trust us with their image optimization needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                
                <div className="mb-4">
                  <div className="text-4xl font-bold text-purple-600 mb-1">
                    {benefit.stat}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">
                    {benefit.statLabel}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
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
