import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';
import TypewriterText from '../ui/TypewriterText';
import { projects } from '../../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-dark-surface/30">
      <div className="section-container">
        <SectionTitle
          title="Featured Projects"
          subtitle={
            <TypewriterText
              text="Here are some projects I’ve completed"
              speed={30}
            />
          }
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
