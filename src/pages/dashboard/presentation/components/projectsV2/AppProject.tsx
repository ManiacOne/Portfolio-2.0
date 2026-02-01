import { IProject } from './hooks/useProjectsV2';

const AppProject = ({ project }: { project: IProject; index: number }) => {
  return (
    <div className="relative w-[900px] h-fit-content flex items-center">
      {/* Phone Mockup */}
      <div className="relative w-[40%] flex items-center justify-center">
        <div className="relative">
          <div className="relative w-[320px] h-[650px] bg-gradient-to-br from-zinc-900 to-black rounded-[3rem] p-3 shadow-2xl shadow-black/80">
            <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-3xl z-10" />
              <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative w-[60%] flex flex-col justify-center">
        <div className="flex gap-2 mb-6">
          {project.categories.map((category) => (
            <span
              key={category}
              className="px-4 py-1.5 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        <h3 className="text-white text-4xl font-bold mb-3 leading-tight">{project.name}</h3>

        <p className="text-gray-400 text-md leading-relaxed mb-10">{project.description}</p>

        <div className="mb-10">
          <h4 className="text-white/40 text-xs font-medium mb-3 uppercase tracking-widest">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-3 py-1.5 text-sm text-white/80 bg-white/5 rounded-lg">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg">
            App Store →
          </button>
          <button className="px-8 py-4 bg-white/5 text-white font-semibold rounded-lg">
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppProject;
