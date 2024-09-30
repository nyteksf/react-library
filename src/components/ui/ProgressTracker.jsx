import React from "react";

const ProgressTracker = ({ stepNumber }) => {
    return (
        <>
            <div className="progress-tracker--wrapper">
                <div className="progress-tracker--progress">
                    <div className="progress-bar" />
                </div>
                <div className="progress-tracker-step--nums">
                    <div className={(stepNumber === "one") ? "step-num active-num" : "step-num" }>1</div>
                    <div className={(stepNumber === "two") ? "step-num active-num" : "step-num" }>2</div>
                    <div className={(stepNumber === "three") ? "step-num active-num" : "step-num" }>3</div>
                </div>
                <div className="progress-tracker--steps">
                    <div className="step step--left">Shipping</div>
                    <div className="step step--center">Payment and Billing</div>
                    <div className="step step--right">Review and Place Order</div>
                </div>
            </div>
        </>
    );
};

export default ProgressTracker;
