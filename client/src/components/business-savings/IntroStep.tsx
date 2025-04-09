import { Button } from '@/components/ui/button';
import { Building2, DollarSign, Zap } from 'lucide-react';

interface IntroStepProps {
  onContinue: () => void;
}

export function IntroStep({ onContinue }: IntroStepProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-6">
        Small Business Owners: Stop Overpaying!
      </h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8 w-full max-w-2xl">
        <p className="text-xl md:text-2xl font-semibold text-center text-blue-800 mb-4">
          Save $1,000's Every Year on Phone Lines and Internet
        </p>
        
        <p className="text-lg text-center mb-4">
          See if you qualify for unadvertised pricing for your business and family
        </p>
        
        <ul className="space-y-4 mb-6">
          <li className="flex items-start">
            <DollarSign className="h-6 w-6 text-green-600 mr-2 flex-shrink-0 mt-1" />
            <span className="text-lg">Phone lines as low as <span className="font-bold">$10/line</span></span>
          </li>
          <li className="flex items-start">
            <Zap className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
            <span className="text-lg">Get upgraded to the <span className="font-bold">fastest internet</span> at no extra cost</span>
          </li>
          <li className="flex items-start">
            <Building2 className="h-6 w-6 text-orange-600 mr-2 flex-shrink-0 mt-1" />
            <span className="text-lg">Let carriers <span className="font-bold">pay off your device balance</span> when you switch</span>
          </li>
        </ul>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-lg font-semibold mb-2">How it works:</p>
        <ol className="text-left inline-block">
          <li className="mb-2 flex items-center">
            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Use our calculator to see your potential savings</span>
          </li>
          <li className="mb-2 flex items-center">
            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Tell us about your business needs</span>
          </li>
          <li className="flex items-center">
            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Get a personalized savings quote</span>
          </li>
        </ol>
      </div>
      
      <Button 
        onClick={onContinue}
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6"
      >
        Start Saving Now
      </Button>
    </div>
  );
}