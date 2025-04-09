import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator } from '../components/business-savings/Calculator';
import { IntroStep } from '../components/business-savings/IntroStep';
import { ContactForm } from '../components/business-savings/ContactForm';
import { QuoteSummary } from '../components/business-savings/QuoteSummary';

// Define types for our form data
export type InternetOption = 'copper' | 'internet-300' | 'internet-500' | 'internet-1000' | 'internet-2000' | 'internet-5000';
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
  
  const handleNextStep = () => {
    if (currentStep < 3) {
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-8">
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
        </div>
      </div>
    </div>
  );
}