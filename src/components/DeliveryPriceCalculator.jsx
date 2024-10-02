import React, { useState } from 'react';

const DeliveryPriceCalculator = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // HANDLE FORM INPUT CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // FUNCTION TO FETCH FEDEX ACCESS TOKEN
  const fetchToken = async () => {
    const url = 'https://apis-sandbox.fedex.com/oauth/token';
    const clientId = 'l7a93dc942dd3a4f42b7d65f08f504c441';
    const clientSecret = 'fa1988043ad545908b9b842179b09db8';

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data.toString(),
    });

    const result = await response.json();
    if (response.ok) {
      return result.access_token;
    } else {
      throw new Error(result.error_description || 'Failed to fetch token');
    }
  };

  // Function to query FedEx for delivery price based on address
  const getDeliveryPrice = async (token) => {
    const url = 'https://apis-sandbox.fedex.com/rate/v1/rates/quotes';

    const payload = {
      // Fill in the necessary request details (example structure, adjust based on FedEx API docs)
      accountNumber: {
        value: 'YOUR_ACCOUNT_NUMBER', // Your FedEx account number
      },
      requestedShipment: {
        shipper: {
          address: {
            postalCode: 'YOUR_POSTAL_CODE', // Shipper's postal code
            countryCode: 'US',
          },
        },
        recipient: {
          address: {
            postalCode: formData.postalCode,
            countryCode: formData.country,
          },
        },
        // Additional required fields for shipment
        packageCount: 1,
        totalWeight: {
          units: 'LB',
          value: 5.0, // example weight
        },
        serviceType: 'FEDEX_GROUND', // Adjust service type accordingly
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (response.ok) {
      // Assuming the API returns rate details in a specific format (adjust per API documentation)
      return result.output.rateReplyDetails[0].ratedShipmentDetails[0].totalNetCharge.amount;
    } else {
      throw new Error(result.error || 'Failed to fetch rates');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Step 1: Get FedEx OAuth token
      const token = await fetchToken();

      // Step 2: Query the delivery price based on address
      const deliveryPrice = await getDeliveryPrice(token);

      // Step 3: Set the price to display to the user
      setPrice(deliveryPrice);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>FedEx Delivery Price Calculator</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />

        <button type="submit">Calculate Delivery Price</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {price && <p>Delivery Price: ${price}</p>}
    </div>
  );
};

export default DeliveryPriceCalculator;
