import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Loader2 } from 'lucide-react';
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
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  // Calculate device payoff amount if applicable
  const calculateDevicePayoff = () => {
    const devicePayoff = formData.phonePackage?.devicePayoff;
    if (devicePayoff?.hasDevice && devicePayoff?.wantsPayoff) {
      return devicePayoff.deviceCount * devicePayoff.balancePerDevice;
    }
    return 0;
  };
  
  // Handle form submission
  const handleSubmit = (values: FormValues) => {
    onSubmit({
      ...formData,
      ...values,
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-blue-900">
        Get Your Free Savings Quote
      </h2>
      
      {/* Savings Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2 text-blue-900">Your Selected Package</h3>
        
        <div className="space-y-2 mb-4">
          {(formData.serviceType === 'internet' || formData.serviceType === 'both') && formData.internetPackage && (
            <div className="flex justify-between">
              <span>Internet:</span>
              <span>{getInternetDisplayName(formData.internetPackage.type)} ({formData.internetPackage.quantity})</span>
            </div>
          )}
          
          {(formData.serviceType === 'phone' || formData.serviceType === 'both') && formData.phonePackage && (
            <div className="flex justify-between">
              <span>Phone Lines:</span>
              <span>{getPhoneDisplayName(formData.phonePackage.type)} ({formData.phonePackage.quantity})</span>
            </div>
          )}
          
          {calculateDevicePayoff() > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Device Payoff:</span>
              <span>{formatCurrency(calculateDevicePayoff())}</span>
            </div>
          )}
        </div>
        
        <div className="pt-2 border-t border-blue-200">
          <div className="flex justify-between font-bold text-lg">
            <span>Annual Savings:</span>
            <span className="text-green-600">{formatCurrency(formData.estimatedSavings || 0)}</span>
          </div>
        </div>
      </div>
      
      {/* Contact Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
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
                    <Input placeholder="Doe" {...field} />
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
                  <Input placeholder="123 Main St, City, State, ZIP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="hasLLC"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Do you have a registered LLC?</FormLabel>
                  <FormDescription>
                    This helps us determine eligibility for specific business plans
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 123-4567" {...field} />
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
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSubmitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Get Your Savings Quote'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}