import { useProjectsScrollAnimation } from '../hooks/useProjectsScrollAnimation'
import Spline from '@splinetool/react-spline';
import '../styles/projects.scss'

const Projects = () => {

    const { projectRootRef, projectTitleRef, phoneRef, onLoad, projectDescriptionRef, currentProject } = useProjectsScrollAnimation()

    return (
        <div ref={projectRootRef} className="projects_root">
            <h2 ref={projectTitleRef} className="projects_title">
                PROJECTS
            </h2>
            <div className='mobile_project'>
                <div ref={phoneRef}>
                    <Spline
                        scene="https://prod.spline.design/KzjInY4RX7SH5Ja7/scene.splinecode"
                        onLoad={onLoad}
                        style={{
                            width: 'fit-content',
                        }}
                    />
                </div>
                <div ref={projectDescriptionRef} className="project_description_container">
                    <h3 className="project_title">{currentProject.name}</h3>
                    <p className="project_description">
                        {currentProject.description}
                    </p>
                </div>
            </div>
        </div >
    )
}



export default Projects