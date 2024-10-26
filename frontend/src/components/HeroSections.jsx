import React from 'react'

function HeroSections() {
  return (
    <main className="flex flex-col 
            items-center justify-center 
            pt-20 px-6 lg:flex-row 
            lg:items-center lg:justify-between
            lg:space-x-12">
                <div className="lg:max-w-xl
                lg:flex-1">
                    <h1 className="text-black 
                    text-4xl font-extrabold 
                    text-center lg:text-left
                    leading-tight mb-6">
                        Embark on a Culinary Journey
                        <br />
                        Where Every Bite is a Masterpiece
                        <br />
                        <span className="
                        text-rose-600">Flavorful 
                        Excellence</span>
                    </h1>
                    <p className="text-gray-700 
                    text-lg font-medium text-center
                    lg:text-left leading-relaxed mb-6">
                        Where Each Plate Weaves a
                        Story of Culinary Mastery and 
                        Passionate
                        Craftsmanship
                    </p>
                    <button className="bg-rose-600 
                    text-white text-lg font-semibold 
                    py-3 px-6 rounded-full shadow-md
                    hover:bg-rose-700 transition-colors">
                        Login
                    </button>
                </div>

                <div className="relative w-full max-w-sm
                lg:w-1/2 lg:max-w-md lg:h-96 mt-8 lg:mt-0">
                    <div className="absolute inset-0 
                    bg-red-600 rounded-full"></div>
                    <img
                        className="relative w-full h-full 
                        object-cover rounded-full border-4
                        border-white" src="
                   https://popmenucloud.com/cdn-cgi/image/width%3D1920%2Cheight%3D1920%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/gfjdzirv/b887d9af-3daa-4019-b92a-571eeee92ce4"
                        alt="Placeholder"
                    />
                </div>
            </main>
  )
}

export default HeroSections