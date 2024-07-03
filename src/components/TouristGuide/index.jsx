import React, { useState } from 'react';
import { Tabs, TabsContent } from "../ui/TabsCards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/TabsCards";
import { MapPin, Compass, Umbrella, Award, Mountain, Waves, Sun } from 'lucide-react';
import AudioPlayer from '../Audio';

const TouristGuide = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const images = [
    { src: "/api/placeholder/1200/600", alt: "Torroella de Montgrí panorama" },
    { src: "/api/placeholder/1200/600", alt: "l'Estartit beach" },
    { src: "/api/placeholder/1200/600", alt: "Medes Islands" },
  ];

  const handleIsPlaying = () => {
    setIsPlaying(!isPlaying)
  }

  const handleIsPausing = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-blue-50 to-green-50">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">Discover the Magic of Torroella de Montgrí and l'Estartit</h1>
      
      <div className="mt-12 text-center text-gray-600">
        <AudioPlayer imPlaying={handleIsPlaying} imPausing={handleIsPausing}/>
        {!isPlaying && <div>Play the audio description while reading 🎧 😊</div>}
      </div>
      <div className="relative w-full h-[400px] mb-8 overflow-hidden rounded-lg shadow-xl">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === activeImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeImage ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setActiveImage(index)}
            />
          ))}
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsContent value="overview">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-3xl">Welcome to Paradise</CardTitle>
              <CardDescription className="text-blue-100">Discover the essence of Baix Empordà</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-lg pt-4 mb-4">Situated in the heart of Baix Empordà, Torroella de Montgrí and l'Estartit offer a perfect blend of nature, culture, and Mediterranean charm. From the majestic Montgrí massif to the crystal-clear waters of the coast, this area is a privileged destination waiting to be explored.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 flex items-center"><Mountain className="mr-2" /> Torroella de Montgrí</h3>
                  <p>A royal village surrounded by lush fields and picturesque orchards, steeped in history and culture.</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 flex items-center"><Waves className="mr-2" /> l'Estartit</h3>
                  <p>One of the best tourist centers on the Costa Brava, offering stunning beaches and vibrant marine life.</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 flex items-center"><Sun className="mr-2" /> Medes Islands</h3>
                  <p>A natural wonder and protected marine reserve, perfect for diving and snorkeling enthusiasts.</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 flex items-center"><Compass className="mr-2" /> Natural Park</h3>
                  <p>Explore the diverse ecosystems of the Montgrí, Medes Islands and Baix Ter Natural Park.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
      </Tabs>
      
      <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-800">Our Commitment to Quality</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-blue-50 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Umbrella className="mr-2" /> Beach Excellence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Q for Tourism Quality</li>
                <li>ISO 9001 and 14001 Certified</li>
                <li>EMAS Environmental Management</li>
                <li>Prestigious Blue Flag beaches</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-green-50 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Award className="mr-2" /> Destination Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Family Tourism Destination (DTF)</li>
                <li>Integral System of Tourism Quality (SICTED)</li>
                <li>Certified Nautical Station</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-700">
                <MapPin className="mr-2" /> Visit Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">Tourist Office of l'Estartit</p>
              <p>Passeig Marítim, s/n · 17258 l'Estartit</p>
              <p>Tel. +34 972 751 910</p>
              <p className="mt-2">
                <a href="mailto:info@visitestartit.com" className="text-blue-600 hover:underline">info@visitestartit.com</a>
              </p>
              <p>
                <a href="https://www.visitestartit.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.visitestartit.com</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <footer className="mt-12 text-center text-gray-600">
        <p>Thank you very much! Enjoy!</p>
      </footer>
    </div>
  );
};

export default TouristGuide;