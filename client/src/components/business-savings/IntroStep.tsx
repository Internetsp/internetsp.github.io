import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface IntroStepProps {
  onContinue: () => void;
}

export function IntroStep({ onContinue }: IntroStepProps) {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Left side content */}
      <div className="md:w-1/2 pr-0 md:pr-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0055CC] mb-4">
          Small Business Owners: Stop Overpaying on Communication
        </h1>
        
        <p className="text-lg mb-4">
          You could be overpaying <span className="text-[#FF7A00] font-bold">$1,000's every year</span> on phone lines and fiber internet.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">
            See if you qualify for exclusive pricing:
          </h2>
          
          <ul className="space-y-4">
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#0055CC] mr-2 flex-shrink-0" />
              <span>Phone lines as low as <strong>$10/line</strong></span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#0055CC] mr-2 flex-shrink-0" />
              <span>Let carriers <strong>pay off your devices</strong></span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#0055CC] mr-2 flex-shrink-0" />
              <span>Free upgrades to <strong>fastest internet</strong> options</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#0055CC] mr-2 flex-shrink-0" />
              <span>Special pricing for <strong>both business and family</strong></span>
            </li>
          </ul>
        </div>
        
        <Button 
          onClick={onContinue}
          size="lg"
          className="w-full bg-[#FF7A00] hover:bg-[#E66C00] text-white font-medium text-lg py-6"
        >
          Calculate My Savings →
        </Button>
      </div>
      
      {/* Right side - Image grid (placeholder for future images) */}
      <div className="hidden md:block md:w-1/2 bg-[#0055CC] rounded-lg">
        <div className="grid grid-cols-2 gap-4 p-4">
          {/* These could be replaced with actual business-related images */}
          <div className="bg-gray-100 rounded p-4 h-40 flex items-center justify-center text-gray-400">
            <div className="border border-gray-300 w-16 h-16 rounded flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <div className="bg-gray-100 rounded p-4 h-40 flex items-center justify-center text-gray-400">
            <div className="border border-gray-300 w-16 h-16 rounded flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <div className="bg-gray-100 rounded p-4 h-40 flex items-center justify-center text-gray-400">
            <div className="border border-gray-300 w-16 h-16 rounded flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <div className="bg-gray-100 rounded p-4 h-40 flex items-center justify-center text-gray-400">
            <div className="border border-gray-300 w-16 h-16 rounded flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}