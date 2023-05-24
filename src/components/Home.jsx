import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/odjeca")

      .then((res) => {
        setData(res.data);
        setFilter(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Filter = (e) => {
    setFilter(
      data.filter((f) => f.vrsta.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };
  return (
    <div className="container">
      <h2>Moja garderoba</h2>
      <Link to="/create" className="btn btn-success my-3">
        Dodaj odjevni predmet +
      </Link>

      <div className="mb-3 row">
        <label htmlFor="pretraga" className="col-sm-1 col-form-label">
          Traži:
        </label>
        <div className="col-sm-6">
          <input
            type="text"
            className="form-control mx-sm-3 border-dark"
            onChange={Filter}
          />
          <small id="findHelp" className="form-text text-muted">Pretraži odjeću po vrsti.</small>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vrsta</th>
            <th>Veličina</th>
            <th>Boja</th>
            <th>Slika</th>
            <th>Opcije</th>
          </tr>
        </thead>
        <tbody>
          {filter.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.vrsta}</td>
              <td>{d.velicina}</td>
              <td>
                <div style={{ backgroundColor: d.boja, color: "white" }}>
                  {d.boja}
                </div>
              </td>
              <td>
                <img
                  src={d.slika}
                  className="img-thumbnail"
                  alt={d.vrsta}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>
                <Link
                  className="text-decoration-none btn btn-sm btn-success"
                  to={`/update/${d.id}`}
                >
                  Ažuriraj
                </Link>
                <button
                  className="text-decoration-none btn btn-sm btn-danger mx-1"
                  onClick={(e) => handleDelete(d.id)}
                >
                  Obriši
                </button>
                <Link
                  className="text-decoration-none btn btn-sm btn-primary"
                  to={`/read/${d.id}`}
                >
                  Detalji
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  function handleDelete(id) {
    const confirm = window.confirm("Želite li obrisati odjevni predmet?");
    if (confirm) {
      axios.delete("http://localhost:3000/odjeca/" + id).then((res) => {
        alert("Obrisano.");
        location.reload();
      });
    }
  }
}
export default Home;
