import React from "react";
import { Link } from "react-router-dom";

const ProgressTracker = ({ stepNumber }) => {

    return (
        <>
            <div className="progress-tracker--wrapper">
                <div className="progress-tracker--progress">
                    <div className="progress-bar" />
                </div>
                <div className="progress-tracker-step--nums">
                    {stepNumber === "two" || stepNumber === "three" ? (
                        <Link to="/checkout">
                            <div className="step-num">1</div>
                        </Link>
                    ) : (
                        <div className="step-num active-num">1</div>
                    )}

                    {stepNumber === "three" ? (
                        // IF stepNumber IS "THREE", LINK TO "/checkout"
                        <Link to="/payment">
                            <div className="step-num">2</div>
                        </Link>
                    ) : stepNumber === "two" ? (
                        // IF stepNumber IS "TWO", RENDER WITH "active-num" CLASS
                        <div className="step-num active-num">2</div>
                    ) : (
                        // IF stepNumber IS "ONE", RENDER WITHOUT ANY LINK/ACTIVE CLASS
                        <div className="step-num">2</div>
                    )}

                    <div
                        className={
                            stepNumber === "three"
                                ? "step-num active-num"
                                : "step-num"
                        }
                    >
                        3
                    </div>
                </div>
                <div className="progress-tracker--steps">
                    <div className="step step--left">Shipping</div>
                    <div className="step step--center">Payment and Billing</div>
                    <div className="step step--right">
                        Review and Place Order
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProgressTracker;
