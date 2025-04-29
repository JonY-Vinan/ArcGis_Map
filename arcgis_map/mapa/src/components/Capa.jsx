import React, { useState, useCallback } from "react";
import "./Capa.css";
import PropTypes from "prop-types";
import { FaMap, FaLayerGroup, FaBars, FaTimes } from "react-icons/fa";
import ServidorMap from "./ServidorMap.jsx";

const Capa = ({ setBaseMap, toggleLayer, mapView, mapSceneView }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Lista de mapas base
  const [baseMaps] = useState([
    {
      id: "streets",
      title: "Mapa Callejero",
      basemap: "streets",
      visible: true,
    },
    {
      id: "satellite",
      title: "Satélite",
      basemap: "satellite",
      visible: false,
    },
    { id: "topo", title: "Topográfico", basemap: "topo", visible: false },
    { id: "dark-gray", title: "Oscuro", basemap: "dark-gray", visible: false },
    { id: "gray", title: "Claro", basemap: "gray", visible: false },
    { id: "terrain", title: "Terreno", basemap: "terrain", visible: false },
  ]);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const handleBaseMapChange = useCallback(
    (selectedMap) => {
      setBaseMap(selectedMap);
      // Actualizar estado de visibilidad
      const updatedMaps = baseMaps.map((map) => ({
        ...map,
        visible: map.id === selectedMap.id,
      }));
      // En una aplicación real, podrías querer actualizar el estado local también
    },
    [setBaseMap, baseMaps]
  );

  const handleLayerToggle = useCallback(
    (layer) => {
      toggleLayer(layer);
      // En una aplicación real, actualizarías el estado local también
    },
    [toggleLayer]
  );

  return (
    <div className="capa-container">
      {/* Overlay para cerrar el menú */}
      <div
        className={`overlay ${isNavOpen ? "active" : ""}`}
        onClick={toggleNav}
      />

      <div className={`sidenav ${isNavOpen ? "open" : ""}`}>
        <div className="basemap-list">
          <h4>
            <FaMap className="icon mr-2 text-blue-500" />
            Mapas Base
          </h4>
          {baseMaps.map((map) => (
            <div key={map.id} className="basemap-item">
              <label>
                <input
                  type="radio"
                  name="basemap"
                  checked={map.visible}
                  onChange={() => handleBaseMapChange(map)}
                />
                {map.title}
              </label>
            </div>
          ))}
        </div>

        <div className="basemap-list mt-8">
          <h4>
            <FaLayerGroup className="icon mr-2 text-green-500" />
            Capas Adicionales
          </h4>
          <ServidorMap mapView={mapView} mapSceneView={mapSceneView} />
        </div>
      </div>

      <button className="nav-toggle" onClick={toggleNav}>
        {isNavOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

Capa.propTypes = {
  setBaseMap: PropTypes.func.isRequired,
  toggleLayer: PropTypes.func,
  mapView: PropTypes.object,
  mapSceneView: PropTypes.object,
};
export default Capa;
