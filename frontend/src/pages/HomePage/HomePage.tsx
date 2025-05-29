import React from "react";
import "./HomePage.css"

import Sidebar from "../../components/Sidebar/Sidebar";
import MainContentArea from "../../components/MainContentArea/MainContentArea";

const HomePage = () => {
    return (
        <div>
            <Sidebar />
            <MainContentArea />
        </div>
    );
}

export default HomePage;