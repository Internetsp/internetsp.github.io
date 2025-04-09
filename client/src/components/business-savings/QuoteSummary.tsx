import { Check, CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { BusinessSavingsFormData, InternetOption, PhoneLineOption } from '@/pages/BusinessSavings';

interface QuoteSummaryProps {
  data: Partial<BusinessSavingsFormData>;
}

export function QuoteSummary({ data }: QuoteSummaryProps) {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  // Get display names for packages
  const getInternetDisplayName = (type?: InternetOption): string => {
    if (!type) return 'None';
    
    const speedMap: Record<InternetOption, string> = {
      '10mb-copper': '10 Mbps Copper',
      '50mb-copper': '50 Mbps Copper',
      '300mb-fiber': '300 Mbps Fiber',
      '1000mb-fiber': '1 Gbps Fiber',
      '3000mb-fiber': '3 Gbps Fiber',
      '5000mb-fiber': '5 Gbps Fiber',
    };
    return speedMap[type];
  };
  
  const getPhoneDisplayName = (type?: PhoneLineOption): string => {
    if (!type) return 'None';
    
    const packageMap: Record<PhoneLineOption, string> = {
      'personal-budget': 'Personal Budget',
      'personal-standard': 'Personal Standard',
      'personal-advanced': 'Personal Advanced',
    };
    return packageMap[type];
  };
  
  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
        <Check className="h-8 w-8" />
      </div>
      
      <h2 className="text-2xl font-bold text-center text-blue-900">
        Thank You, {data.firstName}!
      </h2>
      
      <p className="text-lg">
        Your quote request has been successfully submitted. One of our business specialists will contact you shortly to discuss your customized savings plan.
      </p>
      
      <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto my-6 text-left">
        <h3 className="text-lg font-semibold mb-4 text-blue-900">Quote Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span>{data.firstName} {data.lastName}</span>
          </div>
          
          {(data.serviceType === 'internet' || data.serviceType === 'both') && data.internetPackage && (
            <div className="flex justify-between">
              <span className="text-gray-600">Internet:</span>
              <span>{getInternetDisplayName(data.internetPackage.type)} ({data.internetPackage.quantity})</span>
            </div>
          )}
          
          {(data.serviceType === 'phone' || data.serviceType === 'both') && data.phonePackage && (
            <div className="flex justify-between">
              <span className="text-gray-600">Phone Lines:</span>
              <span>{getPhoneDisplayName(data.phonePackage.type)} ({data.phonePackage.quantity})</span>
            </div>
          )}
          
          <div className="pt-2 border-t border-blue-200">
            <div className="flex justify-between font-bold">
              <span>Annual Savings:</span>
              <span className="text-green-600">{formatCurrency(data.estimatedSavings || 0)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
        <div className="flex items-start">
          <CalendarClock className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600">
            A confirmation email has been sent to <strong>{data.email}</strong>. We will contact you within 1 business day to finalize your custom quote.
          </p>
        </div>
      </div>
      
      <Button asChild className="mt-6">
        <Link href="/">
          Return to Homepage
        </Link>
      </Button>
    </div>
  );
}