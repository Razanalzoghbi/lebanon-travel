const ITEMS = [
  { src: "/images/tours.jpeg", alt: "Tours", text: "Tour of archaeological sites." },
  { src: "/images/beaches.jpeg", alt: "Beaches", text: "Lebanon Beaches." },
  { src: "/images/foods.jpeg", alt: "Foods", text: "Traditional Lebanese Food." },
  { src: "/images/activities.jpeg", alt: "Activities", text: "Beautiful And Fun Activities." },
];

function ThingsToDo() {
  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">Some Things To Do</h2>

      <div className="row">
        {ITEMS.map((item) => (
          <div key={item.alt} className="col-12 col-md-6 col-lg-3">
            <div className="card mb-4 h-100 shadow-sm">
              <img
                src={item.src}
                alt={item.alt}
                className="w-100 card-img-top"
                style={{ height: 180, objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h6 className="mb-0">{item.text}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThingsToDo;