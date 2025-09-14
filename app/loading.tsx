import React from 'react'

export default function Loading() {
  return (
    <div className='size-full bg-gray-950 flex justify-center items-center'>
        <div className="w-12 text-orange-600"><svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="6" width="2.8" height="12" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.1"></animate></rect><rect x="6" y="6" width="2.8" height="12" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.2"></animate></rect><rect x="11" y="6" width="2.8" height="12" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.3"></animate></rect><rect x="16" y="6" width="2.8" height="12" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.4"></animate></rect><rect x="21" y="6" width="2.8" height="12" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.5"></animate></rect></svg></div>
    </div>
  )
}
