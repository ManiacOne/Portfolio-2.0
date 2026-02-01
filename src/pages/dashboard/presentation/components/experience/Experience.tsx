import { useExperience } from './hooks/useExperience';
import './experience.scss';
import PageTitle from '../PageTitle';

const Experience = () => {
  const { titleRef, experiences, bottomActionRef, experienceRefs, rootRef } = useExperience();

  return (
    <section ref={rootRef} className="min-h-[150dvh] w-full bg-black px-[2rem] z-30">
      {/* Title */}
      <PageTitle title="EXPERIENCE" ref={titleRef} />

      {/* Experience Grid - Data Layout */}
      <div className="w-full flex flex-col">
        {experiences.map((exp, index) => (
          <div
            key={index}
            ref={(el) => {
              if (experienceRefs.current) {
                experienceRefs.current[index] = el;
              }
            }}
            className={`group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 ${index === experiences.length - 1 ? '' : 'border-b'} border-[#dedddd]/10 py-12 md:py-16 `}
          >
            {/* Column 1: Timeline (15%) */}
            <div className="md:col-span-2 flex flex-col justify-between">
              <span className="year-text font-mono text-[#a3d244] text-sm tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                /{exp.year}
              </span>
              <span className="index-number hidden md:block text-[#dedddd]/20 text-xs font-mono mt-auto">
                0{experiences.length - index}
              </span>
            </div>

            {/* Column 2: Role & Company (45%) */}
            <div className="md:col-span-10 lg:col-span-5 flex flex-col justify-start">
              <h3 className="role-title text-[2rem] font-[aurochs] text-[#b0b0b0] transition-colors leading-none">
                {exp.role}
              </h3>
              <div className="company-name flex items-center gap-3">
                <span className="company-dot w-2 h-2 rounded-full bg-[#a3d244] opacity-50 group-hover:opacity-100 transition-opacity"></span>
                <span className="text-xl text-[#dedddd]/60 font-light font-open-sans">
                  {exp.company}
                </span>
              </div>
            </div>

            {/* Column 3: Description (40%) */}
            <div className="md:col-span-12 lg:col-span-5 flex items-end">
              <p className="description-text text-lg text-[#dedddd]/50 leading-relaxed font-open-sans max-w-xl group-hover:text-[#dedddd]/70 transition-colors">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action */}
      <div
        ref={bottomActionRef}
        className="w-full  mt-8 pt-8 pb-8 flex justify-between items-center opacity-50 hover:opacity-100 transition-opacity"
      >
        <span className="font-mono text-xs text-[#a3d244]">End of Log</span>
        <a
          href="#"
          className="download-link font-aurochs text-xl text-[#dedddd] hover:text-[#a3d244] transition-colors flex items-center gap-2"
        >
          DOWNLOAD RESUME <span className="download-arrow text-sm">↓</span>
        </a>
      </div>
    </section>
  );
};

export default Experience;
