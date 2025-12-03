import { Input } from "@/components/ui/input";
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button";

interface pokemonDataObj {
    name: string;
    image: string;
    types: {
        name: string;
        url: string;
    }[];
    height: number;
    weight: number;
}

export interface pokemonResponse {
    data: pokemonDataObj[];
    hasMorePages: boolean;
}

interface searchPokemonObj {
    data?: pokemonDataObj,
    error?: 'noPokemonFound'
}

export default function PokemonList({initialPokemonData}:{initialPokemonData:pokemonResponse}) {

    const loadingElementRef = useRef<HTMLDivElement>(null);
    const loadingIntersectionObserver = useRef<IntersectionObserver>(null);
    const isShowLoading = useRef(true);
    const nextPage = useRef(1);
    const searchPokemonInputRef = useRef<HTMLInputElement>(null);
    const isFetchingMorePokemon = useRef(false);
    const [pokemonList,setPokemonList] = useState<pokemonDataObj[]>(initialPokemonData ? initialPokemonData.data : []);
    const [searchPokemon,setSearchPokemon] = useState<searchPokemonObj | null>();

    const fetchPokemons = useCallback(async (page:number = 0,limit:number = 20) => {
        try {

            const res = await fetch(`http://localhost:8000/api/pokemons?page=${page}&limit=${limit}`);

            if (res.ok) {

                const data:pokemonResponse = await res.json();

                if (data.hasMorePages) {
                    isShowLoading.current = true;
                } else {
                    isShowLoading.current = false;
                }

                nextPage.current = nextPage.current + 1;

                if (isFetchingMorePokemon.current) {
                    isFetchingMorePokemon.current = false;
                }

                setPokemonList((prev) => [...prev,...data.data]);
            } else {
                throw new Error('Something went wrong when retrieving pokemon list');
            }

        } catch (err) {
            console.error('Error retrieving Pokemon list: ',err);
        }
    },[]);

    const fetchSearchPokemon = useCallback(async(name?:string) => {

        if (!name) {
            setSearchPokemon(null);
            return;
        }

        try {
            const res = await fetch('http://localhost:8000/api/pokemons/search/' + name);

            if (res.ok) {

                if (loadingIntersectionObserver.current && loadingElementRef.current) {
                    loadingIntersectionObserver.current.unobserve(loadingElementRef.current);
                }

                const data:searchPokemonObj = await res.json();

                setSearchPokemon(data);

            } else {
                throw new Error('Search API error');
            }
        } catch (err) {
            console.error('Error when searching Pokemon: ',err);
        }
    },[]);

    useEffect(() => {

        if (pokemonList && pokemonList.length && !isFetchingMorePokemon.current && loadingElementRef.current) {
            loadingIntersectionObserver.current = new IntersectionObserver((el) => {

                if (el[0].isIntersecting) {
                    if (loadingIntersectionObserver.current) {
                        loadingIntersectionObserver.current.disconnect()
                    }

                    isFetchingMorePokemon.current = true;

                    fetchPokemons(nextPage.current);
                }

            });

            loadingIntersectionObserver.current.observe(loadingElementRef.current);
        }
    },[fetchPokemons,pokemonList]);

    useEffect(() => {
        if (!searchPokemon && loadingIntersectionObserver.current && loadingElementRef.current) {
            loadingIntersectionObserver.current.observe(loadingElementRef.current);
        }
    },[searchPokemon]);

    return (
        <>
            <div className="py-4 bg-white sticky z-10 top-0">
                <form className="flex items-center gap-x-2" onSubmit={(e) => {
                        e.preventDefault();

                        if (searchPokemonInputRef.current) {
                            fetchSearchPokemon(searchPokemonInputRef.current.value);
                        }
                    }}>
                    <Input placeholder="Pokemon Name" ref={searchPokemonInputRef} />
                    <Button type="submit" className="bg-orange-400 active:scale-75 transition-transform">Search</Button>
                    {searchPokemon && searchPokemon.data && !searchPokemon.error && <Button className="bg-gray-300 text-black hover:text-white active:scale-75 transition-transform" onClick={() => {
                        if (searchPokemonInputRef.current) {
                            searchPokemonInputRef.current.value = '';
                        }
                        setSearchPokemon(null);
                        }}>Reset</Button>}
                </form>
                {searchPokemon && !searchPokemon.data && searchPokemon.error && searchPokemon.error === 'noPokemonFound' && <p className="text-red-500 mt-2 text-center text-xs">No Such Pokemon Exists</p>}
            </div>
            <main className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 auto-rows-[1fr]">
                {searchPokemon && searchPokemon.data && !searchPokemon.error ? <PokemonCard data={searchPokemon.data} /> : pokemonList && pokemonList.length > 0 && pokemonList.map((pokemon,index) => <PokemonCard data={pokemon} key={pokemon.name} preload={index - 1 <= 15} />)}
            </main>
            {!searchPokemon && isShowLoading.current && <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 animate-pulse mt-4" ref={loadingElementRef}>
                <div className="bg-gray-400 w-full h-[114.34px] rounded-md"></div>
                <div className="bg-gray-400 w-full h-[114.34px] rounded-md"></div>
                <div className="bg-gray-400 w-full h-[114.34px] rounded-md hidden md:block"></div>
            </div>}
        </>
    )
}

function PokemonCard({data,preload = false}:{data:pokemonDataObj;preload?:boolean}) {
    return (
        <div className="flex items-center gap-x-2 md:gap-x-4 justify-center p-2 md:p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow">
            <Image src={data.image} alt={data.name} width={100} height={100} preload={preload} loading={preload ? 'eager' : 'lazy'} />
            <div className="flex flex-col justify-center gap-y-2 w-[60%]">
                <p className="font-bold text-base md:text-lg">{data.name}</p>
                <div className="flex items-center gap-1 md:gap-2">
                    {data.types.map(type => <p key={type.name} className="bg-gray-400 p-1 rounded-md text-xs">{type.name}</p>)}
                </div>
            </div>
        </div>
    )
}