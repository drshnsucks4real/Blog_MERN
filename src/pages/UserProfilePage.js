import React from 'react'
import NavBar from '../components/common/NavBar'
import ProfileSection from '../components/profile/ProfileSection'
import { motion } from 'framer-motion'
import Footer from '../components/common/footer/Footer'

const UserProfilePage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ height: '100vh', width: '100vw' }}>
            <NavBar />
            <ProfileSection />
            <Footer />
        </motion.div>
    )
}

export default UserProfilePage