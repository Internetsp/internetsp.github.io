import { Button } from '@/components/ui/button';
import { Check, Smartphone, Wifi, Globe, Building2, BadgeDollarSign, Briefcase, BookCheck, WifiOff } from 'lucide-react';

interface IntroStepProps {
  onContinue: () => void;
}

export function IntroStep({ onContinue }: IntroStepProps) {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Left side content */}
      <div className="md:w-1/2 pr-0 md:pr-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0055CC] mb-4">
          Small Business Owners: Save Up To 70% On Communication Costs
        </h1>
        
        <p className="text-base mb-4">
          Unlock unadvertised offers and enjoy premium communication at <span className="text-[#FF7A00] font-bold">a fraction of the cost</span>.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">
            See if you qualify for exclusive pricing:
          </h2>
          
          <ul className="space-y-4">
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#0055CC] mr-2 flex-shrink-0" />
              <span>Business phone lines as low as <strong>$10/line</strong></span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#0055CC] mr-2 flex-shrink-0" />
              <span>Let carriers <strong>pay off your devices</strong></span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#0055CC] mr-2 flex-shrink-0" />
              <span>Free upgrades to <strong>fiber internet</strong> options</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#0055CC] mr-2 flex-shrink-0" />
              <span>Special pricing for <strong>both your business and family</strong></span>
            </li>
          </ul>
        </div>
        
        {/* Mobile Feature Grid (visible only on mobile) */}
        <div className="md:hidden bg-gradient-to-br from-[#0055CC] to-[#003C8F] rounded-lg p-4 mb-6">
          <h3 className="text-white text-xl font-bold mb-4">Business Tech Solutions</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center text-center">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-white font-semibold text-sm">Business Phones</h4>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center text-center">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <Wifi className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-white font-semibold text-sm">Fiber Internet</h4>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={onContinue}
          size="lg"
          className="w-full bg-gradient-to-br from-[#FF7A00] to-[#E66C00] hover:from-[#E66C00] hover:to-[#D25C00] text-white font-bold text-lg py-6 shadow-md"
        >
          See My Custom Savings Plan →
        </Button>
        <p className="text-center text-sm text-gray-500 mt-2">Free analysis, no obligation (takes just 2 minutes)</p>
      </div>
      
      {/* Right side - Feature Grid (visible only on desktop) */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#0055CC] to-[#003C8F] rounded-lg p-6">
        <h3 className="text-white text-xl font-bold mb-6">Business Tech Solutions</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 flex flex-col items-center text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Business Phone Lines</h4>
            <p className="text-white/80 text-sm">Never worry about data caps again + included mobile hotspot keeps you connected anywhere</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 flex flex-col items-center text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
              <Wifi className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Fiber Internet</h4>
            <p className="text-white/80 text-sm">Lightning-fast symmetrical speeds (same up/down) with 99.9% reliability guarantee</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 flex flex-col items-center text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
              <BadgeDollarSign className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Exclusive Savings</h4>
            <p className="text-white/80 text-sm">Save up to 70% off standard rates with our exclusive small business packages</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 flex flex-col items-center text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Business Support</h4>
            <p className="text-white/80 text-sm">Priority support with direct access to specialized business tech advisors</p>
          </div>
        </div>
      </div>
    </div>
  );
}