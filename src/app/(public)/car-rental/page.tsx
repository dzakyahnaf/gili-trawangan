"use client";
import Image from "next/image";
import Link from "next/link";
import { Car, MapPin, CheckCircle2, ShieldCheck, Zap, MessageCircle, Clock, User, Fuel } from "lucide-react";
import { useLang } from "@/components/LangProvider";

export default function CarRentalPage() {
  const { t } = useLang();

  const services = [
    {
      title: "Airport Transfer",
      price: "US$ 25",
      unit: "per way",
      desc: "Private transfer from Lombok International Airport to Bangsal Port or Teluk Nare.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Full Day Car Service",
      price: "US$ 60",
      unit: "per day (10h)",
      desc: "Private car with driver to explore any destination in Lombok. Flexible and comfortable.",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Short Distance Trip",
      price: "US$ 15",
      unit: "per trip",
      desc: "Quick private transport between nearby locations in Lombok.",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  const destinations = [
    { name: "Senggigi", desc: "Main tourist hub in Lombok" },
    { name: "Mataram City", desc: "Capital city for shopping and culture" },
    { name: "Kuta Lombok", desc: "Famous for surfing and pristine beaches" },
    { name: "Senaru / Sembalun", desc: "Gateways to Mount Rinjani" },
    { name: "Pink Beach", desc: "Stunning pink sand in East Lombok" },
    { name: "Sekotong", desc: "Quiet beaches and hidden gems" }
  ];

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-[45vh] flex items-center justify-center">
        <Image 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000"
          alt="Lombok Landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Private Car Service</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">Explore Lombok island comfortably with our professional private drivers.</p>
        </div>
      </section>

      {/* Intro Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-gili-50 flex items-center justify-center mb-3"><Car className="w-6 h-6 text-gili-500" /></div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">New Vehicles</p>
              <p className="text-lg font-bold text-gray-900">Modern Fleet</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-accent-50 flex items-center justify-center mb-3"><User className="w-6 h-6 text-accent-600" /></div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Professional</p>
              <p className="text-lg font-bold text-gray-900">English Speaking</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-3"><Fuel className="w-6 h-6 text-green-600" /></div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inclusive</p>
              <p className="text-lg font-bold text-gray-900">Petrol Included</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-3"><Clock className="w-6 h-6 text-blue-600" /></div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Flexible</p>
              <p className="text-lg font-bold text-gray-900">24/7 Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Rental Packages</h2>
            <p className="text-gray-500">Choose the best option for your travel needs in Lombok.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col">
                <div className="relative h-56">
                  <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-accent-400 font-bold text-2xl">{service.price}</p>
                    <p className="text-white text-xs font-medium">{service.unit}</p>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </div>
                <div className="p-6 pt-0">
                  <Link 
                    href={`https://wa.me/6287793082501?text=Halo%20RH%20Tour%2C%20saya%20ingin%20pesan%20${service.title}`}
                    className="block w-full py-3.5 rounded-xl bg-gili-500 text-white font-bold text-center hover:bg-gili-600 transition-all text-sm"
                  >
                    Book This Car
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Destinations</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We provide car services to all areas across Lombok. Whether you need a simple transfer from the airport to Bangsal port or a full day tour exploring the hidden waterfalls and southern beaches, we've got you covered.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {destinations.map((dest, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-500 mt-2 shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{dest.name}</p>
                      <p className="text-xs text-gray-500">{dest.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1518173946687-a4c8a9b749f5?auto=format&fit=crop&q=80&w=1000"
                alt="Lombok Road Trip"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inclusions Card */}
      <section className="pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-neutral-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-8 text-center text-accent-400 tracking-wide uppercase">All Rentals Include</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                <span className="text-sm font-medium">Private Car & AC</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                <span className="text-sm font-medium">Professional Driver</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                <span className="text-sm font-medium">Petrol / Fuel</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                <span className="text-sm font-medium">Flexible Pickup</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                <span className="text-sm font-medium">Wait at Airport</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                <span className="text-sm font-medium">Safe & Clean</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-accent-500 text-gili-900 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Book Your Ride Now</h2>
          <p className="font-medium mb-10 text-gili-800/80">Available 24 hours for emergency transfers or planned tours. Instant confirmation via WhatsApp.</p>
          <a 
            href="https://wa.me/6287793082501"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gili-500 text-white font-bold text-lg hover:scale-105 transition-all shadow-xl"
          >
            <MessageCircle className="w-6 h-6" /> Chat with Driver
          </a>
        </div>
      </section>
    </main>
  );
}
