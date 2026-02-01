import { useProjectsScrollAnimation } from '../hooks/useProjectsScrollAnimation';
import Spline from '@splinetool/react-spline';
import '../styles/projects.scss';
import PageTitle from './PageTitle';

const Projects = () => {
  const {
    projectRootRef,
    projectTitleRef,
    phoneRef,
    onLoad,
    projectDescriptionRef,
    currentProject,
  } = useProjectsScrollAnimation();

  return (
    <div ref={projectRootRef} className="projects_root">
      <div className="mobile_project">
        <PageTitle title="PROJECTS" ref={projectTitleRef} />
        <div ref={projectDescriptionRef} className="project_description_container">
          <h3 className="project_title">{currentProject.name}</h3>
          <p className="project_description">{currentProject.description}</p>
          <div className="store_links">
            <a
              href="https://apps.apple.com/app/id0000000000"
              className="store_btn appstore"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
                alt="App Store"
                className="store_icon"
              />
              App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.example.app"
              className="store_btn playstore"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/fluency/48/google-play-store-new.png"
                alt="Play Store"
                className="store_icon"
              />
              Play Store
            </a>
          </div>
        </div>
      </div>
      <div ref={phoneRef} className="spline_container">
        <div className="spline_inner">
          <Spline
            scene="https://prod.spline.design/KzjInY4RX7SH5Ja7/scene.splinecode"
            onLoad={onLoad}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
