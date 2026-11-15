import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PromoBanner from "../components/PromoBanner";

const STYLE = `
  .ab-hero {
    position: relative; min-height: 340px; display: flex; align-items: center; justify-content: center;
    text-align: center; color: #fff; padding: 3rem 1rem;
    background: linear-gradient(rgba(10,30,50,.55), rgba(10,30,50,.55)), url('/images/nature.jpeg') center / cover;
  }
  .ab-hero h1 { font-weight: 800; font-size: clamp(2rem, 5vw, 3rem); }
  .ab-hero p { max-width: 760px; margin: .75rem auto 0; font-size: 1.05rem; opacity: .95; }

  .ab-facts { margin-top: -42px; position: relative; z-index: 2; }
  .ab-fact {
    background: #fff; border-radius: 16px; padding: 1rem 1.1rem; text-align: center;
    box-shadow: 0 6px 20px rgba(0,0,0,.10); height: 100%;
  }
  .ab-fact .ab-ico { font-size: 1.6rem; }
  .ab-fact .ab-val { font-weight: 800; font-size: 1.15rem; color: #1c4f8f; }
  .ab-fact .ab-lbl { font-size: .8rem; color: #6b7480; text-transform: uppercase; letter-spacing: .05em; }

  .ab-section { padding: 3rem 0 .5rem; }
  .ab-title { border-left: 5px solid #1f7fc9; padding-left: .75rem; font-weight: 800; margin-bottom: 1rem; }
  .ab-text p { color: #4a5360; line-height: 1.75; font-size: 1.02rem; }

  .ab-img { width: 100%; height: 100%; object-fit: cover; border-radius: 16px; box-shadow: 0 4px 14px rgba(0,0,0,.12); display: block; }
  .ab-img-box { aspect-ratio: 3 / 4; }
  .ab-img-sq { aspect-ratio: 1 / 1; }
  .ab-img-contain { object-fit: contain; background: #f4f1ea; }

  .ab-quote {
    background: #eaf3fb; border-radius: 16px; padding: 1.5rem 1.75rem; border-left: 5px solid #1f7fc9;
    color: #1c4f8f; font-size: 1.1rem; font-weight: 600;
  }
`;

const FACTS = [
  { ico: "🏙️", val: "Beirut", lbl: "Capital" },
  { ico: "📐", val: "10,452 km²", lbl: "Area" },
  { ico: "🗣️", val: "Arabic · French · English", lbl: "Languages" },
  { ico: "☀️", val: "Mediterranean", lbl: "Climate" },
];

