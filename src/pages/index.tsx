import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useCallback, useEffect } from "react";
import Banner from "../../components/Banner";
import PokemonList from "../../components/PokemonList";
import PokemonVerticalBanner1 from "@/public/banner/side/pokemon_vertical_banner.jpg";
import PokemonVerticalBanner2 from "@/public/banner/side/pokemon_vertical_banner_2.jpeg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <Banner />
      
      <div className="flex gap-x-3 justify-center w-full relative">
        <div className="pt-3 h-fit sticky top-0">
          <div className="w-70.5 h-[22.313rem] bg-orange-500 relative">
            <Image src={PokemonVerticalBanner1} alt="pokemon vertical 1" fill objectFit="cover"/>
          </div>
        </div>
        <div className="flex-1 relative">
          <PokemonList />
        </div>
        <div className="h-fit pt-3 sticky top-0">
          <div className="w-70.5 h-[22.313rem] bg-orange-500 sticky top-0 py-3">
            <Image src={PokemonVerticalBanner2} alt="pokemon vertical 2" fill objectFit="cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
