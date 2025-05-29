import { useState } from "react";
import "./Searchbar.css";

const Searchbar = () => {
    const [value, setValue] = useState("");

    return (
        <div className="searchbar-wrapper">
            <input
                type="text"
                className="searchbar-input"
                placeholder="Search for votes"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {value && (
                <button className="clear-button" onClick={() => setValue("")}>
                    ✕
                </button>
            )}
        </div>
    );
};

export default Searchbar;
