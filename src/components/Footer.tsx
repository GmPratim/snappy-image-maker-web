
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              PhotoResize
            </h3>
            <p className="text-gray-400 mb-4 max-w-md">
              The most powerful and user-friendly photo resizing tool for professionals and teams.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors cursor-pointer">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors cursor-pointer">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors cursor-pointer">
                <span className="text-sm font-bold">in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PhotoResize. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
