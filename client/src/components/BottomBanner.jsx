import React from 'react'
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className='relative mt-24'>
      <img src={assets.bottom_banner_image} alt="banner" className='w-full hidden md:block' />
      <img src={assets.bottom_banner_image_sm} alt="banner" className='w-full md:hidden' />

      <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 px-4 md:px-12 lg:px-24'>
        <h1 className='text-2xl md:text-3xl font-semibold text-primary mb-6 text-center md:text-center'>
          Why We Are the Best?
        </h1>

        <div className='space-y-4 w-full max-w-2xl'>
          {features.map((feature, index) => (
            <div
              key={index}
              className=' ml-26 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-white/70 p-3 rounded-lg'
            >
              {/* Icon with background and padding */}
              <div className="p-2 bg-[#DEF5E5] rounded-md flex items-center justify-center w-12 h-12 shrink-0">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className='w-6 h-6 object-contain'
                />
              </div>

              {/* Title and description */}
              <div className='text-left'>
                <h3 className='text-base md:text-lg font-semibold'>{feature.title}</h3>
                <p className='text-gray-500/80 text-sm md:text-base leading-tight'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BottomBanner
