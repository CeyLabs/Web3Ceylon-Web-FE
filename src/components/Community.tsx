import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";

interface RegistrationProps {
  className?: string;
}

const Registration: React.FC<RegistrationProps> = ({ className }) => {
  return (
    <section id="register" className={cn("py-20", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-instrument mb-6">
                Join Web3Ceylon 2025
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Spots are limited. Register early to secure your seat for Sri
                Lanka's largest Web3 tour.
              </p>
              <p className="text-lg text-muted-foreground">
                Choose your preferred cities and experience the future of
                blockchain technology across Sri Lanka.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-8 md:p-12 rounded-2xl shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-instrument mb-4">
                  Whitelist Registration
                </h3>
                <p className="text-gray-600 mb-6">
                  Get priority access to Web3Ceylon events and exclusive updates
                </p>
              </div>

              {/* Lu.ma embed placeholder */}
              <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-4xl mb-4">📝</div>
                  <h4 className="text-lg font-semibold mb-4">
                    Lu.ma Registration Form
                  </h4>
                  <p className="text-sm text-gray-600 mb-6">
                    This will be replaced with actual Lu.ma embed
                  </p>

                  {/* Placeholder form */}
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select Preferred Cities</option>
                      <option>All Cities (Full Tour)</option>
                      <option>Colombo Only</option>
                      <option>Kandy Only</option>
                      <option>Galle Only</option>
                      <option>Ella Only</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-orange-600 hover:to-blue-700 transition-all duration-300"
                    >
                      Join Whitelist
                    </button>
                  </form>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎟️</div>
                  <h4 className="font-semibold mb-1">Early Bird</h4>
                  <p className="text-sm text-gray-600">
                    Priority registration access
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <h4 className="font-semibold mb-1">Free Events</h4>
                  <p className="text-sm text-gray-600">
                    All sessions completely free
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🎁</div>
                  <h4 className="font-semibold mb-1">Exclusive Perks</h4>
                  <p className="text-sm text-gray-600">
                    Swag, networking & certificates
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Registration;
