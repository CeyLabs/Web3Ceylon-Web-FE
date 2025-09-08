
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className }) => {
  return (
    <section id="about" className={cn('py-20 md:py-32 bg-gray-50', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
          <FadeIn className="md:col-span-5">
            <div className="flex flex-col space-y-6">
              <div>
                <span className="text-sm md:text-base font-medium text-blue-600 mb-2 inline-block">Why Web3Ceylon?</span>
                <h2 className="text-3xl md:text-5xl font-instrument font-medium tracking-tight mb-6">Connecting global knowledge with local innovation</h2>
              </div>
              
              <p className="text-lg text-gray-700">
                Sri Lanka is a digitally vibrant, emerging market with high mobile adoption, a growing developer community, and rising curiosity about blockchain.
              </p>
              <p className="text-lg text-gray-700">
                Web3Ceylon empowers developers, creators, and entrepreneurs through workshops, talks, and community bonding — bridging the gap between global Web3 trends and local innovation opportunities.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">4</div>
                  <div className="text-sm text-gray-600">Cities</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">500+</div>
                  <div className="text-sm text-gray-600">Expected Attendees</div>
                </div>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={150} className="md:col-span-7">
            <div className="relative h-[500px] lg:h-[600px] w-full rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🇱🇰</div>
                  <div className="text-6xl mb-4">
                    <span className="mr-4">🏙️</span>
                    <span className="mr-4">🏛️</span>
                  </div>
                  <div className="text-6xl">
                    <span className="mr-4">🎨</span>
                    <span>🏔️</span>
                  </div>
                  <p className="mt-6 text-gray-600 font-medium">Four Cities, One Vision</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default About;
