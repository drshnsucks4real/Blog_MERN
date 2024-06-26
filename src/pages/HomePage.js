import React from 'react'
import NavBar from '../components/common/NavBar'
import FeatureSection from '../components/home/FeatureSection'

const HomePage = () => {
    return (
        <div>
            <div>
                <div style={{ zIndex: '1' }}>
                    <NavBar />
                </div>
                {/*  */}
                <FeatureSection />
            </div>
        </div>
    )
}

export default HomePage