import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusIcon, MinusIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { BusinessSavingsFormData, InternetOption, PhoneLineOption, DevicePayoff } from '@/pages/BusinessSavings';

// Pricing data based on AT&T current pricing document
const internetPricing: Record<InternetOption, { marketPrice: number, ourPrice: number }> = {
  'copper': { marketPrice: 80, ourPrice: 60 }, // COPPER (768Kbps - 100Mbps)
  'internet-300': { marketPrice: 75, ourPrice: 30 }, // Internet 300 (Fiber 300)
  'internet-500': { marketPrice: 85, ourPrice: 70 }, // Internet 500 (Fiber 500)
  'internet-1000': { marketPrice: 100, ourPrice: 120 }, // Internet 1000 (Fiber 1 GIG)
  'internet-2000': { marketPrice: 165, ourPrice: 145 }, // Internet 2000 (Fiber 2 GIG)
  'internet-5000': { marketPrice: 265, ourPrice: 245 }, // Internet 5000 (Fiber 5 GIG)
};

const phonePricing: Record<PhoneLineOption, { marketPrice: number, ourPrice: number, byodPrice: number }> = {
  'business-advanced': { marketPrice: 90, ourPrice: 25, byodPrice: 10 },
  'business-premium': { marketPrice: 80, ourPrice: 35, byodPrice: 20 },
};

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface CalculatorProps {
  formData: Partial<BusinessSavingsFormData>;
  onUpdate: (data: Partial<BusinessSavingsFormData>) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function Calculator({ formData, onUpdate, onContinue, onBack }: CalculatorProps) {
  // Track selected services
  const [selectedServices, setSelectedServices] = useState<{ internet: boolean; phone: boolean }>({
    internet: formData.serviceType === 'internet' || formData.serviceType === 'both',
    phone: formData.serviceType === 'phone' || formData.serviceType === 'both',
  });
  
  const [internetType, setInternetType] = useState<InternetOption>(
    (formData.internetPackage?.type as InternetOption) || 'internet-300'
  );
  
  const [internetQuantity, setInternetQuantity] = useState(
    formData.internetPackage?.quantity || 1
  );
  
  const [phoneType, setPhoneType] = useState<PhoneLineOption>(
    (formData.phonePackage?.type as PhoneLineOption) || 'business-advanced'
  );
  
  const [phoneQuantity, setPhoneQuantity] = useState(
    formData.phonePackage?.quantity || 2
  );
  
  const [hasDevices, setHasDevices] = useState(
    formData.phonePackage?.devicePayoff?.hasDevice || false
  );
  
  const [devicePayoff, setDevicePayoff] = useState<DevicePayoff>(
    formData.phonePackage?.devicePayoff || {
      hasDevice: false,
      wantsPayoff: false,
      carrier: '',
      deviceCount: 1,
      balancePerDevice: 300
    }
  );
  
  // Calculate savings based on current selections
  const calculateSavings = () => {
    let totalMarketPrice = 0;
    let totalOurPrice = 0;
    
    // Calculate Internet costs
    if (selectedServices.internet) {
      totalMarketPrice += internetPricing[internetType].marketPrice * internetQuantity;
      totalOurPrice += internetPricing[internetType].ourPrice * internetQuantity;
    }
    
    // Calculate Phone costs
    if (selectedServices.phone) {
      totalMarketPrice += phonePricing[phoneType].marketPrice * phoneQuantity;
      // Use BYOD pricing if the user has no devices to pay off
      const pricePerLine = hasDevices ? phonePricing[phoneType].ourPrice : phonePricing[phoneType].byodPrice;
      totalOurPrice += pricePerLine * phoneQuantity;
    }
    
    // Monthly savings
    const monthlySavings = totalMarketPrice - totalOurPrice;
    
    // Annual savings
    const annualSavings = monthlySavings * 12;
    
    // Two-year savings
    const twoYearSavings = annualSavings * 2;
    
    return {
      currentCost: totalMarketPrice,
      ourCost: totalOurPrice,
      monthlySavings,
      annualSavings,
      twoYearSavings
    };
  };
  
  // Update service type when checkboxes change
  const updateServiceType = () => {
    let serviceType: 'internet' | 'phone' | 'both' = 'both';
    
    if (selectedServices.internet && !selectedServices.phone) {
      serviceType = 'internet';
    } else if (!selectedServices.internet && selectedServices.phone) {
      serviceType = 'phone';
    } else if (!selectedServices.internet && !selectedServices.phone) {
      // Default to 'both' if nothing selected, but enable internet 
      setSelectedServices({ internet: true, phone: false });
      serviceType = 'internet';
    }
    
    return serviceType;
  };
  
  // Update form data when selections change
  useEffect(() => {
    const serviceType = updateServiceType();
    const savings = calculateSavings();
    
    // Update device payoff
    const updatedDevicePayoff: DevicePayoff = {
      ...devicePayoff,
      hasDevice: hasDevices,
    };
    
    let updatedData: Partial<BusinessSavingsFormData> = {
      serviceType,
      estimatedSavings: savings.annualSavings,
    };
    
    if (selectedServices.internet) {
      updatedData.internetPackage = {
        type: internetType,
        quantity: internetQuantity
      };
    }
    
    if (selectedServices.phone) {
      updatedData.phonePackage = {
        type: phoneType,
        quantity: phoneQuantity,
        devicePayoff: updatedDevicePayoff
      };
    }
    
    onUpdate(updatedData);
  }, [
    selectedServices, 
    internetType, 
    internetQuantity, 
    phoneType, 
    phoneQuantity, 
    hasDevices,
    devicePayoff
  ]);
  
  // Get display names based on AT&T current product naming
  const getInternetDisplayName = (type: InternetOption): string => {
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
  
  // Helper function to increment/decrement values
  const adjustQuantity = (value: number, setter: (val: number) => void, min: number, max: number) => {
    setter(Math.max(min, Math.min(max, value)));
  };
  
  const savings = calculateSavings();
  
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
        <div className="h-0.5 flex-grow bg-gray-200 mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold">
            3
          </div>
          <span className="text-xs mt-1 font-medium text-gray-500">Get Your Quote</span>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-[#0055CC]">
        Calculate Your Potential Savings
      </h2>
      
      {/* Service Selection */}
      <div className="mb-6">
        <p className="mb-4">Select the services you're interested in:</p>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="internet-service" 
              checked={selectedServices.internet}
              onCheckedChange={(checked) => 
                setSelectedServices(prev => ({ ...prev, internet: checked === true }))
              }
              className="border-[#0055CC] data-[state=checked]:bg-[#0055CC]"
            />
            <Label htmlFor="internet-service">Internet</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="phone-service" 
              checked={selectedServices.phone}
              onCheckedChange={(checked) => 
                setSelectedServices(prev => ({ ...prev, phone: checked === true }))
              }
              className="border-[#0055CC] data-[state=checked]:bg-[#0055CC]"
            />
            <Label htmlFor="phone-service">Phone Lines</Label>
          </div>
        </div>
      </div>
      
      {/* Internet Options */}
      {selectedServices.internet && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Internet Options</h3>
          
          <div className="mb-4">
            <Label htmlFor="internet-type" className="block mb-2">
              Select your desired internet package:
            </Label>
            <Select 
              value={internetType} 
              onValueChange={(value) => setInternetType(value as InternetOption)}
            >
              <SelectTrigger id="internet-type" className="w-full">
                <SelectValue placeholder="Select Internet Package" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(internetPricing).map((type) => (
                  <SelectItem key={type} value={type}>
                    {getInternetDisplayName(type as InternetOption)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="mb-6">
            <Label htmlFor="internet-quantity" className="block mb-2">
              How many internet connections do you need?
            </Label>
            <div className="flex items-center">
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={() => adjustQuantity(internetQuantity - 1, setInternetQuantity, 1, 10)}
                className="rounded-r-none border-r-0"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <Input
                id="internet-quantity"
                type="number"
                min={1}
                max={10}
                value={internetQuantity}
                onChange={(e) => setInternetQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center rounded-none border-x-0"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={() => adjustQuantity(internetQuantity + 1, setInternetQuantity, 1, 10)}
                className="rounded-l-none border-l-0"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Standard AT&T Rate</h4>
              <p className="text-2xl font-bold">
                {formatCurrency(internetPricing[internetType].marketPrice)}/mo
              </p>
            </div>
            <div className="p-4 border border-[#0055CC] rounded-lg bg-blue-50">
              <h4 className="text-sm font-medium text-[#0055CC] mb-2">Your Exclusive Rate</h4>
              <p className="text-2xl font-bold text-[#0055CC]">
                {formatCurrency(internetPricing[internetType].ourPrice)}/mo
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Phone Line Options */}
      {selectedServices.phone && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Phone Line Options</h3>
          
          <div className="mb-6">
            <Label className="block mb-3">
              Select your desired phone package:
            </Label>
            <RadioGroup 
              value={phoneType} 
              onValueChange={(value) => setPhoneType(value as PhoneLineOption)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className={`border rounded-lg p-4 transition ${phoneType === 'business-advanced' ? 'border-[#0055CC] bg-blue-50' : 'border-gray-200'}`}>
                <RadioGroupItem 
                  value="business-advanced" 
                  id="business-advanced" 
                  className="sr-only" 
                />
                <Label htmlFor="business-advanced" className="block cursor-pointer">
                  <div className="font-medium">AT&T Business Unlimited Advanced</div>
                  <div className="text-sm text-gray-600 mb-3">100GB mobile hotspot per line</div>
                  <div className="text-[#0055CC] font-bold">{hasDevices ? `$${phonePricing['business-advanced'].ourPrice}` : `As low as $${phonePricing['business-advanced'].byodPrice}`}/line</div>
                  <div className="text-xs text-gray-500 mt-1">{hasDevices ? "With device payment" : "With Bring Your Own Device"}</div>
                </Label>
              </div>
              
              <div className={`border rounded-lg p-4 transition ${phoneType === 'business-premium' ? 'border-[#0055CC] bg-blue-50' : 'border-gray-200'}`}>
                <RadioGroupItem 
                  value="business-premium" 
                  id="business-premium" 
                  className="sr-only" 
                />
                <Label htmlFor="business-premium" className="block cursor-pointer">
                  <div className="font-medium">AT&T Business Unlimited Premium</div>
                  <div className="text-sm text-gray-600 mb-3">200GB mobile hotspot per line</div>
                  <div className="text-[#0055CC] font-bold">{hasDevices ? `$${phonePricing['business-premium'].ourPrice}` : `As low as $${phonePricing['business-premium'].byodPrice}`}/line</div>
                  <div className="text-xs text-gray-500 mt-1">{hasDevices ? "With device payment" : "With Bring Your Own Device"}</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="mb-6">
            <Label htmlFor="phone-quantity" className="block mb-2">
              How many phone lines do you need?
            </Label>
            <div className="flex items-center">
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={() => adjustQuantity(phoneQuantity - 1, setPhoneQuantity, 1, 20)}
                className="rounded-r-none border-r-0"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <Input
                id="phone-quantity"
                type="number"
                min={1}
                max={20}
                value={phoneQuantity}
                onChange={(e) => setPhoneQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center rounded-none border-x-0"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={() => adjustQuantity(phoneQuantity + 1, setPhoneQuantity, 1, 20)}
                className="rounded-l-none border-l-0"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="mb-3">Would you like to bring your own device?</p>
            <RadioGroup
              value={!hasDevices ? "yes" : "no"}
              onValueChange={(value) => setHasDevices(value === "no")}
              className="flex space-x-4"
            >
              <div className="flex items-center">
                <RadioGroupItem 
                  value="yes" 
                  id="device-yes" 
                  className="text-[#0055CC] border-[#0055CC]"
                />
                <Label htmlFor="device-yes" className="ml-2">Yes</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="no" 
                  id="device-no" 
                  className="text-[#0055CC] border-[#0055CC]"
                />
                <Label htmlFor="device-no" className="ml-2">No</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Standard AT&T Rate</h4>
              <p className="text-2xl font-bold">
                {formatCurrency(phonePricing[phoneType].marketPrice)}/mo
              </p>
              <p className="text-xs text-gray-500">Monthly per line</p>
            </div>
            <div className="p-4 border border-[#0055CC] rounded-lg bg-blue-50">
              <h4 className="text-sm font-medium text-[#0055CC] mb-2">Your Exclusive Rate</h4>
              <p className="text-2xl font-bold text-[#0055CC]">
                {formatCurrency(hasDevices ? phonePricing[phoneType].ourPrice : phonePricing[phoneType].byodPrice)}/mo
              </p>
              <p className="text-xs text-[#0055CC]">Monthly per line</p>
              <p className="text-xs text-[#0055CC] mt-1">
                {hasDevices ? "With device payment" : "With Bring Your Own Device"}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Savings Summary */}
      {(selectedServices.internet || selectedServices.phone) && (
        <div className="bg-[#0055CC] text-white p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">Your Potential Savings Summary</h3>
          
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <h4 className="text-sm opacity-90 mb-1">Monthly</h4>
              <div className="grid grid-cols-1 gap-1">
                <div className="flex justify-between">
                  <span>Current Estimated Cost:</span>
                  <span className="font-semibold">{formatCurrency(savings.currentCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Your New Cost:</span>
                  <span className="font-semibold">{formatCurrency(savings.ourCost)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/20 font-bold">
                  <span>Monthly Savings:</span>
                  <span>{formatCurrency(savings.monthlySavings)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm opacity-90 mb-1">Annual</h4>
              <div className="grid grid-cols-1 gap-1">
                <div className="flex justify-between">
                  <span>Current Estimated Cost:</span>
                  <span className="font-semibold">{formatCurrency(savings.currentCost * 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Your New Cost:</span>
                  <span className="font-semibold">{formatCurrency(savings.ourCost * 12)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/20 font-bold">
                  <span>Annual Savings:</span>
                  <span>{formatCurrency(savings.annualSavings)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/20">
            <span>Total 2-Year Savings:</span>
            <span>{formatCurrency(savings.twoYearSavings)}</span>
          </div>
        </div>
      )}
      
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Button 
          onClick={onContinue}
          className="bg-[#FF7A00] hover:bg-[#E66C00] text-white"
          disabled={!selectedServices.internet && !selectedServices.phone}
        >
          Get Your Free Quote
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}