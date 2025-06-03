
import { Card, CardContent } from "@/components/ui/card";
import { Crop, Palette, Smartphone } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Crop className="h-8 w-8" />,
      title: "Smart Resizing",
      description: "Intelligent algorithms maintain image quality while reducing file size. Perfect for web optimization."
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Format Support",
      description: "Support for all major formats including JPEG, PNG, WebP, and AVIF for maximum compatibility."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Optimized",
      description: "Resize images on any device. Our responsive design works perfectly on desktop, tablet, and mobile."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Everything you need to resize, optimize, and manage your images professionally
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-600/50 hover:border-purple-400/50 transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl flex items-center justify-center text-purple-300 mb-6 group-hover:scale-110 transition-transform duration-300 border border-purple-400/30">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
