import { IProject } from './hooks/useProjectsV2';

const WebProject = ({ project }: { project: IProject; index: number }) => {
  return (
    <div className="w-full">
      <div className="relative bg-gradient-to-br from-zinc-950 to-black rounded-2xl shadow-2xl shadow-black/80 overflow-hidden">
        {/* Browser Header */}
        <div className="flex items-center gap-2 px-6 py-4 bg-zinc-900/80 border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 mx-8 px-4 py-2 bg-zinc-800/50 rounded-md text-sm text-gray-500">
            {project.name.toLowerCase().replace(/\s+/g, '')}.com
          </div>
        </div>

        <div className="flex">
          {/* Screenshot */}
          <div className="relative w-[65%] h-[600px] overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
          </div>

          {/* Content */}
          <div className="relative w-[35%] p-12 flex flex-col justify-center bg-gradient-to-br from-black to-zinc-950">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.categories.map((category) => (
                <span
                  key={category}
                  className="px-4 py-1.5 text-xs font-medium text-purple-300 bg-purple-500/10 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>

            <h3 className="text-white text-4xl font-bold mb-4 leading-tight">{project.name}</h3>

            <p className="text-gray-400 text-base leading-relaxed mb-8">{project.description}</p>

            <div className="mb-8">
              <h4 className="text-white/40 text-xs font-medium mb-3 uppercase tracking-widest">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs text-white/80 bg-white/5 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-6 py-3 bg-white text-black font-semibold rounded-lg text-sm">
                View Live →
              </button>
              <button className="px-6 py-3 bg-white/5 text-white font-semibold rounded-lg text-sm">
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebProject;
