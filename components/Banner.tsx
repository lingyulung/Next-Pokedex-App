import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import ZABanner from '@/public/banner/carousel/pokemon-z-a-carousel-banner.webp';
import PokopiaBanner from '@/public/banner/carousel/pokemon-pokopia-banner.png';
import ScarletVioletBanner from '@/public/banner/carousel/Pokemon Scarlet and Violet Banner.jpg';
import Autoplay from "embla-carousel-autoplay";
import PokemonStaticBanner1 from "@/public/banner/static/pokemon_static_banner_1.webp";
import PokemonStaticBanenr2 from "@/public/banner/static/pokemon_static_banner_2.jpg";

export default function Banner() {
    return (
        <div className="flex gap-x-4 items-center justify-center">
            <Carousel className="max-h-68 max-w-[53.313rem] w-full h-full" plugins={[
                Autoplay({
                    delay: 4000
                })
            ]} opts={{
                align: 'start',
                loop: true
            }}>
                <CarouselContent className="ml-0 w-full h-full">
                    <CarouselItem className="pl-0 basis-full w-full h-full">
                        <div className="relative w-full h-full min-h-68">
                            <Image src={ZABanner} alt="Pokemon Legends Z A" fill objectFit="cover" />
                        </div>
                    </CarouselItem>
                    <CarouselItem className="pl-0 basis-full w-full h-full">
                        <div className="relative w-full h-full min-h-68">
                            <Image src={PokopiaBanner} alt="Pokemon Pokopia" fill objectFit="cover" />
                        </div>
                    </CarouselItem>
                    <CarouselItem className="pl-0 basis-full w-full h-full">
                        <div className="relative w-full h-full min-h-68">
                            <Image src={ScarletVioletBanner} alt="Pokemon Scarlet and Violet" fill objectFit="cover" />
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            {/* <div className="min-h-68 h-full md:min-w-[53.313rem] w-full bg-orange-400"></div> */}
            <div className="flex flex-col gap-y-4 h-full">
                <div className="min-w-[25.667rem] w-full min-h-32.5 h-[50%] bg-orange-400 relative">
                    <Image src={PokemonStaticBanner1} alt="pokemon static 1" fill objectFit="cover" />
                </div>
                <div className="min-w-[25.667rem] w-full min-h-32.5 h-[50%] bg-orange-400 relative">
                    <Image src={PokemonStaticBanenr2} alt="pokemon static 2" fill objectFit="cover" />
                </div>
            </div>
        </div>
    )
}