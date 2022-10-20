import React from "react";

const BaseFooter = () => {
    return (
        <div className="container">
            <p>
                Developed by{" "}
                <a
                    href="https://github.com/aliabb01"
                    target="_blank"
                    style={{ textDecoration: "underline" }}
                >
                    Arealov
                </a>
            </p>
        </div>
    );
};

export default BaseFooter;
