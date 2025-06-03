
import { Button } from "@/components/ui/button";
import { Upload, Zap, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Resize Photos
            <span className="block bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-purple-100 leading-relaxed">
            Professional photo resizing made simple. Batch process, maintain quality, 
            and optimize your images in seconds.
          </p>
          
          <div className="flex justify-center mb-12">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50 text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-2xl">
              <Upload className="mr-2 h-5 w-5" />
              Start Resizing Free
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Zap className="h-6 w-6 text-yellow-300" />
              </div>
              <span className="text-purple-100 font-medium">Lightning Fast</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Shield className="h-6 w-6 text-green-300" />
              </div>
              <span className="text-purple-100 font-medium">Secure & Private</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Upload className="h-6 w-6 text-blue-300" />
              </div>
              <span className="text-purple-100 font-medium">Batch Processing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
