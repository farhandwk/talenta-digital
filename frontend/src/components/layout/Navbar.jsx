// frontend/src/components/layout/Navbar.jsx

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import hamburger from "../../assets/ham.png"

const Navbar = ({ isOpen, toogleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(null)

  const handleSidebar = () => {
    setIsOpen(!isOpen)
  }

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true)
      }
      else {
        setIsMobile(false)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
  }, [])

  return (
    <nav className='w-full h-16 bg-white flex flex-row fixed top-0 items-center justify-between px-4 lg:px-12'>
      {isMobile ? (
        <>
        <button onClick={toogleSidebar}>
          <img src={hamburger} className='w-12'></img>
        </button>
        <Link to="/" className='text-[#0a5c36] font-bold text-2xl'>Talenta Digital</Link>
        </>
      ) : (
        <>
        <div className='flex flex-row gap-12'>
          <ul className='flex flex-row gap-6 pl-12'>
            {navDesktop2.map((item) => (
              <li key={item.id} className='font-semibold text-[#0a5c36]'>
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <ul className='flex flex-row gap-6 pl-12'>
            {user && (navDesktop.map((item) => (
              <li key={item.id} className='font-semibold text-[#0a5c36]'>
                <Link to={item.link}>{item.title}</Link>
              </li>
            )))}
          </ul>
        </div>
        <div className='flex flex-row gap-12 items-center'>
          <Link to="/" className='text-[#0a5c36] font-bold text-2xl'>Talenta Digital</Link>
          {user && (
            <div className={`flex flex-row gap-4 ${isMobile ? `hidden` : ``}`}>
              <img src={user.profilePicture || 'https://i.pravatar.cc/150'} className='w-12 rounded-full'></img>
              <div className='flex flex-col'>
                <span className='font-semibold text-md'>{user.name}</span>
                <span className='text-sm'>{user.role}</span>
              </div>
            </div>
          )}
        </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;