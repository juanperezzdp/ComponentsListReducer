import React, { useState, useReducer } from "react";
import "./List.scss";
import ImgHeader from "../img/img.jpg";

const types = {
  menos: "menos",
  mas: "mas",
  eliminar: "eliminar",
  comprar: "comprar",
};

const initValue = [
  { id: 1, nombre: "pan", cantidad: 3 },
  { id: 2, nombre: "agua", cantidad: 1 },
];

const reducer = (state, action) => {
  switch (action.type) {
    case types.menos:
      return state.map((cosa) =>
        action.payload === cosa.id && cosa.cantidad > 1
          ? { ...cosa, cantidad: cosa.cantidad - 1 }
          : cosa
      );

    case types.mas:
      return state.map((cosa) =>
        action.payload === cosa.id
          ? { ...cosa, cantidad: cosa.cantidad + 1 }
          : cosa
      );
    case types.eliminar:
      return state.filter((valor) => valor.id !== action.payload);

    case types.comprar:
      return [...state, action.payload];
    default:
      return state;

      break;
  }
  return state;
};

function ListReducer() {
  const [miProductos, setMiProductos] = useState("");
  const [list, dispatch] = useReducer(reducer, initValue);

  return (
    <div className="container">
      <img src={ImgHeader} alt="img" />
      <div className="container-input">
        <input
          placeholder="Productos:"
          id="productos"
          type="text"
          value={miProductos}
          onChange={(e) => {
            setMiProductos(e.target.value);
          }}
        />
        <button
          onClick={() => {
            const existingProduct = list.find(
              (producto) => producto.nombre === miProductos
            );

            if (existingProduct) {
              dispatch({ type: types.mas, payload: existingProduct.id });
            } else {
              dispatch({
                type: types.comprar,
                payload: {
                  id: Math.random(),
                  nombre: miProductos,
                  cantidad: 1,
                },
              });
            }
          }}
        >
          Agregar a la lista
        </button>
      </div>
      {list.map((productos) => (
        <div
          style={{ display: "flex", alignItems: "center" }}
          key={productos.id}
        >
          <div className="container-list">
            <h2>{productos.nombre}</h2> ({productos.cantidad} unidad)
            <button
              style={{ height: "1.5rem" }}
              onClick={() => {
                dispatch({ type: types.menos, payload: productos.id });
              }}
            >
              -
            </button>
            <button
              style={{ height: "1.5rem" }}
              onClick={() => {
                dispatch({ type: types.mas, payload: productos.id });
              }}
            >
              +
            </button>
            <button
              style={{ height: "1.5rem" }}
              onClick={() => {
                dispatch({ type: types.eliminar, payload: productos.id });
              }}
            >
              x
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListReducer;
