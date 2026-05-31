function ThingsToDo() {
  return (

    <div className="container mt-5">

      <h2 className="text-center fw-bold mb-4">
        Some Things To Do
      </h2>

      <div className="row">

        <div className="col-md-6">
          <div className="card mb-4">

            <img
              src="/images/tours.jpeg"
              alt="Tours"
              className="img-fluid w-100 card-img"
            />

            <div className="card-body text-center">
              <h5>Tour of archaeological sites.</h5>
            </div>

          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">

            <img
              src="/images/beaches.jpeg"
              alt="Beaches"
              className="img-fluid w-100 card-img"
            />

            <div className="card-body text-center">
              <h5>Lebanon Beaches.</h5>
            </div>

          </div>
        </div>

        <div className="col-md-6">
           <div className="card mb-4">

             <img
              src="/images/foods.jpeg"
              alt="Foods"
              className="img-fluid w-100 card-img"
            />

            <div className="card-body text-center">
              <h5>Traditional Lebanese Food.</h5>
            </div>

          </div>
        </div>

        <div className="col-md-6">
         <div className="card mb-4">

            <img
             src="/images/activities.jpeg"
             alt="Activities"
             className="img-fluid w-100 card-img"
           />

          <div className="card-body text-center">
             <h5>Beautiful And Fun Activities.</h5>
            </div>

         </div>
        </div>

    </div>
</div>

  );
}

export default ThingsToDo;