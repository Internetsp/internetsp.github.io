import { IconContainer } from "@/components/ui/icon-container";
import { Card, CardContent } from "@/components/ui/card";
import { Wifi, Smartphone, Headphones } from "lucide-react";

export default function FeaturedServices() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Featured Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <Card className="border-none shadow-md overflow-hidden transition-transform hover:scale-105">
            <IconContainer>
              <Wifi className="text-white w-16 h-16" />
            </IconContainer>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3">AT&T Fiber Internet</h3>
              <p className="text-gray-600 mb-4">Blazing-fast symmetrical speeds up to 5 Gig. Perfect for streaming, gaming, and working from home.</p>
              <a href="#fiber" className="text-[#009FDB] font-medium hover:underline flex items-center">
                Learn more <span className="ml-1">→</span>
              </a>
            </CardContent>
          </Card>
          
          {/* Feature Card 2 */}
          <Card className="border-none shadow-md overflow-hidden transition-transform hover:scale-105">
            <IconContainer color="light-blue">
              <Smartphone className="text-white w-16 h-16" />
            </IconContainer>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3">AT&T Wireless Plans</h3>
              <p className="text-gray-600 mb-4">Unlimited data, talk & text with 5G access. Keep your family connected with our flexible plans.</p>
              <a href="#wireless" className="text-[#009FDB] font-medium hover:underline flex items-center">
                Learn more <span className="ml-1">→</span>
              </a>
            </CardContent>
          </Card>
          
          {/* Feature Card 3 */}
          <Card className="border-none shadow-md overflow-hidden transition-transform hover:scale-105">
            <IconContainer color="orange">
              <Headphones className="text-white w-16 h-16" />
            </IconContainer>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3">Local Support</h3>
              <p className="text-gray-600 mb-4">Get personalized service from experts who live in your community. We're here to help!</p>
              <a href="#contact" className="text-[#009FDB] font-medium hover:underline flex items-center">
                Contact us <span className="ml-1">→</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
