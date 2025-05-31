
import "./MainContentArea.css"

import Searchbar from "../Searchbar/Searchbar";
import Card from "../Card/Card";

const MainContentArea = () => {
    return (
        <div className="main-content-area-wrapper">
            <Searchbar />
            <Card />
        </div>
    )
}


export default MainContentArea;