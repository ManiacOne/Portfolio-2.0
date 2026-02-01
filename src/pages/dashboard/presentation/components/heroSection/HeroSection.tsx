import { heroImage } from '../../../../../core/constants/assets_images';
import { useHeroSectionAnimation } from './hooks/useHeroSectionAnimation';

const HeroSection = () => {
  const { dashboardConainerRef, imageRef, trailRef, headerRef } = useHeroSectionAnimation();

  return (
    <section
      ref={dashboardConainerRef}
      className="relative w-full h-dvh flex items-start bg-gradient-to-b from-[#a3d244] via-[#b0db4e] to-[#7cb335] z-10 overflow-hidden"
    >
      <p
        ref={headerRef}
        className="w-full max-w-[500px] z-[2] flex flex-col justify-start p-8 font-[aurochs] text-2xl tracking-[2.5px] leading-[1.1]"
      >
        code by Deepraj
        <br />
        Passionate Creative Designer and Developer, dedicated to crafting innovative solutions and
        exceptional digital experiences through modern technologies.
      </p>

      <img
        ref={imageRef}
        src={heroImage}
        alt="Maniac"
        className="absolute h-[103%] bottom-[-3%] left-1/2 -translate-x-1/2 object-cover w-screen"
      />

      <div
        ref={trailRef}
        className="absolute right-0 text-[8vw] font-extrabold font-[aurochs] tracking-[0] leading-[0.9] text-white/50 select-none pointer-events-none"
      >
        {[1, 2, 3, 4].map((index) => (
          <span key={index} className="trail_line block will-change-transform">
            {'DEVELOPER●'.split('').map((char, charIndex) => (
              <span key={charIndex} className="trail_char block text-center will-change-transform">
                {char}
                <br />
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
