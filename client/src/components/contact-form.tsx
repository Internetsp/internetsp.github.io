import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { leadSchema, type Lead } from "@shared/schema";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function ContactForm() {
  const { toast } = useToast();
  const [agreed, setAgreed] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Lead>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      interest: "",
      message: "",
    },
  });

  const interestValue = watch("interest");

  const leadMutation = useMutation({
    mutationFn: async (data: Lead) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "We've received your inquiry and will contact you shortly.",
      });
      reset();
      setAgreed(false);
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: Lead) => {
    leadMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-6">
              Interested in our services or have questions? Fill out the form and one of our local experts will contact you shortly.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Visit Our Store</h3>
              <div className="space-y-3">
                <p className="flex items-start">
                  <MapPin className="text-[#009FDB] h-5 w-5 mt-1 mr-3" />
                  <span>123 Main Street, Suite 101<br/>Anytown, US 12345</span>
                </p>
                <p className="flex items-start">
                  <Phone className="text-[#009FDB] h-5 w-5 mt-1 mr-3" />
                  <span>(555) 123-4567</span>
                </p>
                <p className="flex items-start">
                  <Mail className="text-[#009FDB] h-5 w-5 mt-1 mr-3" />
                  <span>omar.mteir@internetsp.net</span>
                </p>
                <p className="flex items-start">
                  <Clock className="text-[#009FDB] h-5 w-5 mt-1 mr-3" />
                  <span>Monday-Friday: 9am-7pm<br/>Saturday: 10am-5pm<br/>Sunday: Closed</span>
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-[#009FDB] transition">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-[#009FDB] transition">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-[#009FDB] transition">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-[#009FDB] transition">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-gray-50 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Request Information</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
                    <Input 
                      id="name"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 mt-2"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 mt-2"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 mt-2"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="text-gray-700 font-medium">Service Address</Label>
                    <Input 
                      id="address"
                      placeholder="123 Main St, Anytown, US 12345"
                      className="w-full px-4 py-3 mt-2"
                      {...register("address")}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="interest" className="text-gray-700 font-medium">I'm Interested In:</Label>
                    <Select 
                      onValueChange={(value) => setValue("interest", value)}
                      value={interestValue}
                    >
                      <SelectTrigger className="w-full px-4 py-3 mt-2">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fiber">AT&T Fiber Internet</SelectItem>
                        <SelectItem value="wireless">AT&T Wireless Plans</SelectItem>
                        <SelectItem value="both">Both Fiber & Wireless</SelectItem>
                        <SelectItem value="other">Other Services</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.interest && (
                      <p className="text-red-500 text-sm mt-1">{errors.interest.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-gray-700 font-medium">Additional Comments (Optional)</Label>
                    <Textarea 
                      id="message"
                      rows={4}
                      placeholder="Tell us more about what you're looking for..."
                      className="w-full px-4 py-3 mt-2"
                      {...register("message")}
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreed}
                      onCheckedChange={(checked) => setAgreed(checked as boolean)}
                      className="mt-1"
                    />
                    <Label 
                      htmlFor="terms" 
                      className="text-sm text-gray-600 font-normal cursor-pointer"
                    >
                      I agree to receive communications about AT&T offers and services. I understand I can unsubscribe at any time.
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#009FDB] text-white hover:bg-[#009FDB]/90 font-bold"
                    disabled={!agreed || leadMutation.isPending}
                  >
                    {leadMutation.isPending ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
