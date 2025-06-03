
import { Button } from "@/components/ui/button";
import { Upload, Zap, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Resize Photos
            </span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Professional photo resizing made simple. Batch process, maintain quality, 
            and optimize your images in seconds with our advanced AI-powered tools.
          </p>
          
          <div className="flex justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-12 py-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl border-0">
              <Upload className="mr-3 h-6 w-6" />
              Start Resizing Free
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-purple-500/20">
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
              <span className="text-slate-300 font-medium text-lg">Lightning Fast</span>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-cyan-500/20">
                <Shield className="h-8 w-8 text-cyan-400" />
              </div>
              <span className="text-slate-300 font-medium text-lg">Secure & Private</span>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-pink-500/20">
                <Upload className="h-8 w-8 text-pink-400" />
              </div>
              <span className="text-slate-300 font-medium text-lg">Batch Processing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
