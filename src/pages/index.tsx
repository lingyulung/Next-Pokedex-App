import Image from "next/image";
import Banner from "../../components/Banner";
import PokemonList, { pokemonResponse } from "../../components/PokemonList";
import PokemonVerticalBanner1 from "@/public/banner/side/pokemon_vertical_banner.jpg";
import PokemonVerticalBanner2 from "@/public/banner/side/pokemon_vertical_banner_2.jpeg";
import { GetStaticPathsContext, InferGetStaticPropsType } from "next";

export async function getStaticProps(ctx:GetStaticPathsContext) {

    let pokemonData:pokemonResponse | {data: []; hasMorePages: boolean} = {
        data: [], hasMorePages: false
    };

    try {
        const res = await fetch("http://localhost:8000/api/pokemons?page=0&limit=20");

        if (res.ok) {
            const data:pokemonResponse = await res.json();

            pokemonData = data;

        } else {
            throw new Error();
        }
    } catch(err) {
        console.error('Something went wrong when retrieving initial set of Pokemon Data: ', err);
    }

    return {
        props: {
            initialPokemonData: pokemonData
        }
    }
}

export default function Home({initialPokemonData}:InferGetStaticPropsType<typeof getStaticProps>) {
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
          <PokemonList initialPokemonData={initialPokemonData} />
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
