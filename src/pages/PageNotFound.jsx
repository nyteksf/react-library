import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = ({ Img404 }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="error-msg-404--wrapper">
                    <img
                        src={Img404}
                        alt="Page Not Found"
                        className="page-not-found__img img-404"
                    />
                    <div className="error-msg-404--msg">
                        <h2 className="error-msg-404--title">Page Not Found.</h2>
                        <p className="error-msg-404--para error-msg-404--para-1" style={{ fontSize: "1.4em" }}>
                            Oops! We can't seem to find the page you're looking
                            for.
                        </p>
                        <p className="error-msg-404--para error-msg-404--para-2" style={{ fontSize: "1.25em" }}>
                            Maybe it was moved or deleted? Or perhaps there was
                            a typo in the URL?
                        </p>
                        <Link to="/">
                            <button className="btn-404 btn">Back to Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
