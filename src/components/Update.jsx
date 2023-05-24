import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const [values, setValues] = useState({
    id: id,
    vrsta: "",
    velicina: "",
    boja: "",
    slika: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/odjeca/" + id)
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch("http://localhost:3000/odjeca/" + id, values)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
    alert("Uspješno ažurirano.");
  };
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="vrsta">Vrsta:</label>
            <input
              type="text"
              name="vrsta"
              className="form-control my-2"
              placeholder="Unesi vrstu"
              required
              value={values.vrsta}
              onChange={(e) => setValues({ ...values, vrsta: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="velicina">Veličina:</label>
            <select
              className="form-control my-2"
              id="velicina"
              required
              value={values.velicina}
              onChange={(e) =>
                setValues({ ...values, velicina: e.target.value })
              }
            >
              <option value="">-Odaberi-</option>
              <option value="XXS">XXS</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
          <div>
            <label htmlFor="boja">Boja:</label>
            <input
              type="color"
              name="boja"
              className="form-control form-control-color my-2"
              value={values.boja}
              onChange={(e) => setValues({ ...values, boja: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="slika">Slika:</label>
            <input
              type="url"
              name="slika"
              className="form-control my-2"
              placeholder="Unesi url fotografije"
              required
              value={values.slika}
              onChange={(e) => setValues({ ...values, slika: e.target.value })}
            />
          </div>
          <br /> <button className="btn btn-info">Ažuriraj</button>
          <Link to="/" className="btn btn-primary my-3 ms-3">
            Nazad
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Update;
