import XContainer from '../../components/Container/XContainer';
import YContainer from '../../components/Container/YContainer';
import './About.css';

const About = () => {
  return (
    <XContainer>
      <YContainer>
        <div className="about-hero">
          <h1 className="about-title">About Us</h1>
          <p className="about-subtitle">
            Where tradition meets taste. Discover the heart and story of Rab Di Rasoi.
          </p>
        </div>

        <section className="about-section">
          <div className="about-image" />
          <div className="about-text">
            <p>
              Welcome to <strong>Rab Di Rasoi</strong>, where tradition is baked into every bite.
              We specialize in handcrafted baked goods created with love and authenticity.
            </p>
            <p>
              From festive delights to comforting classics, each product reflects our deep culinary
              roots and a passion for quality.
            </p>
            <p>
              Our mission is to bring joy, warmth, and a touch of home through every treat we share.
            </p>
            <p>
              Thank you for being a part of our journey. Stay connected for more delicious moments.
            </p>
          </div>
        </section>
      </YContainer>
    </XContainer>
  );
};

export default About;
