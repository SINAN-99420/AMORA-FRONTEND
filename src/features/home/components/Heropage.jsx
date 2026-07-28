// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../Heropage.css";

// import hero11 from '../../../assets/heroimage-12.jpeg'
// import hero21 from '../../../assets/heroimage-21.jpeg'

// const Heropage = () => {

//   // Backend Response Example
//   const heroSlides = [
//     {
//       id: 5,
//       image: hero11,
//       title: "Timeless Elegance",
//       description:
//         "Discover handwoven heritage sarees crafted to celebrate your golden moments.",
//     },
//     {
//       id: 2,
//       image: hero21 ,
//       title: "Luxury Collection",
//       description:
//         "Every saree tells a story of tradition, elegance and craftsmanship.",
//     },
//     {
//       id: 3,
//       image:
//         "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1920",
//       title: "Festive Edition",
//       description:
//         "Celebrate every occasion with timeless beauty and graceful designs.",
//     },
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Auto Slide
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) =>
//         prev === heroSlides.length - 1 ? 0 : prev + 1
//       );
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [heroSlides.length]);

//   return (
//     <section className="hero">

//       {heroSlides.map((slide, index) => (
//         <div
//           key={slide.id}
//           className={`hero-slide ${
//             currentSlide === index ? "active" : ""
//           }`}
//         >
//           <img src={slide.image} alt={slide.title} className="hero-image" />

//           <div className="hero-overlay"></div>

//           <div className="hero-content">
//             <span className="hero-subtitle">
//               THE FESTIVE COLLECTION
//             </span>

//             <h1>{slide.title}</h1>

//             <p>{slide.description}</p>

//             <Link to="/shop" className="shop-btn">
//               Explore Collection
//             </Link>
//           </div>
//         </div>
//       ))}

//       <div className="hero-dots">
//         {heroSlides.map((_, index) => (
//           <button
//             key={index}
//             className={`dot ${
//               currentSlide === index ? "active-dot" : ""
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           >
//             <span>{index + 1}</span>
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Heropage;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Heropage.css";

import Hero_Query from "../queries/Hero_Query";

const Heropage = () => {

  const { data: heroSlides = [] } = Hero_Query();

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto Slide
  useEffect(() => {

    if (heroSlides.length === 0) return;

    const timer = setInterval(() => {

      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );

    }, 5000);

    return () => clearInterval(timer);

  }, [heroSlides.length]);

  if (heroSlides.length === 0) {
    return null;
  }

  return (
    <section className="hero">

      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${
            currentSlide === index ? "active" : ""
          }`}
        >

          <img
            src={`http://localhost:8000${slide.image}`}
            alt={slide.title}
            className="hero-image"
          />

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <span className="hero-subtitle">
              {slide.subtitle}
            </span>

            <h1>
              {slide.title}
            </h1>

            <p>
              {slide.description}
            </p>

            <Link
              to="/shop"
              className="shop-btn"
            >
              {slide.button_text}
            </Link>

          </div>

        </div>
      ))}

      <div className="hero-dots">

        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`dot ${
              currentSlide === index ? "active-dot" : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          >
            <span>{index + 1}</span>
          </button>
        ))}

      </div>

    </section>
  );
};

export default Heropage;