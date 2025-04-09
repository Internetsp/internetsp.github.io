import { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { CheckIcon, WifiIcon, PhoneIcon, NetworkIcon } from 'lucide-react';
import { BusinessSavingsFormData, InternetOption, PhoneLineOption, DevicePayoff } from '@/pages/BusinessSavings';

// Pricing data
const internetPricing: Record<InternetOption, { marketPrice: number, ourPrice: number }> = {
  '10mb-copper': { marketPrice: 89.99, ourPrice: 49.99 },
  '50mb-copper': { marketPrice: 119.99, ourPrice: 69.99 },
  '300mb-fiber': { marketPrice: 149.99, ourPrice: 89.99 },
  '1000mb-fiber': { marketPrice: 189.99, ourPrice: 99.99 },
  '3000mb-fiber': { marketPrice: 299.99, ourPrice: 149.99 },
  '5000mb-fiber': { marketPrice: 399.99, ourPrice: 199.99 },
};

const phonePricing: Record<PhoneLineOption, { marketPrice: number, ourPrice: number }> = {
  'personal-budget': { marketPrice: 45, ourPrice: 20 },
  'personal-standard': { marketPrice: 65, ourPrice: 30 },
  'personal-advanced': { marketPrice: 85, ourPrice: 40 },
};

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

interface CalculatorProps {
  formData: Partial<BusinessSavingsFormData>;
  onUpdate: (data: Partial<BusinessSavingsFormData>) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function Calculator({ formData, onUpdate, onContinue, onBack }: CalculatorProps) {
  const [serviceType, setServiceType] = useState<'internet' | 'phone' | 'both'>(
    formData.serviceType || 'both'
  );
  
  const [internetType, setInternetType] = useState<InternetOption>(
    (formData.internetPackage?.type as InternetOption) || '300mb-fiber'
  );
  
  const [internetQuantity, setInternetQuantity] = useState(
    formData.internetPackage?.quantity || 1
  );
  
  const [phoneType, setPhoneType] = useState<PhoneLineOption>(
    (formData.phonePackage?.type as PhoneLineOption) || 'personal-standard'
  );
  
  const [phoneQuantity, setPhoneQuantity] = useState(
    formData.phonePackage?.quantity || 1
  );
  
  const [devicePayoff, setDevicePayoff] = useState<DevicePayoff>(
    formData.phonePackage?.devicePayoff || {
      hasDevice: false,
      wantsPayoff: false,
      carrier: '',
      deviceCount: 1,
      balancePerDevice: 0
    }
  );
  
  // Calculate savings based on current selections
  const calculateSavings = (): number => {
    let totalMarketPrice = 0;
    let totalOurPrice = 0;
    
    if (serviceType === 'internet' || serviceType === 'both') {
      totalMarketPrice += internetPricing[internetType].marketPrice * internetQuantity;
      totalOurPrice += internetPricing[internetType].ourPrice * internetQuantity;
    }
    
    if (serviceType === 'phone' || serviceType === 'both') {
      totalMarketPrice += phonePricing[phoneType].marketPrice * phoneQuantity;
      totalOurPrice += phonePricing[phoneType].ourPrice * phoneQuantity;
      
      // Add potential device payoff savings
      if (devicePayoff.hasDevice && devicePayoff.wantsPayoff) {
        const payoffAmount = devicePayoff.deviceCount * devicePayoff.balancePerDevice;
        totalMarketPrice += payoffAmount; // This would be an extra cost with other carriers
      }
    }
    
    // Calculate annual savings
    return (totalMarketPrice - totalOurPrice) * 12;
  };
  
  // Update savings whenever selections change
  useEffect(() => {
    const estimatedSavings = calculateSavings();
    
    let updatedData: Partial<BusinessSavingsFormData> = {
      serviceType,
      estimatedSavings,
    };
    
    if (serviceType === 'internet' || serviceType === 'both') {
      updatedData.internetPackage = {
        type: internetType,
        quantity: internetQuantity
      };
    }
    
    if (serviceType === 'phone' || serviceType === 'both') {
      updatedData.phonePackage = {
        type: phoneType,
        quantity: phoneQuantity,
        devicePayoff
      };
    }
    
    onUpdate(updatedData);
  }, [
    serviceType, 
    internetType, 
    internetQuantity, 
    phoneType, 
    phoneQuantity, 
    devicePayoff
  ]);
  
  // Get display names
  const getInternetDisplayName = (type: InternetOption): string => {
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
  
  const getPhoneDisplayName = (type: PhoneLineOption): string => {
    const packageMap: Record<PhoneLineOption, string> = {
      'personal-budget': 'Personal Budget',
      'personal-standard': 'Personal Standard',
      'personal-advanced': 'Personal Advanced',
    };
    return packageMap[type];
  };
  
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center text-blue-900">
        Calculate Your Potential Savings
      </h2>
      
      {/* Service Type Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">What services are you interested in?</h3>
        <RadioGroup
          value={serviceType}
          onValueChange={(value) => setServiceType(value as 'internet' | 'phone' | 'both')}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Label
            htmlFor="internet"
            className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-slate-100 cursor-pointer ${
              serviceType === 'internet' ? 'border-blue-600 bg-blue-50' : 'border-slate-200'
            }`}
          >
            <RadioGroupItem value="internet" id="internet" className="sr-only" />
            <WifiIcon className="h-6 w-6 mb-2 text-blue-600" />
            <span>Internet Only</span>
          </Label>
          
          <Label
            htmlFor="phone"
            className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-slate-100 cursor-pointer ${
              serviceType === 'phone' ? 'border-blue-600 bg-blue-50' : 'border-slate-200'
            }`}
          >
            <RadioGroupItem value="phone" id="phone" className="sr-only" />
            <PhoneIcon className="h-6 w-6 mb-2 text-blue-600" />
            <span>Phone Lines Only</span>
          </Label>
          
          <Label
            htmlFor="both"
            className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-slate-100 cursor-pointer ${
              serviceType === 'both' ? 'border-blue-600 bg-blue-50' : 'border-slate-200'
            }`}
          >
            <RadioGroupItem value="both" id="both" className="sr-only" />
            <NetworkIcon className="h-6 w-6 mb-2 text-blue-600" />
            <span>Both Services</span>
          </Label>
        </RadioGroup>
      </div>
      
      {/* Internet Options */}
      {(serviceType === 'internet' || serviceType === 'both') && (
        <div className="space-y-4 pt-2 border-t border-gray-200">
          <h3 className="text-lg font-medium flex items-center">
            <WifiIcon className="h-5 w-5 mr-2 text-blue-600" />
            Internet Service Options
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="internet-type" className="block mb-2">
                Select Internet Speed
              </Label>
              <Select 
                value={internetType} 
                onValueChange={(value) => setInternetType(value as InternetOption)}
              >
                <SelectTrigger id="internet-type">
                  <SelectValue placeholder="Select Internet Speed" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(internetPricing).map((type) => (
                    <SelectItem key={type} value={type}>
                      {getInternetDisplayName(type as InternetOption)} - {formatCurrency(internetPricing[type as InternetOption].ourPrice)}/mo
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                Market price: {formatCurrency(internetPricing[internetType].marketPrice)}/mo
              </p>
            </div>
            
            <div>
              <Label htmlFor="internet-quantity" className="block mb-2">
                Number of Internet Lines
              </Label>
              <Input
                id="internet-quantity"
                type="number"
                min={1}
                max={10}
                value={internetQuantity}
                onChange={(e) => setInternetQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Phone Options */}
      {(serviceType === 'phone' || serviceType === 'both') && (
        <div className="space-y-4 pt-2 border-t border-gray-200">
          <h3 className="text-lg font-medium flex items-center">
            <PhoneIcon className="h-5 w-5 mr-2 text-blue-600" />
            Phone Line Options
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone-type" className="block mb-2">
                Select Phone Package
              </Label>
              <Select 
                value={phoneType} 
                onValueChange={(value) => setPhoneType(value as PhoneLineOption)}
              >
                <SelectTrigger id="phone-type">
                  <SelectValue placeholder="Select Phone Package" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(phonePricing).map((type) => (
                    <SelectItem key={type} value={type}>
                      {getPhoneDisplayName(type as PhoneLineOption)} - {formatCurrency(phonePricing[type as PhoneLineOption].ourPrice)}/mo
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                Market price: {formatCurrency(phonePricing[phoneType].marketPrice)}/mo
              </p>
            </div>
            
            <div>
              <Label htmlFor="phone-quantity" className="block mb-2">
                Number of Phone Lines
              </Label>
              <Input
                id="phone-quantity"
                type="number"
                min={1}
                max={20}
                value={phoneQuantity}
                onChange={(e) => setPhoneQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full"
              />
            </div>
          </div>
          
          {/* Device Payoff Section */}
          <div className="bg-gray-50 p-4 rounded-md space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="has-device" className="font-medium">
                Do you currently have a device with another carrier?
              </Label>
              <Switch
                id="has-device"
                checked={devicePayoff.hasDevice}
                onCheckedChange={(checked) => 
                  setDevicePayoff(prev => ({ ...prev, hasDevice: checked }))
                }
              />
            </div>
            
            {devicePayoff.hasDevice && (
              <>
                <div className="flex items-center justify-between">
                  <Label htmlFor="wants-payoff" className="font-medium">
                    Would you like your device paid off when you switch?
                  </Label>
                  <Switch
                    id="wants-payoff"
                    checked={devicePayoff.wantsPayoff}
                    onCheckedChange={(checked) => 
                      setDevicePayoff(prev => ({ ...prev, wantsPayoff: checked }))
                    }
                  />
                </div>
                
                {devicePayoff.wantsPayoff && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="carrier" className="block mb-2">
                        Current Carrier
                      </Label>
                      <Select
                        value={devicePayoff.carrier}
                        onValueChange={(value) => 
                          setDevicePayoff(prev => ({ ...prev, carrier: value }))
                        }
                      >
                        <SelectTrigger id="carrier">
                          <SelectValue placeholder="Select Carrier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="att">AT&T</SelectItem>
                          <SelectItem value="verizon">Verizon</SelectItem>
                          <SelectItem value="tmobile">T-Mobile</SelectItem>
                          <SelectItem value="sprint">Sprint</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="device-count" className="block mb-2">
                        Number of Devices
                      </Label>
                      <Input
                        id="device-count"
                        type="number"
                        min={1}
                        max={10}
                        value={devicePayoff.deviceCount}
                        onChange={(e) => 
                          setDevicePayoff(prev => ({ 
                            ...prev, 
                            deviceCount: Math.max(1, parseInt(e.target.value) || 1) 
                          }))
                        }
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="balance-per-device" className="block mb-2">
                        Balance per Device
                      </Label>
                      <Input
                        id="balance-per-device"
                        type="number"
                        min={0}
                        value={devicePayoff.balancePerDevice}
                        onChange={(e) => 
                          setDevicePayoff(prev => ({ 
                            ...prev, 
                            balancePerDevice: Math.max(0, parseFloat(e.target.value) || 0) 
                          }))
                        }
                        placeholder="e.g. 350"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Savings Preview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Your Estimated Annual Savings</h3>
        <p className="text-3xl font-bold text-green-600">
          {formatCurrency(calculateSavings())}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Based on your selections compared to market rates
        </p>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        
        <Button onClick={onContinue}>
          Continue to Get Your Quote
          <CheckIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}