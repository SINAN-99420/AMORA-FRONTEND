import React from 'react'
import './Home.css'

import Lady from '../../assets/treditionalLady.jpg'

import Men from '../../assets/Treditional Men2.jpg'

import Our_speciality from './components/Our_speciality';
import Shop_by_category from './components/Shop_by_category';
import New_Arrival_Home from './components/New_Arrival_Home';
import Offer_poster from '../../hooks/offers/page/Offer_poster';
import { NavLink } from 'react-router-dom'
import Category_hooks from '../../hooks/Category_hooks'
import Offer_Query from '../../hooks/offers/queries/Offer_Query'
import Heropage from './components/Heropage'
import Navbar from '../../components/Navbar'

function Home() {

    const sections = [
        {
            title: "Our Heritage",
            text: "Rooted in tradition and refined through generations, Amora represents timeless craftsmanship where every creation carries a story of elegance and dedication."
        }
    ];

    return (

        <div>


            {/* hero page  */}
            <div>
                <Heropage />
                {/* <HeroSlider /> */}
            </div>

            {/* our speciality  */}
            <div>
                <Our_speciality />
            </div>

            {/* category */}
            <div style={{ background: '#fff', padding: '45px 4% 0px' }}>
                <Shop_by_category />
            </div>
            {/* new arivals */}
            <div>
                <New_Arrival_Home />
            </div>


            <div>
                <section className="section-heritage">

                    <div className="section-heritage-text">
                        <h2>
                            {sections[0].title}
                        </h2>

                        <p>
                            {sections[0].text}
                        </p>

                        <p>
                            From handcrafted details to exceptional fabrics, every Amora creation celebrates individuality and elegance.
                        </p>
                    </div>


                    <div className="section-heritage-gallery">

                        <img src={Lady} />

                        <img src={Men} />

                    </div>

                </section>
            </div>


            <div >
                <Offer_poster />
            </div>

        </div>
    )
}

export default Home
