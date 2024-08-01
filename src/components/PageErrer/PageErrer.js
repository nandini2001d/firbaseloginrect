import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import { toast } from 'react-toastify'

export default function PageErrer() {
  useEffect(()=>{
    toast.info("400 page not found!");
  })
  return (
   <>
   <Navigation/>
   <div className='container text-center mt-5'>
    <div className='row'>
        <div className='col-lg-6 offset-lg-3 col-md-12'>
            <h2>400 Status</h2>
           <h3>Page Not Found ! </h3>
           <Link to={'/'}>Go to Home Page</Link>
        </div>
    </div>
   </div>
   
   </>
  )
}
