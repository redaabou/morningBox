import React, { useState } from 'react';
import AddMenuForm from '../components/AddMenuForm';
import MenusList from '../components/MenusList';
import AddCafeteriaForm from '../components/AddCafeteriaForm';
import CafeteriaCard from '../components/CafeteriaCard';
import AssignManager from '../components/AssignManager';

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('AddMenuForm');

  const handleComponentClick = (component) => {
    setActiveComponent(component);
    console.log(`${component} clicked`);
  };

  return (
    <div className="flex">
      <nav className="bg-[#f7eded] h-full fixed top-0 left-0 py-6 font-[sans-serif] overflow-auto ">
        <ul className="space-y-1 mt-10">
          <li>
            <a href="javascript:void(0)" className="text-rose-600 text-sm flex flex-col items-center bg-[#fcfcfc] rounded px-4 py-5 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mb-3" viewBox="0 0 512 512">
                <path
                  d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                  data-original="#000000" />
              </svg>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)"
              onClick={() => handleComponentClick('AddMenuForm')}
              className="text-rose-600 text-sm flex flex-col items-center hover:bg-[#fefefe] rounded px-4 py-5 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mb-3" viewBox="0 0 24 24">
                <path
                  d="M18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4H6c-2.206 0-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0-2H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6z"
                  data-original="#000000" />
                <path d="M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z" data-original="#000000" />
                <path d="M6 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z" data-original="#000000" />
              </svg>
              <span className="">Ajouter Menu</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)"
              onClick={() => handleComponentClick('MenusList')}
              className="text-rose-600 text-sm flex flex-col items-center hover:bg-[#fefefe] rounded px-4 py-5 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mb-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span>List Menus</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)"
              onClick={() => handleComponentClick('AddCafeteriaForm')}
              className="text-rose-600 text-sm flex flex-col items-center hover:bg-[#fefefe] rounded px-4 py-5 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mb-3" viewBox="0 0 24 24">
                <path
                  d="M18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4H6c-2.206 0-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0-2H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6z"
                  data-original="#000000" />
                <path d="M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z" data-original="#000000" />
                <path d="M6 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z" data-original="#000000" />
              </svg>
              <span>Ajouter Cafeteria</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)"
              onClick={() => handleComponentClick('CafeteriaCard')}
              className="text-rose-600 text-sm flex flex-col items-center hover:bg-[#fefefe] rounded px-4 py-5 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mb-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span>List Cafeterias</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)"
              onClick={() => handleComponentClick('AssignManager')}
              className="text-rose-600 text-sm flex flex-col items-center hover:bg-[#fefefe] rounded px-4 py-5 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mb-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <span>Affecter gerant</span>
            </a>
          </li>
        </ul>
      </nav>
      {/* layout */}
      <main className="lg:ml-60 sm:m-6 md:ml-28 p-4 w-full">
        {activeComponent === 'AddMenuForm' && <AddMenuForm />}
        {activeComponent === 'MenusList' && <MenusList />}
        {activeComponent === 'AddCafeteriaForm' && <AddCafeteriaForm />}
        {activeComponent === 'CafeteriaCard' && <CafeteriaCard />}
        {activeComponent === 'AssignManager' && <AssignManager />}
      </main>
      <style jsx>{`
        @media (max-width: 768px) {
          nav {
            width: 100px;
            position: fixed;
          }
          main {
            margin-left: 100px;
          }
          nav ul li a {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
