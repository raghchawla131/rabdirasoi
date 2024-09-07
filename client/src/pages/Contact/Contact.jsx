import "./Contact.css";
import Queries from "./Queries";
import { useState } from "react";
import faqData from "./faqData"; // Import the FAQ data

export default function Contact() {
  const [activeQueryIndex, setActiveQueryIndex] = useState(null);

  const handleQueryClick = (index) => {
    setActiveQueryIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div id="contact">
        <div className="contact-us-details">
          <h3>Didn't find the answers you were looking for?</h3>
          <p className="contact-options">
            <ion-icon name="call-outline"></ion-icon>{" "}
            <a className="phone-link" href="tel:+918533097707">
              +91 8533097707
            </a>
          </p>
          <p className="contact-options">
            <ion-icon name="logo-instagram"></ion-icon>{" "}
            <a href="https://www.instagram.com/rabdirasoi/">rabdirasoi</a>
          </p>
          <p className="contact-options">
            <ion-icon name="logo-whatsapp"></ion-icon>
            <a href="whatsapp://send?phone=+918533097707">
              Send Message on WhatsApp
            </a>
          </p>
        </div>

        <div className="faq">
          <section className="faq-section">
            {faqData.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h1>{section.category}</h1>
                <hr />
                {section.questions.map((question, questionIndex) => {
                  const index = sectionIndex * 10 + questionIndex; // Unique index for each question
                  return (
                    <Queries
                      key={index}
                      header={question.header}
                      content={question.content}
                      showMore={activeQueryIndex === index}
                      onClick={() => handleQueryClick(index)}
                    />
                  );
                })}
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
