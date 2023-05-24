import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Read() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/odjeca/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Detalji odjevnog predmeta:</h3>
        <div className=" text-white">
          <p>ID: {data.id}</p>
          <p>Vrsta: {data.vrsta}</p>
          <p>Veličina: {data.velicina}</p>
          <p>
            <label>Boja:</label>{" "}
            <label style={{ backgroundColor: data.boja, color: "white" }}>
              {data.boja}
            </label>
          </p>
          <div>
            <img
              src={data.slika}
              className="img-thumbnail"
              alt={data.vrsta}
              style={{ width: "200px", height: "200px" }}
            />
          </div>

          <Link to={`/update/${id}`} className="btn btn-success">
            Ažuriraj
          </Link>
          <Link to="/" className="btn btn-primary my-3 ms-3">
            Nazad
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Read;
