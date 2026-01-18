import { heroImage6 } from '../../../../core/constants/assets_images';
import { useHeroSectionAnimation } from '../hooks/useHeroSectionAnimation';
import '../styles/heroSection.scss';

const HeroSection = () => {
  const { dashboardConainerRef, imageRef, trailRef } = useHeroSectionAnimation();

  return (
    <section ref={dashboardConainerRef} className="hero">
      <div className="header_root">
        <p className="left_content">@code by Deepraj</p>
        <p className="right_content">
          Passionate Creative Designer and Developer, dedicated to crafting innovative solutions and
          exceptional digital experiences through modern technologies
        </p>
      </div>

      <img ref={imageRef} src={heroImage6} alt="Maniac" className="hero_image" />

      <div
        ref={trailRef}
        className='hero_trail'
      >
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
