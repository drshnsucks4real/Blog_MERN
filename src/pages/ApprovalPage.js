import React from 'react'
import NavBar from '../components/common/NavBar'
import Approval from '../components/admin/Approval'

const ApprovalPage = () => {
  return (
    <div style={{ height:'100vh', width:'100vw'}}>
        <NavBar/>
        <Approval/>
    </div>
  )
}

export default ApprovalPage