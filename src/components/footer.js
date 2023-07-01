import React from "react";
import "../App.css";

export function Footer() {
    var now = new Date();
    return (
        <>
            <div className="footer"><i>© Nick Hart {now.getFullYear()}</i></div>
        </>
    );
}
