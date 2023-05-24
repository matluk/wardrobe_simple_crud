import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Create() {
  const [color, setColor] = useState(false);
  const [inputData, setInputData] = useState({
    vrsta: "",
    velicina: "",
    boja: "",
    slika: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!color) {
      alert("Unesi boju!");
      return;
    }
    axios.post("http://localhost:3000/odjeca", inputData).then((res) => {
      alert("Data Posted Successfully!");
      navigate("/");
    });
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
              value={inputData.vrsta}
              onChange={(e) =>
                setInputData({ ...inputData, vrsta: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="velicina">Veličina:</label>
            <select
              className="form-control my-2"
              id="velicina"
              required
              value={inputData.velicina}
              onChange={(e) =>
                setInputData({ ...inputData, velicina: e.target.value })
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
              value={inputData.boja}
              onClick={(e) => setColor(true)}
              onChange={(e) =>
                setInputData({ ...inputData, boja: e.target.value })
              }
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
              value={inputData.slika}
              onChange={(e) =>
                setInputData({ ...inputData, slika: e.target.value })
              }
            />
          </div>
          <br /> <button className="btn btn-info">Potvrdi</button>
          <Link to="/" className="btn btn-primary my-3 ms-3">
            Nazad
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Create;
