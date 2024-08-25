import "./Contact.css"
import Queries from "./Queries";
import { useState } from "react"

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
            <a class="phone-link" href="tel:+918533097707">
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
            <div>
              <h1>About Our Products</h1>
              <hr />
              <Queries
                header="Do you offer customized products?"
                content="Yes, we provide customized cakes for special occasions. You can choose the flavor, design, and decorations based on your preferences. Contact us in advance to discuss your requirements."
                showMore={activeQueryIndex === 0}
                onClick={() => handleQueryClick(0)}
              />
              <Queries
                header="Storage Instructions and Shelf Life"
                content="Storing cakes in the refrigerator is recommended. Brownies should be stored in an airtight container at room temperature, ensuring they are completely cooled before storage. Cut them into portions and consider placing parchment paper between layers to prevent sticking. Chocolates, on the other hand, should be stored in a cool, dry place, shielded from direct sunlight and heat sources. Airtight containers or resealable bags are recommended."
                showMore={activeQueryIndex === 1}
                onClick={() => handleQueryClick(1)}
              />
              <Queries
                header="What flavors do you offer for your cakes?"
                content="We offer a variety of flavors, including classic options like vanilla, chocolate, and strawberry, as well as specialty flavors like red velvet, lemon, and more. Check our menu for the full list."
                showMore={activeQueryIndex === 2}
                onClick={() => handleQueryClick(2)}
              />
              <Queries
                header="Storage Instructions and Shelf Life"
                content="If you placed an order with a third party vendor (DoorDash/Caviar/UberEats/Postmates/Grubhub), and something has gone wrong, please reach out directly to the third party vendor or the bakery it was picked up from for further assistance."
                showMore={activeQueryIndex === 3}
                onClick={() => handleQueryClick(3)}
              />
            </div>
            <div>
              <h1>Orders</h1>
              <hr />
              <Queries
                header="How do I place an order?"
                content="If you placed an order with a third party vendor (DoorDash/Caviar/UberEats/Postmates/Grubhub), and something has gone wrong, please reach out directly to the third party vendor or the bakery it was picked up from for further assistance."
                showMore={activeQueryIndex === 4}
                onClick={() => handleQueryClick(4)}
              />
              <Queries
                header="Can we add cake writing?"
                content="You can add script to your cake if you are planning to pick it up from out bakery. We do not offer script on cakes that are being delivered."
                showMore={activeQueryIndex === 5}
                onClick={() => handleQueryClick(5)}
              />
              <Queries
                header="Can I request a specific design for my cake?"
                content="Absolutely! We welcome custom design requests. Whether it's for a birthday, wedding, or any special event, let us know your theme or ideas, and we'll work with you to create a unique and beautiful cake."
                showMore={activeQueryIndex === 6}
                onClick={() => handleQueryClick(6)}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
