import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { wirelessPlans } from "@/data/plans";

export default function WirelessPlans() {
  return (
    <section id="wireless" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-4">AT&T Wireless Plans</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Stay connected with unlimited talk, text and data on America's most reliable 5G network.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {wirelessPlans.map((plan) => (
            <Card 
              key={plan.id}
              className={`border border-gray-200 hover:border-[#009FDB] transition-all duration-300 ${
                plan.popular ? 'relative transform md:scale-105 z-10' : ''
              }`}
            >
              {plan.popular && (
                <Badge 
                  className="absolute top-0 right-0 bg-[#F37B21] text-white font-bold px-3 py-1 rounded-bl-lg"
                >
                  MOST POPULAR
                </Badge>
              )}
              <CardHeader className="bg-[#00A8E0] p-6 text-white text-center">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-lg opacity-90">{plan.type}</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-lg text-gray-600 self-end ml-1 mb-1">/mo per line</span>
                </div>
                <p className="text-sm text-center text-gray-600 mb-6">{plan.description}</p>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="text-[#009FDB] h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full font-bold ${
                    plan.popular 
                      ? 'bg-[#F37B21] hover:bg-[#F37B21]/90 text-white' 
                      : 'bg-[#009FDB] hover:bg-[#009FDB]/90 text-white'
                  }`}
                  asChild
                >
                  <a href="#contact">Learn More</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10 text-gray-600">
          <p className="text-sm">Prices shown require AutoPay & paperless billing. Additional fees, taxes & restrictions apply. After 22GB, AT&T may temporarily slow data speeds if the network is busy.</p>
        </div>
      </div>
    </section>
  );
}