function AboutPage() {
  return (
    <div>
      <style>{STYLE}</style>
      <Navbar />

      <div className="ab-hero">
        <div>
          <h1>About Lebanon</h1>
          <p>
            Lebanon, officially the Lebanese Republic, is a small mountainous country located on the eastern coast of
            the Mediterranean Sea. Despite its size, it has a rich and complex history and a diverse population.
          </p>
        </div>
      </div>

      <div className="container">
        {/* quick facts */}
        <div className="row g-3 ab-facts">
          {FACTS.map((f) => (
            <div className="col-6 col-md-3" key={f.lbl}>
              <div className="ab-fact">
                <div className="ab-ico">{f.ico}</div>
                <div className="ab-val">{f.val}</div>
                <div className="ab-lbl">{f.lbl}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="ab-text mt-5">
          <p className="lead text-center mx-auto" style={{ maxWidth: 820, fontWeight: 500, color: "#2f3a48" }}>
            Known as a bridge between the Middle East and the West, Lebanon combines tradition and modern life. Its
            capital, Beirut, is a vibrant and cosmopolitan city full of life.
          </p>
        </div>

        {/* nature */}
        <section className="ab-section">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6 ab-text">
              <h2 className="ab-title">Nature in Lebanon</h2>
              <p>
                Lebanon is famous for its stunning natural landscapes. From the green villages of the south to the snowy
                mountains and forests, the country offers a unique mix of beauty. Lebanon is also one of the few
                countries in the region with no desert.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 ab-img-box">
                  <img src="/images/nature.jpeg" className="ab-img" alt="Lebanese Nature 1" loading="lazy" />
                </div>
                <div className="col-6 ab-img-box">
                  <img src="/images/nature1.jpeg" className="ab-img" alt="Lebanese Nature 2" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* culture */}
        <section className="ab-section">
          <div className="row g-4 align-items-center flex-lg-row-reverse">
            <div className="col-lg-6 ab-text">
              <h2 className="ab-title">Lebanese Culture and Languages</h2>
              <p>
                Lebanese culture is rich and diverse, shaped by history and different civilizations. It is known for its
                hospitality, traditions, and celebrations. People enjoy music, festivals, and social gatherings.
              </p>
              <p>
                Lebanon is also famous for its unique identity, its proud southern spirit, and its beautiful national
                flag.
              </p>
              <p>
                Lebanon is known for its linguistic diversity. While Arabic is the official language, many Lebanese
                people also speak French and English.
              </p>
              <p>
                In addition, the Lebanese dialect varies from one region to another. Each area has its own accent and
                expressions, which makes communication unique and reflects the rich cultural diversity of the country.
              </p>
              <p>This diversity in language and dialect is an important part of Lebanese identity and daily life.</p>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 ab-img-box">
                  <img src="/images/culture.jpeg" className="ab-img" alt="Lebanese Culture 1" loading="lazy" />
                </div>
                <div className="col-6 ab-img-box">
                  <img
                    src="/images/culture1.jpeg"
                    className="ab-img ab-img-contain"
                    alt="Lebanese Culture 2"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* food */}
        <section className="ab-section">
          <h2 className="ab-title">Lebanese Food</h2>
          <div className="ab-text" style={{ maxWidth: 900 }}>
            <p>
              Lebanese cuisine is one of the most popular in the world. It is known for its fresh ingredients and
              delicious flavors.
            </p>
            <p>
              Popular dishes include tabbouleh, hummus, shawarma, and grilled meats. Lebanese food is often served as
              mezze, a variety of small dishes shared with others.
            </p>
            <p>
              Lebanon is also famous for its traditional desserts, such as baklava, knefeh, and maamoul, which are loved
              for their rich taste and unique flavors.
            </p>
          </div>
          <div className="row g-3 mt-1">
            {[
              ["food.jpeg", "Lebanese Food"],
              ["food1.jpeg", "Lebanese Mezze"],
              ["sweet.jpeg", "Lebanese Sweets Baklava"],
              ["sweet1.jpeg", "Lebanese Knefeh"],
            ].map(([file, alt]) => (
              <div className="col-6 col-lg-3 ab-img-sq" key={file}>
                <img src={`/images/${file}`} className="ab-img" alt={alt} loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* geography */}
        <section className="ab-section">
          <div className="row g-4">
            <div className="col-lg-7 ab-text">
              <h2 className="ab-title">Geography</h2>
              <p>
                Lebanon covers an area of about 10,452 square kilometers. It includes a narrow coastal plain, the
                Lebanon Mountains, the Bekaa Valley, and the Anti-Lebanon range.
              </p>
              <p>Its Mediterranean climate makes it a great destination all year round.</p>
            </div>
            <div className="col-lg-5 d-flex align-items-center">
              <div className="ab-quote">
                🏖️ ⛰️ One of the unique features of Lebanon is that visitors can enjoy the beach and the mountains on
                the same day, especially during spring and autumn.
              </div>
            </div>
          </div>
        </section>

        {/* tourism */}
        <section className="ab-section">
          <h2 className="ab-title">Tourism in Lebanon</h2>
          <div className="ab-text" style={{ maxWidth: 900 }}>
            <p>
              Lebanon was once known as the "Switzerland of the Middle East" due to its mountains, snow, and strong
              economy. Beirut was also called the "Paris of the Middle East".
            </p>
            <p>
              Today, Lebanon continues to attract visitors with its beaches, mountains, historical sites, and vibrant
              cities.
            </p>
          </div>
        </section>

        <PromoBanner
          className="my-5"
          image="/images/raouche.jpeg"
          emoji="🌍"
          title="Ready to explore Lebanon?"
          text="Browse our destinations and plan your trip."
          to="/destinations"
          button="Explore destinations →"
        />
      </div>

      <Footer />
    </div>
  );
}

export default AboutPage;