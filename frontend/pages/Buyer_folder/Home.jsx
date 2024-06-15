import React from 'react';
import Navbar from '../../src/components/navbar';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import './home.css'; 

export default function Home() {
  const mission = [
    {
      img: "../../pic.jpeg",
      text: "Find your favourite artisian products. Support rural women's craftsmanship",
      title: "Artisian",
    },
    {
      img: "../../pic2.jpeg",
      text: "Explore artisians' creations and select your perfect handmade piece.",
      title: "Product Creation",
    },
    {
      img: "../../pic3.jpeg",
      text: "Review your order details. Get ready to receive your unique handmade item.",
      title: "Quality Control",
    },
  ];

  const collaborate = [
    {
      img: "../../pic.jpeg",
      text: "Collaborate with us to empower rural women artisans. By partnering, you help provide these talented women with the resources and market access they need to showcase their unique handmade products. Together, we can create sustainable livelihoods and uplift entire communities.",
      title: "Empowerment Through Partnership",
    },
    {
      img: "../../pic2.jpeg",
      text: "We invite you to join us in our mission to support rural women artisans. Your collaboration can make a significant difference, offering these women the opportunity to gain financial independence and improve their skills.",
      title: "Join Hands for a Brighter Future",
    },
    {
      img: "../../pic3.jpeg",
      text: "Become a partner in our journey to promote the artistry of rural women. By collaborating with us, you contribute to a cause that values tradition, craftsmanship, and empowerment.",
      title: "Crafting Change, One Product at a Time",
    },
  ];

  const slide= [
    "../../pic.jpeg","../../pic.jpeg","../../pic.jpeg","../../pic.jpeg","../../pic.jpeg"
  ]

  return (
    <div>
      <Navbar />
      
      <main className="home-container">
        <img src="../../hero.jpeg" alt="" className='hero'/>


        <p className="section-title">Our Mission</p>
        <hr className="line" />
        <div className="grid">
          {mission.map((el, i) => (
            <div className="card" key={i}>
              <img src={el.img} alt="" className="card-img" />
              <h1 className="card-title">{el.title}</h1>
              <p className="card-text">{el.text}</p>
            </div>
          ))}
        </div>
        <hr className="line" />
        <p className="section-title">Collaborate with ArtisianEmpower</p>
        <hr className="line" />
        <div className="collaborate-container">
          {collaborate.map((el, i) => (
            <div className="collaborate-card" key={i}>
              <img src={el.img} alt="" className="collaborate-img" />
              <div className="collaborate-text-container">
                <h1 className="collaborate-title">{el.title}</h1>
                <p className="collaborate-text">{el.text}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
