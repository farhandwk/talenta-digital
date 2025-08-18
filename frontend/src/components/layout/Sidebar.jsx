import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import AuthContext from '../../contexts/AuthContext'

function Sidebar({ isOpen, toogleSidebar }) {
    const { user } = useContext(AuthContext)

    const navDesktop = [
        {id: 1, title: "Zona Asah Otak", link: "/quiz"},
        {id: 2, title: "Skill Lab", link: "/courses"},
        {id: 3, title: "Kompas Karier", link: "/career"},
        {id: 4, title: "Inkubator Wirausaha", link: "/projects"},
    ]

    const navDesktop2 = [
        {id: 1, title: "Leaderboard", link: "/leaderboard"},
        {id: 2, title: "Galery", link: "/projects/gallery"},
    ]

  return (
    <nav className='bg-[white] w-56 h-screen fixed top-0 right-0 z-1000 lg:hidden'
    style={{
        transform: isOpen ? "translateX(0%)" : "translateX(100%)",
        transition: "all 0.3s ease-in-out"
    }}
    >
        <div>
            {user && (
                <div className='flex flex-row justify-start gap-2 items-center px-4 pt-2'>
                    <img src={user.profilePicture || 'https://i.pravatar.cc/150'} referrerPolicy='no-referrer' className='rounded-full w-12'></img>
                    <div className='flex flex-col'>
                        <span className='font-semibold text-lg'>{user.name}</span>
                        <span className='font-regular text-sm'>{user.role}</span>
                    </div>
                </div>
            )}
        </div>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col p-6 px-8 gap-2'>
                {navDesktop.map((item) => (
                    <Link key={item.id} to={item.link} className='text-[#0a5c36] font-semibold text-md' onClick={toogleSidebar}>{item.title}</Link>
                ))}
            </div>
            <div className='flex flex-col px-8 gap-2'>
                {navDesktop2.map((item) => (
                    <Link key={item.id} to={item.link} className='text-[#0a5c36] font-semibold text-md' onClick={toogleSidebar}>{item.title}</Link>
                ))}
            </div>
        </div>
    </nav>
  )
}

export default Sidebar
