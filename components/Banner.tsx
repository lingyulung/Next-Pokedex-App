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
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-2 items-center justify-center w-full">
            <Carousel className="md:max-h-68 md:max-w-[53.313rem] w-full h-full rounded overflow-hidden" plugins={[
                Autoplay({
                    delay: 4000
                })
            ]} opts={{
                align: 'start',
                loop: true
            }}>
                <CarouselContent className="ml-0 w-full h-full">
                    <CarouselItem className="pl-0 basis-full w-full h-full">
                        <div className="relative w-full h-28 md:h-full md:min-h-68">
                            <Image src={ZABanner} alt="Pokemon Legends Z A" fill objectFit="cover" />
                        </div>
                    </CarouselItem>
                    <CarouselItem className="pl-0 basis-full w-full h-full">
                        <div className="relative w-full h-28 md:h-full md:min-h-68">
                            <Image src={PokopiaBanner} alt="Pokemon Pokopia" fill objectFit="cover" />
                        </div>
                    </CarouselItem>
                    <CarouselItem className="pl-0 basis-full w-full h-full">
                        <div className="relative w-full h-28 md:h-full md:min-h-68">
                            <Image src={ScarletVioletBanner} alt="Pokemon Scarlet and Violet" fill objectFit="cover" />
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            {/* <div className="min-h-68 h-full md:min-w-[53.313rem] w-full bg-orange-400"></div> */}
            <div className="flex flex-col gap-y-2 md:gap-y-4 h-full w-full md:w-auto">
                <div className="md:min-w-[25.667rem] w-full h-28 md:min-h-32.5 md:h-[50%] bg-orange-400 relative rounded overflow-hidden">
                    <Image src={PokemonStaticBanner1} alt="pokemon static 1" fill objectFit="cover" />
                </div>
                <div className="md:min-w-[25.667rem] w-full h-28 md:min-h-32.5 md:h-[50%] bg-orange-400 relative rounded overflow-hidden">
                    <Image src={PokemonStaticBanenr2} alt="pokemon static 2" fill objectFit="cover" />
                </div>
            </div>
        </div>
    )
}