import BlurImage from '../blur-image';
import Search from '../search';
import PMLogo from '../pmLogo';

export default function Hero() {
    return (
        <div
            className="w-full h-[calc(100vh-64px)] sm:flex sm:justify-center sm:items-center relative bg-black">
            <BlurImage
                src={"/Fluorite-164_horiz-Optimized.jpg"}
                alt="Hero Image"
                className="opacity-65 object-cover"
                width={0}
                height={0}
                fill
                sizes="100vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAmADIDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAQBAgMFBgf/xAAgEAACAgEFAAMAAAAAAAAAAAAAAQIDEQQSEyExIkFR/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAEDAgX/xAAYEQEBAQEBAAAAAAAAAAAAAAAAARExAv/aAAwDAQACEQMRAD8A+e2WN9FqH8kW4W2SoOJ06vT9c+is1uyLQswbqxYNQ4wuqTTOXqql2dS6zpnL1VnbFaekeFfgF+QDGE9PDDItisMTq1GPsm3UZj6UgZ2T2smueRKybcjamePQglMWRbTOdqI9j07lhiF1qbCwYx2AHIgMhvOTiy0JOXoAOitVWsZMbZOPgAKdLyVnfLLFp2tsAKVS8Z8jAAJMP//Z"
                priority={true}
            />
            <div className='max-w-screen-xl h-[calc(100svh-64px)] sm:h-auto z-10 w-full flex justify-center items-center'>
                <div className="flex flex-col justify-center items-center w-full px-8 gap-6 min-w-[350px] sm:px-0 sm:w-1/3">
                    <div className='hidden sm:block'>
                        <PMLogo isHero height={65} />
                    </div>
                    <div className='w-full'>
                        <Search isHero />
                    </div>
                </div>
            </div>
        </div>
    )
}