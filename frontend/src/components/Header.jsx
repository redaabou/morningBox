import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Perform logout logic (e.g., clear token and userInfo from localStorage)
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className='flex shadow-md py-4 px-4 sm:px-10 bg-white font-sans min-h-[70px] tracking-wide relative z-50 w-full'>
      <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
        <a href="/" className='flex items-center'>
          <img src="https://freesvg.org/img/chef-restaurant-logo-publicdomainvectors.png" alt="logo" className='w-8' />
          <span className='text-black font-bold text-base sm:text-xs md:text-base lg:text-xl xl:text-2xl ml-2'>Morningbox</span>
        </a>

        <div className={`lg:block ${isMenuOpen ? 'block' : 'hidden'} max-lg:fixed max-lg:bg-black/50 max-lg:inset-0 max-lg:z-50`}>
          <div className="lg:hidden fixed top-2 right-4 z-[100]">
            <button onClick={toggleMenu} className="rounded-full bg-white p-3">
              <X className="w-4 h-4" />
            </button>
          </div>

          <ul className='lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
            <li className='mb-6 hidden max-lg:block'>
              <a href="/">
                <img src="https://freesvg.org/img/chef-restaurant-logo-publicdomainvectors.png" alt="logo" className='w-28' />
              </a>
            </li>
            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
              <a href='/' className='hover:text-rose-600 text-rose-600 block font-semibold text-[15px]'>Home</a>
            </li>
            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
              <a href='/team' className='hover:text-rose-600 text-gray-500 block font-semibold text-[15px]'>Team</a>
            </li>
            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
              <a href='/feature' className='hover:text-rose-600 text-gray-500 block font-semibold text-[15px]'>Feature</a>
            </li>
            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
              <a href='/blog' className='hover:text-rose-600 text-gray-500 block font-semibold text-[15px]'>Blog</a>
            </li>
            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
              <a href='/about' className='hover:text-rose-600 text-gray-500 block font-semibold text-[15px]'>About</a>
            </li>
            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
              <a href='/contact' className='hover:text-rose-600 text-gray-500 block font-semibold text-[15px]'>Contact</a>
            </li>
          </ul>
        </div>

        <div className='flex max-lg:ml-auto space-x-3'>
          {user ? (
            <button onClick={handleLogout} className='px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-full font-bold text-white border-2 border-rose-600 bg-rose-600 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-rose-600'>
              Logout
            </button>
          ) : (
            <>
              <a href='/login'>
                <button className='px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-full font-bold text-white border-2 border-rose-600 bg-rose-600 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-rose-600'>
                  Login
                </button>
              </a>
              <a href="/signup">
                <button className='px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-full font-bold text-white border-2 border-rose-600 bg-rose-600 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-rose-600'>
                  Sign up
                </button>
              </a>
            </>
          )}

          <button onClick={toggleMenu} className='lg:hidden'>
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>
  );
}