import { Check, ArrowRight, CalendarClock } from 'lucide-react';
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Get display names for packages based on AT&T current product naming
  const getInternetDisplayName = (type?: InternetOption): string => {
    if (!type) return 'None';
    
    const speedMap: Record<InternetOption, string> = {
      'copper': 'COPPER (768Kbps - 100Mbps)',
      'internet-300': 'INTERNET 300 (FIBER 300)',
      'internet-500': 'INTERNET 500 (FIBER 500)',
      'internet-1000': 'INTERNET 1000 (FIBER 1 GIG)',
      'internet-2000': 'INTERNET 2000 (FIBER 2 GIG)',
      'internet-5000': 'INTERNET 5000 (FIBER 5 GIG)',
    };
    return speedMap[type];
  };
  
  const getPhoneDisplayName = (type?: PhoneLineOption): string => {
    if (!type) return 'None';
    
    const packageMap: Record<PhoneLineOption, string> = {
      'business-advanced': 'AT&T Business Unlimited Advanced',
      'business-premium': 'AT&T Business Unlimited Premium',
    };
    return packageMap[type];
  };
  
  // Use savings values directly from the formData
  const getSavingsData = () => {
    // Use the data passed from the Calculator or fallback to calculated values
    // for backward compatibility
    const annualSavings = data.estimatedSavings || 0;
    const monthlySavings = data.monthlySavings || Math.round(annualSavings / 12);
    
    return {
      currentMonthly: data.currentMonthlyCost || monthlySavings * 2,
      ourMonthly: data.newMonthlyCost || monthlySavings,
      monthly: monthlySavings,
      currentAnnual: data.currentAnnualCost || (monthlySavings * 2 * 12),
      ourAnnual: data.newAnnualCost || (monthlySavings * 12),
      annual: annualSavings,
      twoYear: data.twoYearSavings || (annualSavings * 2)
    };
  };
  
  const savings = getSavingsData();
  
  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-[#0055CC] text-white flex items-center justify-center font-bold">
            1
          </div>
          <span className="text-xs mt-1 font-medium">Discover Savings</span>
        </div>
        <div className="h-0.5 flex-grow bg-gray-200 mx-2 relative">
          <div className="absolute inset-y-0 left-0 bg-[#0055CC] w-full"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-[#0055CC] text-white flex items-center justify-center font-bold">
            2
          </div>
          <span className="text-xs mt-1 font-medium">Calculate Savings</span>
        </div>
        <div className="h-0.5 flex-grow bg-gray-200 mx-2 relative">
          <div className="absolute inset-y-0 left-0 bg-[#0055CC] w-full"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-[#0055CC] text-white flex items-center justify-center font-bold">
            3
          </div>
          <span className="text-xs mt-1 font-medium">Get Your Quote</span>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
          <Check className="h-8 w-8" />
        </div>
        
        <h2 className="text-2xl font-bold text-[#0055CC] mb-4">
          Thank You, {data.firstName}!
        </h2>
        
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Your quote request has been successfully submitted. One of our business specialists will contact you shortly to discuss your customized savings plan.
        </p>
      </div>
      
      {/* Savings Summary */}
      <div className="bg-[#0055CC] text-white p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold mb-6">Your Potential Savings Summary</h3>
        
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h4 className="text-sm opacity-90 mb-1">Monthly</h4>
            <div className="grid grid-cols-1 gap-1">
              <div className="flex justify-between">
                <span>Current Estimated Cost:</span>
                <span className="font-semibold">{formatCurrency(savings.currentMonthly)}</span>
              </div>
              <div className="flex justify-between">
                <span>Your New Cost:</span>
                <span className="font-semibold">{formatCurrency(savings.ourMonthly)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/20 font-bold">
                <span>Monthly Savings:</span>
                <span>{formatCurrency(savings.monthly)}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm opacity-90 mb-1">Annual</h4>
            <div className="grid grid-cols-1 gap-1">
              <div className="flex justify-between">
                <span>Current Estimated Cost:</span>
                <span className="font-semibold">{formatCurrency(savings.currentAnnual)}</span>
              </div>
              <div className="flex justify-between">
                <span>Your New Cost:</span>
                <span className="font-semibold">{formatCurrency(savings.ourAnnual)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/20 font-bold">
                <span>Annual Savings:</span>
                <span>{formatCurrency(savings.annual)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/20">
          <span>Total 2-Year Savings:</span>
          <span>{formatCurrency(savings.twoYear)}</span>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Selected Package</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{data.firstName} {data.lastName}</span>
          </div>
          
          {(data.serviceType === 'internet' || data.serviceType === 'both') && data.internetPackage && (
            <div className="flex justify-between">
              <span className="text-gray-600">Internet Package:</span>
              <span className="font-medium">{getInternetDisplayName(data.internetPackage.type)} ({data.internetPackage.quantity})</span>
            </div>
          )}
          
          {(data.serviceType === 'phone' || data.serviceType === 'both') && data.phonePackage && (
            <div className="flex justify-between">
              <span className="text-gray-600">Phone Package:</span>
              <span className="font-medium">{getPhoneDisplayName(data.phonePackage.type)} ({data.phonePackage.quantity} lines)</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600">Contact Phone:</span>
            <span className="font-medium">{data.phoneNumber}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{data.email}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <CalendarClock className="h-5 w-5 text-[#0055CC] mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-gray-700">
            A confirmation email has been sent to <strong>{data.email}</strong>. We will contact you within 1 business day to finalize your custom quote.
          </p>
        </div>
      </div>
      
      <div className="text-center pt-4">
        <Button 
          asChild 
          className="bg-[#FF7A00] hover:bg-[#E66C00] text-white h-12 px-6"
        >
          <Link href="/">
            Return to Homepage
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}