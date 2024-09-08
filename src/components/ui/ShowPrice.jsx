import React from "react";

const ShowPrice = ({ salePrice, originalPrice }) => {
    return (
        <div className="book__price">
            {salePrice ? (
                <>
                    <div className="book__price--normal">
                        ${originalPrice.toFixed(2)}
                    </div>
                    ${salePrice.toFixed(2)}
                </>
            ) : (
                <>${originalPrice.toFixed(2)}</>
            )}
        </div>
    );
};

export default ShowPrice;
