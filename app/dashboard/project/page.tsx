'use client'

import { useState } from "react";
import DashboardLayout from "../layout";

const Project = () => {
    const [isExpanded, setIsExpanded] = useState(false);

  const toggleWidth = () => {
    setIsExpanded(!isExpanded);
  };
    return (
        <>Project page
            <div>
      <div
        style={{
          width: isExpanded ? '300px' : '100px',
          height: '100px',
          backgroundColor: 'lightblue',
          transition: 'width 2s',
        }}
      >
        Animated Box
      </div>
      <button onClick={toggleWidth}>Toggle Width</button>
    </div>
     
        </>
    )
}
Project.Layout = DashboardLayout
export default Project;