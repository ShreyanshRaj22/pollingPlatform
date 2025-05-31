import React from "react";
import "./Card.css";

const Card = () => {
    const options = ["Yes", "No", "Maybe"];

    return (
        <div className="card-wrapper">
            <div className="card-metadata">Community Question</div>
            <div className="card-title">Question Title to be displayed here</div>
            <div className="card-desc">
                This is a sample description for the poll. This may get long and should be clamped when the card is collapsed.
            </div>
            <div className="card-votes">
                {options.map((opt, idx) => (
                    <div>
                        <button key={idx}>{opt}</button>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;
