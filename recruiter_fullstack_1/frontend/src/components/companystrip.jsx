import React from "react"
const logos = [
  { src: "/src/assets/logos/acme.svg", alt: "Acme" },
   { src: "/src/assets/logos/slider3.png", alt: "envoy" },
 
  // { src: "/src/assets/logos/images.png", alt: "Databurst" },
   { src: "/src/assets/logos/databurst.svg", alt: "Databurst" },
  { src: "/src/assets/logos/logo-bolt-company-17.png", alt: "Databurst" },
 
  { src: "/src/assets/logos/file-southern-company-logo-10.png", alt: "Databurst" },
 
  
  { src: "/src/assets/logos/companySlider.png", alt: "ByteWorks" },

  { src: "/src/assets/logos/slider3.png", alt: "envoy" },
   { src: "/src/assets/logos/file-american-broadcasting-company-logo-svg-8.png", alt: "envoy" },
  
   
]

export default function CompanyStrip({ speed = 50 }) {
  // speed = seconds for one full loop (adjusts with screen size via CSS too)
  return (
    // <div className="brand-slider border bg-white rounded-3 mb-4">
    //   <div
    //     className="brand-track"
    //     style={{ animationDuration: `${speed}s` }}
    //     aria-label="Trusted companies"
    //   >
    //     duplicate the list twice for a seamless loop
    //     {[...Array(2)].map((_, idx) => (
    //       <div className="brand-group" aria-hidden={idx === 1} key={idx}>
    //         {logos.map((l, i) => (
    //           <img className="brand-logo" src={l.src} alt={l.alt} key={`${idx}-${i}`} />
    //         ))}
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="brand-slider brand-slider--bleed border bg-white rounded-0 mb-4">
  <div
    className="brand-track"
    style={{ animationDuration: `${speed}s` }}
    aria-label="Trusted companies"
  >
    {[...Array(2)].map((_, idx) => (
      <div className="brand-group" aria-hidden={idx === 1} key={idx}>
        {logos.map((l, i) => (
          <img className="brand-logo" src={l.src} alt={l.alt} key={`${idx}-${i}`} />
        ))}
      </div>
    ))}
  </div>
</div>

  )
}
