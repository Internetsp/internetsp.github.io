import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-3xl font-bold text-[#009FDB]">
              Internet<span className="text-[#F37B21]">sp</span>
            </Link>
            <div className="ml-3 text-xs text-gray-600">Authorized AT&T Retailer</div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="font-medium text-gray-800 hover:text-[#009FDB] transition">Home</a>
            <a href="#fiber" className="font-medium text-gray-800 hover:text-[#009FDB] transition">Fiber Internet</a>
            <a href="#wireless" className="font-medium text-gray-800 hover:text-[#009FDB] transition">Wireless Plans</a>
            <a href="#coverage" className="font-medium text-gray-800 hover:text-[#009FDB] transition">Coverage</a>
            <a href="#contact" className="font-medium text-gray-800 hover:text-[#009FDB] transition">Contact Us</a>
          </nav>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-800 hover:text-[#009FDB] focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="py-4 space-y-4">
              <a 
                href="#home" 
                className="block font-medium text-gray-800 hover:text-[#009FDB] transition"
                onClick={closeMobileMenu}
              >
                Home
              </a>
              <a 
                href="#fiber" 
                className="block font-medium text-gray-800 hover:text-[#009FDB] transition"
                onClick={closeMobileMenu}
              >
                Fiber Internet
              </a>
              <a 
                href="#wireless" 
                className="block font-medium text-gray-800 hover:text-[#009FDB] transition"
                onClick={closeMobileMenu}
              >
                Wireless Plans
              </a>
              <a 
                href="#coverage" 
                className="block font-medium text-gray-800 hover:text-[#009FDB] transition"
                onClick={closeMobileMenu}
              >
                Coverage
              </a>
              <a 
                href="#contact" 
                className="block font-medium text-gray-800 hover:text-[#009FDB] transition"
                onClick={closeMobileMenu}
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
