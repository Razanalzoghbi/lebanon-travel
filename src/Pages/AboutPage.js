import React from "react";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

function AboutPage() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center title mb-4">About Lebanon</h1>

        <p className="text-center">
          Lebanon, officially the Lebanese Republic, is a small mountainous country located on the eastern coast of the Mediterranean Sea. Despite its size, it has a rich and complex history and a diverse population.
        </p>

        <p className="text-center">
          Known as a bridge between the Middle East and the West, Lebanon combines tradition and modern life. Its capital, Beirut, is a vibrant and cosmopolitan city full of life.
        </p>

        <h2 className="text-center mt-5">Nature in Lebanon</h2>
        <p>
          Lebanon is famous for its stunning natural landscapes. From the green villages of the south to the snowy mountains and forests, the country offers a unique mix of beauty. Lebanon is also one of the few countries in the region with no desert.
        </p>

        <div className="row">
          <div className="col-md-6">
            <img src="images/nature.jpeg" className="img-fluid w-100 card-img mb-3" alt="Lebanese Nature 1" />
          </div>
          <div className="col-md-6">
            <img src="images/nature1.jpeg" className="img-fluid w-100 card-img mb-3" alt="Lebanese Nature 2" />
          </div>
        </div>

        <h2 className="text-center mt-5">Lebanese Culture and Languages</h2>
        <p>
          Lebanese culture is rich and diverse, shaped by history and different civilizations. It is known for its hospitality, traditions, and celebrations. People enjoy music, festivals, and social gatherings.
        </p>
        <p>
          Lebanon is also famous for its unique identity, its proud southern spirit, and its beautiful national flag.
        </p>
        <p>
          Lebanon is known for its linguistic diversity. While Arabic is the official language, many Lebanese people also speak French and English.
        </p>
        <p>
          In addition, the Lebanese dialect varies from one region to another. Each area has its own accent and expressions, which makes communication unique and reflects the rich cultural diversity of the country.
        </p>
        <p>
          This diversity in language and dialect is an important part of Lebanese identity and daily life.
        </p>

        <div className="row">
          <div className="col-md-6">
            <img src="images/culture.jpeg" className="img-fluid w-100 card-img mb-3" alt="Lebanese Culture 1" />
          </div>
          <div className="col-md-6">
            <img src="images/culture1.jpeg" className="img-fluid w-100 card-img mb-3" alt="Lebanese Culture 2" />
          </div>
        </div>

        <h2 className="text-center mt-5">Lebanese Food</h2>
        <p>
          Lebanese cuisine is one of the most popular in the world. It is known for its fresh ingredients and delicious flavors.
        </p>
        <p>
          Popular dishes include tabbouleh, hummus, shawarma, and grilled meats. Lebanese food is often served as mezze, a variety of small dishes shared with others.
        </p>
        <p>
          Lebanon is also famous for its traditional desserts, such as baklava, knefeh, and maamoul, which are loved for their rich taste and unique flavors.
        </p>

        <div className="row">
          <div className="col-md-6">
            <img src="images/food.jpeg" className="img-fluid w-100 card-img mb-3" alt="Lebanese Food" />
          </div>
          <div className="col-md-6">
            <img src="images/food1.jpeg" className="img-fluid w-100 card-img mb-3" alt="Lebanese Mezze" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <img src="images/sweet.jpeg" className="img-fluid w-100 card-img mb-3" alt="Lebanese Sweets Baklava" />
          </div>
          <div className="col-md-6">
            <img src="images/sweet1.jpeg" className="img-fluid w-100 card-img mb-3" alt="Lebanese Knefeh" />
          </div>
        </div>

        <h2 className="text-center mt-5">Geography</h2>
        <p>
          Lebanon covers an area of about 10,452 square kilometers. It includes a narrow coastal plain, the Lebanon Mountains, the Bekaa Valley, and the Anti-Lebanon range.
        </p>
        <p>
          Its Mediterranean climate makes it a great destination all year round.
        </p>
        <p>
          One of the unique features of Lebanon is that visitors can enjoy the beach and the mountains on the same day, especially during spring and autumn.
        </p>

        <h2 className="text-center mt-5">Tourism in Lebanon</h2>
        <p>
          Lebanon was once known as the "Switzerland of the Middle East" due to its mountains, snow, and strong economy. Beirut was also called the "Paris of the Middle East".
        </p>
        <p>
          Today, Lebanon continues to attract visitors with its beaches, mountains, historical sites, and vibrant cities.
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default AboutPage;