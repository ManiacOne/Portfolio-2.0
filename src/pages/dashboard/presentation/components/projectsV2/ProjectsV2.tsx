import PageTitle from '../PageTitle';
import AppProject from './AppProject';
import { useProjectV2 } from './hooks/useProjectsV2';
import WebProject from './WebProject';

const ProjectsV2 = () => {
  const {
    projectRootRef,
    pageTitleRef,
    apps,
    websites,
    appProjectContainerRef,
    websiteProjectsRef,
    progressIndicatorRef,
    progressContainerRef,
  } = useProjectV2();

  return (
    <div ref={projectRootRef} className="relative h-screen w-full bg-black z-20 overflow-hidden">
      <div className="ml-[2rem]">
        <PageTitle title="PROJECTS" ref={pageTitleRef} />
      </div>

      {/* Apps Section */}
      {apps.length > 0 && (
        <div
          ref={appProjectContainerRef}
          className="absolute top-0 h-screen overflow-y-hidden will-change-transform"
        >
          <div className="flex flex-row items-center gap-8 h-full flex items-center">
            {apps.map((project, index) => (
              <div
                key={`app-${project.id}-${index}`}
                className={`app-card relative flex-shrink-0 ${index === 0 ? 'ml-[2rem]' : ''} ${index === apps.length - 1 ? 'mr-[2rem]' : ''}`}
              >
                <AppProject project={project} index={index} />
              </div>
            ))}
          </div>
          {/* Indicator */}
        </div>
      )}
      {apps.length > 0 && (
        <div 
          ref={progressContainerRef}
          className="absolute bottom-[4rem] left-1/2 -translate-x-1/2 w-[8rem] h-[6px] bg-white/20 rounded-[2px]"
        >
            <span 
            ref={progressIndicatorRef}
            className="w-0 h-full bg-red-500 block rounded-[2px]"
            style={{ width: '0%' }}
            ></span>
        </div>
      )}

      {/* Websites Section */}
      {websites.length > 0 &&
        websites.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (websiteProjectsRef.current[index] = el)}
            className="absolute top-0 m-auto w-full h-screen flex items-center justify-center px-[2rem]"
          >
            <WebProject project={project} index={index} />
          </div>
        ))}
    </div>
  );
};

export default ProjectsV2;
