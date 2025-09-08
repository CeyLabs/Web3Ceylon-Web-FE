
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CitiesProps {
  className?: string;
}

const Cities: React.FC<CitiesProps> = ({ className }) => {
  const cities = [
    {
      name: "Colombo",
      title: "Web3 Dev Fest",
      tagline: "Sri Lanka's commercial heart turns into a Web3 innovation hub",
      icon: "🏙️",
      description: "Comprehensive developer workshops, technical sessions, and blockchain fundamentals",
      highlights: ["Smart Contract Development", "DeFi Protocols", "Developer Networking", "Tech Talks"]
    },
    {
      name: "Kandy",
      title: "Blockchain Fundamentals & Crypto Essentials",
      tagline: "Web3 meets the hill capital",
      icon: "🏛️",
      description: "Essential crypto knowledge, wallet setup, and blockchain basics",
      highlights: ["Wallet Security", "Bitcoin Basics", "Stablecoin Education", "Crypto Trading"]
    },
    {
      name: "Galle",
      title: "Web3 for Creators & Entrepreneurs",
      tagline: "Coastal vibes, creative minds",
      icon: "🎨",
      description: "NFT creation, DAO governance, and creator economy exploration",
      highlights: ["NFT Creation", "Creator Economy", "DAO Governance", "Digital Art"]
    },
    {
      name: "Ella",
      title: "Web3 Community Retreat",
      tagline: "Unwind, connect, and build in Sri Lanka's scenic highlands",
      icon: "🏔️",
      description: "Fireside chats, networking sessions, and community bonding",
      highlights: ["Fireside Chats", "Network Building", "Community Bonding", "Scenic Workshops"]
    }
  ];

  return (
    <section id="cities" className={cn('py-20 bg-gray-50', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-instrument mb-8 text-center">Tour Cities</h2>
          </FadeIn>
          
          <FadeIn delay={100}>
            <p className="text-xl text-center mb-8 text-gray-700">
              Four unique experiences across Sri Lanka's most beautiful destinations
            </p>
          </FadeIn>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cities.map((city, index) => (
            <FadeIn key={index} delay={150 + index * 100}>
              <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{city.icon}</span>
                    <div>
                      <h3 className="text-2xl font-instrument font-medium mb-1">{city.name}</h3>
                      <h4 className="text-lg font-medium text-blue-600">{city.title}</h4>
                    </div>
                  </div>
                  
                  <p className="text-sm italic text-gray-600 mb-4">{city.tagline}</p>
                  <p className="text-gray-700 mb-6">{city.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {city.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full mr-2"></span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <a 
                      href="#register" 
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                    >
                      Join {city.name} Session →
                    </a>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cities;
