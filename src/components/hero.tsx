import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-r from-[#009FDB] to-[#00A8E0] py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Experience AT&T Fiber & Wireless With Your Local Expert
            </h1>
            <p className="text-xl text-white mb-8">
              Get the speed, coverage, and service you deserve with exclusive deals from your authorized retailer.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                onClick={() => scrollToSection('fiber')} 
                className="bg-white text-[#009FDB] hover:bg-gray-100 font-bold"
                size="lg"
              >
                Explore Fiber Plans
              </Button>
              <Button 
                onClick={() => scrollToSection('wireless')} 
                className="bg-[#F37B21] text-white hover:bg-[#F37B21]/90 font-bold"
                size="lg"
              >
                See Wireless Offers
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <img 
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Family enjoying internet connection" 
              className="rounded-lg shadow-xl" 
              width="600" 
              height="400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
