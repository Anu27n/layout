import React, { useState } from "react";
import AreaInput from "./AreaInput";
import FlexBoxDisplay from "./FlexBoxDisplay";
import OpenWorkspaces from "./OpenWorkspaces";
import Cabins from "./Cabins";
import PublicSpaces from "./PublicSpaces";
import { Tooltip } from "react-tooltip";
import "./styles.css";

const areaValues = {
  linear: 23,
  lType: 28.749,
  md: 140,
  manager: 80,
  small: 80,
  ups: 90,
  bms: 90,
  server: 40,
};

const initialAreas = {
  linear: 0,
  lType: 0,
  md: 0,
  manager: 0,
  small: 0,
  ups: 0,
  bms: 0,
  server: 0,
};

const App = () => {
  const [totalArea, setTotalArea] = useState(2000);
  const [areas, setAreas] = useState(initialAreas);
  const [error, setError] = useState(false);

  const updateAreas = (type, value) => {
    const newAreas = {
      ...areas,
      [type]: value,
    };
    const builtArea = Object.keys(newAreas).reduce(
      (acc, key) => acc + newAreas[key] * areaValues[key],
      0
    );
    if (builtArea <= totalArea) {
      setAreas(newAreas);
      setError(false);
    } else {
      setError(true);
    }
  };

  const builtArea = Object.keys(areas).reduce(
    (acc, key) => acc + areas[key] * areaValues[key],
    0
  );
  const availableArea = totalArea - builtArea;

  return (
    <div className="container">
      <AreaInput setTotalArea={setTotalArea} />
      <div className="content">
        <div className="sections">
          <OpenWorkspaces areas={areas} updateAreas={updateAreas} />
          <Cabins areas={areas} updateAreas={updateAreas} />
          <PublicSpaces areas={areas} updateAreas={updateAreas} />
        </div>
        <FlexBoxDisplay
          areas={areas}
          areaValues={areaValues}
          totalArea={totalArea}
          builtArea={builtArea}
          availableArea={availableArea}
        />
      </div>
      {error && (
        <div className="error-message">
          Error: The total built area exceeds the available area! Please adjust the values.
        </div>
      )}
      <Tooltip />
    </div>
  );
};

export default App;
