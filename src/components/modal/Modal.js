import React, { useState } from 'react';
import "./modals.css";
import IndividualPost from "../IndividualPost";

function Apps(){
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  return(
  <div className="Apps">
    <button onClick={() => setIsModalVisible(true)}>Open</button>
    {isModalVisible ? <IndividualPost /> : null}
  </div>
  );
}

export default Apps;