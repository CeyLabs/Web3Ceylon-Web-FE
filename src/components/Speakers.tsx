import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import { Card, CardContent } from '@/components/ui/card';

interface SpeakersProps {
  className?: string;
}

const Speakers: React.FC<SpeakersProps> = ({ className }) => {
  const speakers = [
    {
      name: "To be decided",
      title: "Founder, Ceylon Cash",
      topic: "To be announced",
      image: "👨‍💼",
      bio: "Details coming soon"
    },
    {
      name: "To be decided",
      title: "CTIO, CeyLabs LLC",
      topic: "To be announced",
      image: "👩‍💻",
      bio: "Details coming soon"
    },
    {
      name: "To be decided",
      title: "CTO, Web3 Tech Startup",
      topic: "To be announced",
      image: "🚀",
      bio: "Details coming soon"
    },
    {
      name: "To be decided",
      title: "Lecturer, University of Somewhere",
      topic: "To be announced",
      image: "🎓",
      bio: "Details coming soon"
    },
    {
      name: "To be decided",
      title: "NFT Artist & Creator",
      topic: "To be announced",
      image: "🎨",
      bio: "Details coming soon"
    },
    {
      name: "To be decided",
      title: "DAO Governance Expert",
      topic: "To be announced",
      image: "🏛️",
      bio: "Details coming soon"
    }
  ];

  return (
    <section id="speakers" className={cn('py-20 bg-white', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-instrument mb-8 text-center">Meet the Builders & Visionaries</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-lg text-center text-muted-foreground">
              Learn from leading experts, innovators, and pioneers shaping Sri Lanka's Web3 future
            </p>
          </FadeIn>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {speakers.map((speaker, index) => (
            <FadeIn key={index} delay={150 + index * 50}>
              <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{speaker.image}</div>
                  <h3 className="text-xl font-instrument font-medium mb-2">{speaker.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{speaker.title}</p>
                  <p className="text-gray-700 font-medium mb-3 text-sm">"{speaker.topic}"</p>
                  <p className="text-sm text-muted-foreground">{speaker.bio}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
