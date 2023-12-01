import React from "react";

function Home() {
  const featuresList = [
    {
      icon: "chat",
      title: "You are our #1 priority",
      text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      icon: "money",
      title: " More savings means higher rates",
      text: "The more you save with us, the higher your interest rate will be!",
    },
    {
      icon: "security",
      title: "Security you can trust",
      text: "We use top of the line encryption to make sure your data and moneyis always safe.",
    },
  ];
  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {featuresList.map((feature, index) => (
          <div className="feature-item" key={index}>
            <img
              src={`../img/icon-${feature.icon}.png`}
              alt={`${feature.icon} icon`}
              className="feature-icon"
            />
            <h3 className="feature-item-title">{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;
