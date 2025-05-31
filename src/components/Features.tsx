
import { Card, CardContent } from "@/components/ui/card";
import { Crop, Download, Palette, Settings, Smartphone, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Crop className="h-8 w-8" />,
      title: "Smart Resizing",
      description: "Intelligent algorithms maintain image quality while reducing file size. Perfect for web optimization."
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Batch Processing",
      description: "Upload and resize hundreds of photos at once. Save time with our powerful batch processing tools."
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Format Support",
      description: "Support for all major formats including JPEG, PNG, WebP, and AVIF for maximum compatibility."
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Custom Presets",
      description: "Create and save custom resize presets for social media, websites, and print requirements."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Optimized",
      description: "Resize images on any device. Our responsive design works perfectly on desktop, tablet, and mobile."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Share presets and collaborate with team members. Perfect for agencies and creative teams."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to resize, optimize, and manage your images professionally
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
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
