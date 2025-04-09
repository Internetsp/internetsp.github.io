import { Button } from '@/components/ui/button';
import { Check, Smartphone, Wifi, BadgeDollarSign, Briefcase, ChevronRight } from 'lucide-react';

interface IntroStepProps {
  onContinue: () => void;
}

export function IntroStep({ onContinue }: IntroStepProps) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#0055CC] text-white flex items-center justify-center font-semibold text-sm">1</div>
          <span className="text-sm font-medium">Discover</span>
        </div>
        <div className="h-0.5 w-12 bg-gray-200 mx-2"></div>
        <div className="flex items-center justify-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-semibold text-sm">2</div>
          <span className="text-sm font-medium text-gray-400">Calculate</span>
        </div>
        <div className="h-0.5 w-12 bg-gray-200 mx-2"></div>
        <div className="flex items-center justify-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-semibold text-sm">3</div>
          <span className="text-sm font-medium text-gray-400">Get Quote</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0055CC] mb-3">
              Save Up To 70% On Business Communications
            </h1>
            
            <p className="text-gray-600 mb-6">
              While competitors struggle with hidden fees, you'll get premium service at <span className="text-[#FF7A00] font-semibold">a fraction of the cost</span>.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="mt-1 bg-blue-50 rounded-full p-1 mr-3">
                  <Check className="h-4 w-4 text-[#0055CC]" />
                </div>
                <div>
                  <p className="font-medium">Business phone lines from $10/line</p>
                  <p className="text-sm text-gray-500">Unlimited data with mobile hotspot</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 bg-blue-50 rounded-full p-1 mr-3">
                  <Check className="h-4 w-4 text-[#0055CC]" />
                </div>
                <div>
                  <p className="font-medium">Device payoffs up to $1,000/line</p>
                  <p className="text-sm text-gray-500">Let carriers pay to switch your service</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 bg-blue-50 rounded-full p-1 mr-3">
                  <Check className="h-4 w-4 text-[#0055CC]" />
                </div>
                <div>
                  <p className="font-medium">Fiber internet starting at $30/mo</p>
                  <p className="text-sm text-gray-500">Symmetrical speeds with 99.9% reliability</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={onContinue}
              size="lg"
              className="w-full bg-gradient-to-r from-[#FF7A00] to-[#E66C00] hover:from-[#E66C00] hover:to-[#D25C00] text-white font-semibold py-6 rounded-lg transition-all"
            >
              <span>See My Custom Savings Plan</span>
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
            <p className="text-center text-sm text-gray-500 mt-2">Free analysis, no obligation (takes just 2 minutes)</p>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="md:w-1/2">
          <div className="bg-gradient-to-br from-[#0055CC] to-[#003C8F] rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-white text-xl font-bold mb-2">Business Tech Solutions</h3>
              <p className="text-white/80 text-sm mb-6">Premium business services at exclusive rates</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <Smartphone className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-white font-medium text-sm">Business Phone Lines</h4>
                  </div>
                  <p className="text-white/80 text-xs">Never worry about data caps with included mobile hotspot capability</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <Wifi className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-white font-medium text-sm">Fiber Internet</h4>
                  </div>
                  <p className="text-white/80 text-xs">Lightning-fast symmetrical speeds with reliability guarantee</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <BadgeDollarSign className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-white font-medium text-sm">Exclusive Savings</h4>
                  </div>
                  <p className="text-white/80 text-xs">Save up to 70% with our exclusive business packages</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <Briefcase className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-white font-medium text-sm">Business Support</h4>
                  </div>
                  <p className="text-white/80 text-xs">Priority access to specialized business tech advisors</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#003071] p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white/80 text-xs uppercase">Average 2-year savings</p>
                  <p className="text-white text-2xl font-bold">$3,600+</p>
                </div>
                <Button 
                  onClick={onContinue}
                  className="bg-white text-[#0055CC] hover:bg-blue-50"
                >
                  Calculate Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}