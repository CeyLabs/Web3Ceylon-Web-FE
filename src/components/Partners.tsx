import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";

interface PartnersProps {
    className?: string;
}

const Partners: React.FC<PartnersProps> = ({ className }) => {
    const partners = [
        {
            name: "Your Logo Here",
            type: "Partner Placement Available",
            description: "You can be here as a partner",
            logo: "🤝",
        },
    ];

    return (
        <section id="partners" className={cn("bg-gray-50 py-20", className)}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto mb-16 max-w-3xl">
                    <FadeIn>
                        <h2 className="font-primary mb-8 text-center text-3xl md:text-4xl">
                            Powered by Collaboration
                        </h2>
                    </FadeIn>
                    <FadeIn delay={100}>
                        <p className="text-muted-foreground font-secondary mb-8 text-center text-lg">
                            Sponsor placements are available – your brand can be featured here as a
                            partner.
                        </p>
                    </FadeIn>
                </div>

                <div className="mx-auto mb-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {partners.map((partner, index) => (
                        <FadeIn key={index} delay={150 + index * 50}>
                            <Card className="h-full border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
                                <CardContent className="p-6 text-center">
                                    <div className="mb-4 text-4xl">{partner.logo}</div>
                                    <h3 className="font-instrument mb-2 text-xl font-medium">
                                        {partner.name}
                                    </h3>
                                    <p className="mb-3 text-sm font-medium text-blue-600">
                                        {partner.type}
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        {partner.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={400}>
                    <div className="text-center">
                        <a
                            href="mailto:partnerships@web3ceylon.com"
                            className="inline-flex items-center rounded-lg bg-gradient-to-r from-orange-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-blue-700 hover:shadow-xl"
                        >
                            Become a Partner
                        </a>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Partners;
