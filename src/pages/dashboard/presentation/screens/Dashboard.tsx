import Experience from '../components/experience/Experience';
import HeroSection from '../components/heroSection/HeroSection';
import { ReactLenis } from '@studio-freight/react-lenis';
import ProjectsV2 from '../components/projectsV2/ProjectsV2';
import GetInTouch from '../components/getInTouch/GetInTouch';

const Dashboard = () => {
  return (
    <ReactLenis root options={{ lerp: 0.05 }}>
      <div className="dashboard_root">
        <HeroSection />
        {/* <Projects /> */}
        <ProjectsV2 />
        <Experience />
        <GetInTouch />
        {/* <Demo />
        <DemoAdvanced /> */}
      </div>
    </ReactLenis>
  );
};

export default Dashboard;
