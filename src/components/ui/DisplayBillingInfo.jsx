import React, { useState, useEffect } from "react";
import "./DisplayBillingInfo.css";

const DisplayBillingInfo = () => {
    const [billingData, setBillingData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
    });

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email") || "";
        const storedFirstName = sessionStorage.getItem("billingFirstName") || sessionStorage.getItem("firstName") || "";
        const storedLastName = sessionStorage.getItem("billingLastName") || sessionStorage.getItem("lastName") || "";
        const storedAddress1 = sessionStorage.getItem("billingAddress1") || sessionStorage.getItem("address1") || "";
        const storedAddress2 = sessionStorage.getItem("billingAddress2") || sessionStorage.getItem("address2") || "";
        const storedCity = sessionStorage.getItem("billingCity") || sessionStorage.getItem("city") || "";
        const storedState = sessionStorage.getItem("billingState") || sessionStorage.getItem("state") || "";
        const storedZipCode = sessionStorage.getItem("billingZipCode") || sessionStorage.getItem("zipCode") || "";
        const storedCountry = sessionStorage.getItem("billingSelectCountry") || sessionStorage.getItem("country") || "";

        setBillingData({
            email: storedEmail,
            firstName: storedFirstName,
            lastName: storedLastName,
            address1: storedAddress1,
            address2: storedAddress2,
            city: storedCity,
            state: storedState,
            zipCode: storedZipCode,
            country: storedCountry,
        });
    }, []);

    return (
        <div className="billing-info--container">
            <div className="title-wrapper">
                <h2 className="billing-info--title">Bill To</h2>
            </div>
            <div className="billing-info--data">
                <form>
                    <div className="billing-info--item">
                        <label className="billing-info--label">Email: </label>
                        <input type="text" value={billingData.email} className="billing-input" readOnly disabled />
                    </div>

                    <div className="billing-info--item">
                        <label className="billing-info--label">First Name: </label>
                        <input type="text" value={billingData.firstName} className="billing-input" readOnly disabled />
                    </div>

                    <div className="billing-info--item">
                        <label className="billing-info--label">Last Name: </label>
                        <input type="text" value={billingData.lastName} className="billing-input" readOnly disabled />
                    </div>

                    <div className="billing-info--item">
                        <label className="billing-info--label">Address: </label>
                        <input type="text" value={billingData.address1} className="billing-input" readOnly disabled />
                    </div>

                    <div className="billing-info--item">
                        <label className="billing-info--label">Address: </label>
                        <input type="text" value={billingData.address2} className="billing-input" readOnly disabled />
                    </div>

                    <div className="billing-info--item">
                        <label className="billing-info--label">City: </label>
                        <input type="text" value={billingData.city} className="billing-input" readOnly disabled />
                    </div>

                    <div className="billing-info--item">
                        <label className="billing-info--label">State: </label>
                        <input type="text" value={billingData.state} className="billing-input" readOnly disabled />
                    </div>

                    <div className="billing-info--item">
                        <label className="billing-info--label">Zipcode: </label>
                        <input type="text" value={billingData.zipCode} className="billing-input" readOnly disabled />
                    </div>
                    
                    <div className="billing-info--item">
                        <label className="billing-info--label">Country: </label>
                        <input type="text" value={billingData.country} className="billing-input" readOnly disabled />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DisplayBillingInfo;
