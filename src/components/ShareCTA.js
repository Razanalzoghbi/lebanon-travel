import PromoBanner from "./PromoBanner";

// A friendly call to action at the bottom of the home page
function ShareCTA() {
  return (
    <div className="container mt-5 mb-5">
      <PromoBanner
        variant="light"
        emoji="✍️"
        title="Been somewhere great in Lebanon?"
        text="Tell other travelers about it. Your story could help someone plan their next trip."
        to="/share-experience"
        button="+ Share Your Experience"
      />
    </div>
  );
}

export default ShareCTA;