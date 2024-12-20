import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import NewIssue from './newIssue'
import ViewIssues from './viewIssues'

function Home() {

const navigate=useNavigate()


  return (
    <div>
      <div>
        <h1 className='text-5xl font-bold text-center mt-20'>What do you need help with?</h1>
        <h1 className='text-3xl font-bold text-center mt-10'>Please choose from an option below</h1>
      </div>
      <div className='flex flex-col justify-center h-[20vh] mt-10 mx-[20%] space-y-4'>
        <Link to='/newIssue' className='btn btn-block btn-outline btn-sm btn-lg
         text-black border-black rounded-lg shadow-md px-4 py-2'>
          Ask for help
        </Link>
        <Link to='/viewIssues' className='btn btn-block btn-outline btn-sm btn-lg
         text-black border-black rounded-lg shadow-md px-4 py-2'>
          view previous issues
        </Link>
      </div>
    </div>
  )
}

export default Home
