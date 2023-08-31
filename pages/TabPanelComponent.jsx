import React, { useState } from "react";
import styles2 from "../styles/Tab.module.css"; // Make sure to import styles
import { LevelOne } from "../components/common/transformation/LevelOne";
import Leveltwo from "../components/common/transformation/LevelTwo";
import LevelThree from "../components/common/transformation/LevelThree";
import styles from "../styles/Button.module.css";

const TabPanelComponent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  let tabStyle = {
    border: 'none',
    fontFamily: 'Lato',
    fontSize: 'inherit',
    color: 'inherit',
    background: 'none',
    cursor: 'pointer',
    padding: '10px 10px',
    display: 'inline-block',
    margin: '5px 0px',
    
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 700,
    outline: 'none',
    position: 'relative',
    transition: 'all 0.3s',
    background:"black",
    color:"white"
    
  };
  
  return (
    <div className={styles2["tab-panel"]}>
      <div className={styles2["tab-buttons"]}>
        {["Level One","Level Two","Level Three"].map((tab, index) => (
          <button
            key={index}
            className={`${styles2["tab-button"]} ${
              activeTab === index ? styles2["active"] : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles2["tab-content"]} style={{ overflowY: 'auto', height: '1080px' }}>
        {activeTab === 0 && <LevelOne />}
        {activeTab === 1 && <Leveltwo />}
        {activeTab === 2 && <LevelThree />}
      </div>
    </div>
  );  
};

export default TabPanelComponent