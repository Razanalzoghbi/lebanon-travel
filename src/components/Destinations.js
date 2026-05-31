import { useState } from "react";
import { Link } from "react-router-dom";

function Destinations() {
  const [search, setSearch] = useState("");
  
  const searchLower = search.toLowerCase();

  const found =
    "beirut".includes(searchLower) ||
    "byblos".includes(searchLower) ||
    "tripoli".includes(searchLower) ||
    "baalbek".includes(searchLower) ||
    "zahle".includes(searchLower) ||
    "chouf".includes(searchLower) ||
    "harissa".includes(searchLower) ||
    "harisa".includes(searchLower) ||
    "tyre".includes(searchLower) ||
    "saida".includes(searchLower) ||
    "jounieh".includes(searchLower) ||
    "faraya".includes(searchLower) ||
    "batroun".includes(searchLower) ||
    search === "";

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Explore Lebanon</h1>

      <div className="mb-5 d-flex justify-content-center">
        <div className="input-group w-50">
          <input
            type="text"
            placeholder="Search destination..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="input-group-text">🔍</span>
        </div>
      </div>

      {(search === "" || 
        "beirut".includes(searchLower) || 
        "byblos".includes(searchLower) || 
        "jounieh".includes(searchLower) || 
        "harissa".includes(searchLower) || 
        "harisa".includes(searchLower) || 
        "chouf".includes(searchLower) || 
        "faraya".includes(searchLower)) && (
        <>
          <h2 className="mb-3">Beirut & Mount Lebanon</h2>
          <div className="row">
            {(search === "" || "beirut".includes(searchLower)) && (
              <div className="col-md-6">
                <div className="card mb-4">
                  <img src="/images/beirut.jpeg" alt="Beirut" className="img-fluid w-100 card-img" />
                  <div className="card-body text-center">
                    <h5>Beirut</h5>
                    <Link to="/beirut" className="btn btn-primary">Explore</Link>
                  </div>
                </div>
              </div>
            )}

            {(search === "" || "byblos".includes(searchLower)) && (
              <div className="col-md-6">
                <div className="card mb-4">
                  <img src="/images/byblos.jpeg" alt="Byblos" className="img-fluid w-100 card-img" />
                  <div className="card-body text-center">
                    <h5>Byblos</h5>
                    <Link to="/byblos" className="btn btn-primary">Explore</Link>
                  </div>
                </div>
              </div>
            )}

            {(search === "" || "jounieh".includes(searchLower)) && (
              <div className="col-md-6">
                <div className="card mb-4">
                  <img src="/images/jounieh.jpeg" alt="Jounieh" className="img-fluid w-100 card-img" />
                  <div className="card-body text-center">
                    <h5>Jounieh</h5>
                    <Link to="/jounieh" className="btn btn-primary">Explore</Link>
                  </div>
                </div>
              </div>
            )}

            {(search === "" || "harisa".includes(searchLower) || "harissa".includes(searchLower)) && (
              <div className="col-md-6">
                <div className="card mb-4">
                  <img src="/images/harissa.jpeg" alt="harisa" className="img-fluid w-100 card-img" />
                  <div className="card-body text-center">
                    <h5>Harissa</h5>
                    <Link to="/harissa" className="btn btn-primary">Explore</Link>
                  </div>
                </div>
              </div>
            )}

            {(search === "" || "chouf".includes(searchLower)) && (
              <div className="col-md-6">
                <div className="card mb-4">
                  <img src="/images/chouf.jpeg" alt="chouf" className="img-fluid w-100 card-img" />
                  <div className="card-body text-center">
                    <h5>Chouf</h5>
                    <Link to="/chouf" className="btn btn-primary">Explore</Link>
                  </div>
                </div>
              </div>
            )}

            {(search === "" || "faraya".includes(searchLower)) && (
              <div className="col-md-6">
                <div className="card mb-4">
                  <img src="/images/faraya.jpeg" alt="faraya" className="img-fluid w-100 card-img" />
                  <div className="card-body text-center">
                    <h5>Fraya</h5>
                    <Link to="/faraya" className="btn btn-primary">Explore</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {(search === "" || "tripoli".includes(searchLower) || "batroun".includes(searchLower)) && (
        <>
          <h2 className="mb-3">North Lebanon</h2>
          <div className="row">
            {(search === "" || "tripoli".includes(searchLower)) && (
              <div className="col-md-6">
                <div className="card mb-4">
                  <img src="/images/tripoli.jpeg" alt="Tripoli" className="img-fluid w-100 card-img" />
                  <div className="card-body text-center">
                    <h5>Tripoli</h5>
                    <Link to="/tripoli" className="btn btn-success">Explore</Link>
                  </div>
                </div>
              </div>
            )}

            {(search === "" || "batroun".includes(searchLower)) && (
              <div className="col-md-6">
                <div className="card mb-4">
                  <img src="/images/batroun.jpeg" alt="Batroun" className="img-fluid w-100 card-img" />
                  <div className="card-body text-center">
                    <h5>Batroun</h5>
                    <Link to="/batroun" className="btn btn-success">Explore</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {(search === "" || "tyre".includes(searchLower) || "saida".includes(searchLower)) && (
        <>
          <h2 className="mb-3">South Lebanon</h2>
          <div className="row">
            {(search === "" || "tyre".includes(searchLower)) && (
              <div className="col-md-6">
                <div className="card mb-4">
                  <img src="/images/tyre.jpeg" alt="Tyre" className="img-fluid w-100 card-img" />
                  <div className="card-body text-center">
                    <h5>Tyre</h5>
                    <Link to="/tyre" className="btn btn-danger">Explore</Link>
                  </div>
                </div>
              </div>
            )}

            {(search === "" || "saida".includes(searchLower)) && (
              <div className="col-md-6">
                <div className="card mb-4">
                  <img src="/images/saida.jpeg" alt="Saida" className="img-fluid w-100 card-img" />
                  <div className="card-body text-center">
                    <h5>Saida</h5>
                    <Link to="/saida" className="btn btn-danger">Explore</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {(search === "" || "baalbek".includes(searchLower) || "zahle".includes(searchLower)) && (
        <>
          <h2 className="mb-3">Bekaa</h2>
          <div className="row">
            {(search === "" || "baalbek".includes(searchLower)) && (
              <div className="col-md-6">
                <div className="card mb-4">
                  <img src="/images/baalbek.jpeg" alt="Baalbek" className="img-fluid w-100 card-img" />
                  <div className="card-body text-center">
                    <h5>Baalbek</h5>
                    <Link to="/baalbek" className="btn btn-warning">Explore</Link>
                  </div>
                </div>
              </div>
            )}

            {(search === "" || "zahle".includes(searchLower)) && (
              <div className="col-md-6">
                <div className="card mb-4">
                  <img src="/images/zahle.jpeg" alt="Zahle" className="img-fluid w-100 card-img" />
                  <div className="card-body text-center">
                    <h5>Zahle</h5>
                    <Link to="/zahle" className="btn btn-warning">Explore</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {!found && (
        <h3 className="text-center mt-5 text-muted">
          No destinations found 🔍
        </h3>
      )}
    </div>
  );
}

export default Destinations;