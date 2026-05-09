"use client";
import Image from "next/image";
import Link from "next/link";
import { Clock, Zap, XCircle, ShieldCheck, User, Users } from "lucide-react";

interface ServiceCardProps {
  title: string;
  price: string;
  duration: string;
  image: string;
  href: string;
  isPrivate?: boolean;
}

export default function ServiceCard({ title, price, duration, image, href, isPrivate }: ServiceCardProps) {
  return (
    <Link href={href} className="group flex flex-col bg-[#32314F] rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20 border border-white/5">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
          {isPrivate ? (
            <User className="w-3.5 h-3.5 text-gili-600" />
          ) : (
            <Users className="w-3.5 h-3.5 text-gili-600" />
          )}
          <span className="text-[10px] font-bold text-gili-900 uppercase tracking-wider">
            {isPrivate ? "Private" : "Sharing"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#FDD973] mb-5 leading-tight group-hover:text-accent-400 transition-colors line-clamp-3 min-h-[5rem]">
          {title}
        </h3>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-8">
          <div className="flex items-center gap-2 text-white/80">
            <Clock className="w-4 h-4 text-white/40" />
            <span className="text-[11px] font-semibold">{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Zap className="w-4 h-4 text-white/40" />
            <span className="text-[11px] font-semibold">Instan Booking</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <XCircle className="w-4 h-4 text-white/40" />
            <span className="text-[11px] font-semibold">Easy Cancel</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <ShieldCheck className="w-4 h-4 text-white/40" />
            <span className="text-[11px] font-semibold">Secure</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-[#FDD973] tracking-tight">{price}</span>
          </div>
          <div className="bg-[#FDD973] text-gili-900 px-5 py-2.5 rounded-full font-bold text-sm shadow-lg group-hover:bg-accent-400 group-hover:scale-105 transition-all">
            Book Now
          </div>
        </div>
      </div>
    </Link>
  );
}
