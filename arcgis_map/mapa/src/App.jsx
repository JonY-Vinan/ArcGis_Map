import { useState } from "react";
import MapComponent from "./components/Mapa";
import "./App.css";

function App() {
  // useState es un hook de React para manejar estado en componentes funcionales
  const [showMap, setShowMap] = useState(true);
  const [mapStyle, setMapStyle] = useState("streets-navigation-vector");

  // Función para cambiar el estilo del mapa
  const changeMapStyle = (style) => {
    setMapStyle(style);
  };

  return (
    <div className="App">
      {/* <h1>React con ArcGIS Maps</h1> */}

      <div className="controls">
        <button onClick={() => setShowMap(!showMap)}>
          {showMap ? "Ocultar Mapa" : "Mostrar Mapa"}
        </button>

        <div className="style-buttons">
          <button onClick={() => changeMapStyle("streets-navigation-vector")}>
            Calles
          </button>
          <button onClick={() => changeMapStyle("satellite")}>Satélite</button>
          <button onClick={() => changeMapStyle("topo-vector")}>
            Topográfico
          </button>
        </div>
      </div>

      {showMap && <MapComponent mapStyle={mapStyle} />}
    </div>
  );
}

export default App;
