import React, { useState } from "react";
import LeftComponent from "./components/LeftComponet";
import RightComponent from "./components/RightComponent";

export default function App() {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    // console.log('called')
  };

  return (
    <div className="App">
      <LeftComponent handleGroupClick={handleGroupClick} />
      <RightComponent selectedGroup={selectedGroup} updateSelectedGroup={handleGroupClick} />
    </div>
  );
}
