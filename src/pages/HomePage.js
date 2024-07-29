import React from 'react'
import NavBar from '../components/common/NavBar'
import FeatureSection from '../components/home/FeatureSection'
import Footer from '../components/common/footer/Footer'
import CustomCarousel from '../components/home/Carousel/Carousel'
import { motion } from 'framer-motion';

const HomePage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div>
                <div style={{ zIndex: '1' }}>
                    <NavBar />
                </div>
                <CustomCarousel />
                <div style={{ zIndex: '2' }}>
                    <FeatureSection />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </motion.div>
    )
}

export default HomePage