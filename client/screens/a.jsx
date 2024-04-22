import React from 'react';
import Slider from 'react-slick'; // Import the slider library (e.g., react-slick)

const TeamSlider = () => {
  // Example team data
  const teamMembers = [
    { name: 'John Doe', role: 'Developer', img: 'john.jpg' },
    { name: 'Jane Smith', role: 'Designer', img: 'jane.jpg' },
    // Add more team members as needed
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // Add more settings as needed
  };

  return (
    <Slider {...settings}>
      {teamMembers.map((member, index) => (
        <div key={index}>
          <img src={member.img} alt={member.name} />
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
      ))}
    </Slider>
  );
};

export default TeamSlider;
