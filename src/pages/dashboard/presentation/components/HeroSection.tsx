import { heroImage } from '../../../../core/constants/assets_images';
import { useHeroSectionAnimation } from '../hooks/useHeroSectionAnimation';
import '../styles/heroSection.scss';

const HeroSection = () => {
  const { dashboardConainerRef, imageRef, trailRef, headerRef } = useHeroSectionAnimation();

  return (
    <section ref={dashboardConainerRef} className="hero">
      <p ref={headerRef} className="header_root">
        code by Deepraj
        <br />
        Passionate Creative Designer and Developer, dedicated to crafting innovative solutions and
        exceptional digital experiences through modern technologies.
      </p>

      <img ref={imageRef} src={heroImage} alt="Maniac" className="hero_image" />

      <div ref={trailRef} className="hero_trail">
        {[1, 2, 3, 4].map((index) => (
          <span key={index} className="trail_line">
            {'DEVELOPER●'.split('').map((char, charIndex) => (
              <span key={charIndex} className="trail_char">
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
