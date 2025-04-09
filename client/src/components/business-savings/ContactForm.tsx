import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { BusinessSavingsFormData, InternetOption, PhoneLineOption } from '@/pages/BusinessSavings';

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  address: z.string().min(5, 'Address is required'),
  hasLLC: z.boolean(),
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[0-9()-.\s]+$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof formSchema>;

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
    'personal-budget': 'Personal Budget',
    'personal-standard': 'Personal Standard',
    'personal-advanced': 'Personal Advanced',
  };
  return packageMap[type];
};

interface ContactFormProps {
  formData: Partial<BusinessSavingsFormData>;
  isSubmitting: boolean;
  onSubmit: (data: Partial<BusinessSavingsFormData>) => void;
  onBack: () => void;
}

export function ContactForm({ formData, isSubmitting, onSubmit, onBack }: ContactFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      hasLLC: false,
      phoneNumber: '',
      email: '',
    },
  });
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Handle form submission
  const handleSubmit = (values: FormValues) => {
    onSubmit({
      ...formData,
      ...values,
    });
  };
  
  // Calculate monthly and annual savings
  const calculateSavings = () => {
    const annualSavings = formData.estimatedSavings || 0;
    const monthlySavings = annualSavings / 12;
    
    return {
      monthly: monthlySavings,
      annual: annualSavings,
      twoYear: annualSavings * 2
    };
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
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0055CC] mb-4">
          Get Your Free Quote
        </h2>
        <p className="text-gray-600">
          Complete the form below to receive your personalized savings quote. Our business specialists will contact you to discuss your custom plan.
        </p>
      </div>
      
      {/* Savings Summary */}
      <div className="bg-[#0055CC] text-white p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold mb-4">Your Potential Savings Summary</h3>
        
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h4 className="text-sm opacity-90 mb-1">Monthly</h4>
            <div className="grid grid-cols-1 gap-1">
              <div className="flex justify-between">
                <span>Current Estimated Cost:</span>
                <span className="font-semibold">{formatCurrency(savings.monthly + 80)}</span>
              </div>
              <div className="flex justify-between">
                <span>Your New Cost:</span>
                <span className="font-semibold">{formatCurrency(savings.monthly - 80)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/20 font-bold">
                <span>Monthly Savings:</span>
                <span>{formatCurrency(80)}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm opacity-90 mb-1">Annual</h4>
            <div className="grid grid-cols-1 gap-1">
              <div className="flex justify-between">
                <span>Current Estimated Cost:</span>
                <span className="font-semibold">{formatCurrency(savings.annual + 960)}</span>
              </div>
              <div className="flex justify-between">
                <span>Your New Cost:</span>
                <span className="font-semibold">{formatCurrency(savings.annual - 960)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/20 font-bold">
                <span>Annual Savings:</span>
                <span>{formatCurrency(960)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/20">
          <span>Total 2-Year Savings:</span>
          <span>{formatCurrency(1920)}</span>
        </div>
      </div>
      
      {/* Contact Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, City, State, ZIP" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="hasLLC"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-[#0055CC] data-[state=checked]:bg-[#0055CC] mt-1"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Do you have a registered LLC?</FormLabel>
                  <FormDescription>
                    This helps us determine eligibility for additional business discounts
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 123-4567" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSubmitting}
              className="flex items-center h-12"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#FF7A00] hover:bg-[#E66C00] text-white h-12 px-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Get Your Free Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}