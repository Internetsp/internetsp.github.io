import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Internet<span className="text-[#F37B21]">sp</span></h3>
            <p className="mb-4 text-gray-400">Your local authorized AT&T retailer providing fiber internet and wireless services to the community.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#fiber" className="text-gray-400 hover:text-white transition">AT&T Fiber</a></li>
              <li><a href="#wireless" className="text-gray-400 hover:text-white transition">AT&T Wireless</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Business Solutions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Bundle Offers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Accessories</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#contact" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Bill Pay</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Service Status</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Store Locator</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Accessibility</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Sitemap</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Internetserviceproviders (Internetsp). All rights reserved. Authorized AT&T retailer.
            </p>
            <p className="text-gray-400 text-sm text-center">
              AT&T and the AT&T logo are trademarks of AT&T Intellectual Property or AT&T affiliated companies.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
