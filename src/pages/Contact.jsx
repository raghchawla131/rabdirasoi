import Queries from "../components/Queries";

export default function Contact() {
  return (
    <>
      <div id="contact">
        <div className="contact-us-details">
          <h3>Didn't find the answers you were looking for?</h3>
          <p>
            <ion-icon name="call-outline"></ion-icon>{" "}
            <a class="phone-link" href="tel:+918533097707">
              +91 8533097707
            </a>
          </p>
          <p>
            <ion-icon name="logo-instagram"></ion-icon>{" "}
            <a href="https://www.instagram.com/rabdirasoi/">rabdirasoi</a>
          </p>
          <p>
            <ion-icon name="logo-whatsapp"></ion-icon>
            <a href="whatsapp://send?phone=+918533097707">
              Send Message on WhatsApp
            </a>
          </p>
        </div>
        <div className="faq">
          <h2>Frequently Asked Questions</h2>
          <section className="faq-section">
            <div>
              <hr />
              <h1>About Our Products</h1>
              <hr />
              <Queries
                header="Do you offer customized products?"
                content="If you placed an order with a third party vendor (DoorDash/Caviar/UberEats/Postmates/Grubhub), and something has gone wrong, please reach out directly to the third party vendor or the bakery it was picked up from for further assistance."
              />
              <Queries
                header="Storage Instructions and Shelf Life"
                content="Storing cakes in the refrigerator is recommended. Brownies should be stored in an airtight container at room temperature, ensuring they are completely cooled before storage. Cut them into portions and consider placing parchment paper between layers to prevent sticking. Chocolates, on the other hand, should be stored in a cool, dry place, shielded from direct sunlight and heat sources. Airtight containers or resealable bags are recommended."
              />
              <Queries
                header="Storage Instructions and Shelf Life"
                content="If you placed an order with a third party vendor (DoorDash/Caviar/UberEats/Postmates/Grubhub), and something has gone wrong, please reach out directly to the third party vendor or the bakery it was picked up from for further assistance."
              />
            </div>
            <div>
              <hr />
              <h1>Orders</h1>
              <hr />
              <Queries
                header="How do I place an order?"
                content="If you placed an order with a third party vendor (DoorDash/Caviar/UberEats/Postmates/Grubhub), and something has gone wrong, please reach out directly to the third party vendor or the bakery it was picked up from for further assistance."
              />
              <Queries
                header="Can we add cake writing?"
                content="You can add script to your cake if you are planning to pick it up from out bakery. We do not offer script on cakes that are being delivered."
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
