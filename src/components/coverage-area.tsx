import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function CoverageArea() {
  const serviceAreas = [
    "Downtown", "Northside", "Westend", "Eastville",
    "South County", "Riverside", "Hilltop", "Meadowbrook"
  ];

  return (
    <section id="coverage" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="text-3xl font-bold mb-6">Service Area Coverage</h2>
            <p className="text-lg text-gray-600 mb-6">
              We proudly serve customers throughout the greater metro area and surrounding communities. Check if your address is eligible for our fiber internet and wireless services.
            </p>
            <Card className="bg-gray-100 mb-6">
              <CardHeader className="pt-6 pb-2">
                <h3 className="text-xl font-bold">Areas We Serve</h3>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-2">
                  {serviceAreas.map((area, index) => (
                    <li key={index} className="flex items-center">
                      <MapPin className="text-[#009FDB] h-4 w-4 mr-2" />
                      {area}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <div>
              <Button 
                className="bg-[#009FDB] text-white hover:bg-[#009FDB]/90 font-bold"
                asChild
              >
                <a href="#contact">Check Your Address</a>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Service area map" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
