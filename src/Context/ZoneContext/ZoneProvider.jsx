import React, { useCallback, useEffect, useState } from "react";
import ZoneContext from ".";

const ZoneProvider = (props) => {
  const [zones, setZones] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedZones = localStorage.getItem("zones");
      return storedZones ? JSON.parse(storedZones) : [];
    }
    return [];
  });
  const [isZoneSelected, setIsZoneSelected] = useState(false);

  // Function to update zones
  const updateZones = useCallback((newZones) => {
    setZones(newZones);
    if (typeof window !== 'undefined') {
      localStorage.setItem("zones", JSON.stringify(newZones));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedZones = localStorage.getItem("zones");
      if (storedZones) {
        setZones(JSON.parse(storedZones));
      }
    }
  }, []);

  return (
    <ZoneContext.Provider value={{ zones, setZones: updateZones, isZoneSelected, setIsZoneSelected }}>
      {props.children}
    </ZoneContext.Provider>
  );
};

export default ZoneProvider;