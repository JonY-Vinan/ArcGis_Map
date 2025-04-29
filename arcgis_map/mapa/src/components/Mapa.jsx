import React, { useEffect, useRef } from "react";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";

function Mapa({ mapStyle }) {
  const mapDiv = useRef(null);
  const viewRef = useRef(null);
  const webmapRef = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      webmapRef.current = new WebMap({
        basemap: mapStyle,
      });

      viewRef.current = new MapView({
        container: mapDiv.current,
        map: webmapRef.current,
        center: [-100, 40],
        zoom: 4,
      });

      // Añadir un marcador cuando la vista esté lista
      viewRef.current.when(() => {
        const point = new Point({
          longitude: -100,
          latitude: 40,
        });

        const marker = new Graphic({
          geometry: point,
          symbol: {
            type: "simple-marker",
            color: [226, 119, 40],
            outline: {
              color: [255, 255, 255],
              width: 2,
            },
          },
        });

        viewRef.current.graphics.add(marker);
      });

      return () => {
        if (viewRef.current) {
          viewRef.current.destroy();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (webmapRef.current) {
      webmapRef.current.basemap = mapStyle;
    }
  }, [mapStyle]);

  return (
    <div
      ref={mapDiv}
      style={{ height: "calc(100vh - 100px)", width: "100%" }}
    />
  );
}

export default Mapa;
