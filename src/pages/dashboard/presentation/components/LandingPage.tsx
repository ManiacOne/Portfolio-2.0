import { useLandingPageAimation } from '../hooks/useLandingPageAnimation'
import Lottie from 'lottie-react'
import { dashboardCharacter, kawsBunny } from '../../../../core/constants/assets_images'
import ActionMenu from './ActionMenu'
import '../styles/landingPage.scss'
import Header from './Header'

const LandingPage = () => {
    const { dashboardTitleRef, dashboardConainerRef, headerRef, characterRef, backgroundContainerRef } = useLandingPageAimation()

    return <div ref={dashboardConainerRef} className="dashboard_body1">
        <div ref={headerRef}><Header /></div>
        <div ref={backgroundContainerRef} className='background_container'></div>
        <div className="dashboard_character_container">
            <div ref={characterRef} style={{ height: '90vh' }}>
                <Lottie
                    animationData={dashboardCharacter}
                    className="dashboard_character"
                    style={{ height: '90vh' }}
                />
            </div>
            <div ref={dashboardTitleRef} className='dashboard_title'>
                <img src={kawsBunny} alt="" />
                <h1>DEVELOPER</h1>
                <img src={kawsBunny} alt="" />
                <h1>DEVELOPER</h1>
                <img src={kawsBunny} alt="" />
                <h1>DEVELOPER</h1>
                <img src={kawsBunny} alt="" />
            </div>
        </div>
        <ActionMenu />
    </div>
}



export default LandingPage