import HeroSection from '../components/HeroSection';
import Projects from '../components/Projects';
import { ReactLenis } from '@studio-freight/react-lenis';

const Dashboard = () => {
  return (
    <ReactLenis root options={{ lerp: 0.05 }}>
      <div className="dashboard_root">
        <HeroSection />
        <Projects />
      </div>
    </ReactLenis>
  );
};

export default Dashboard;
