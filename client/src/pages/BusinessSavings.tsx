import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calculator } from '@/components/business-savings/Calculator';
import { IntroStep } from '@/components/business-savings/IntroStep';
import { ContactForm } from '@/components/business-savings/ContactForm';
import { QuoteSummary } from '@/components/business-savings/QuoteSummary';

// Define types for our form data
export type InternetOption = '10mb-copper' | '50mb-copper' | '300mb-fiber' | '1000mb-fiber' | '3000mb-fiber' | '5000mb-fiber';
export type PhoneLineOption = 'personal-budget' | 'personal-standard' | 'personal-advanced';

export interface DevicePayoff {
  hasDevice: boolean;
  wantsPayoff: boolean;
  carrier: string;
  deviceCount: number;
  balancePerDevice: number;
}

export interface BusinessSavingsFormData {
  // Step 2 - Calculator data
  serviceType: 'internet' | 'phone' | 'both';
  internetPackage?: {
    type: InternetOption;
    quantity: number;
  };
  phonePackage?: {
    type: PhoneLineOption;
    quantity: number;
    devicePayoff: DevicePayoff;
  };
  estimatedSavings: number;
  
  // Step 3 - Contact data
  firstName: string;
  lastName: string;
  address: string;
  hasLLC: boolean;
  phoneNumber: string;
  email: string;
}

export default function BusinessSavings() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BusinessSavingsFormData>>({
    serviceType: 'both',
    estimatedSavings: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;
  
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prevStep => prevStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleCalculatorUpdate = (calculatorData: Partial<BusinessSavingsFormData>) => {
    setFormData(prev => ({ ...prev, ...calculatorData }));
  };
  
  const handleContactFormSubmit = async (contactData: Partial<BusinessSavingsFormData>) => {
    setIsSubmitting(true);
    
    try {
      // Combine all form data
      const completeFormData = { ...formData, ...contactData };
      
      // Submit the form data to your API
      const response = await fetch('/api/business-savings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeFormData),
      });
      
      if (response.ok) {
        setIsComplete(true);
        setCurrentStep(4); // Move to thank you step
      } else {
        // Handle error
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="p-6">
              {currentStep === 1 && (
                <IntroStep onContinue={handleNextStep} />
              )}
              
              {currentStep === 2 && (
                <Calculator 
                  formData={formData} 
                  onUpdate={handleCalculatorUpdate} 
                  onContinue={handleNextStep}
                  onBack={handlePrevStep}
                />
              )}
              
              {currentStep === 3 && (
                <ContactForm 
                  formData={formData}
                  isSubmitting={isSubmitting}
                  onSubmit={handleContactFormSubmit}
                  onBack={handlePrevStep}
                />
              )}
              
              {currentStep === 4 && isComplete && (
                <QuoteSummary data={formData} />
              )}
            </CardContent>
          </Card>
          
          {/* Navigation buttons for mobile */}
          <div className="mt-6 flex justify-between md:hidden">
            {currentStep > 1 && currentStep < 4 && (
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={isSubmitting}
              >
                Back
              </Button>
            )}
            
            {currentStep < 3 && (
              <Button
                onClick={handleNextStep}
                className="ml-auto"
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}