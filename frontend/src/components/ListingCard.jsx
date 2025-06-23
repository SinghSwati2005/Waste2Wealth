import React from "react";

const ListingCard = ({ listing }) => {
  return (
    <div className="border rounded-lg p-4 shadow">
      <img src={listing.image} alt={listing.title} className="w-full h-40 object-cover mb-2" />
      <h3 className="text-lg font-bold">{listing.title}</h3>
      <p>Price: ₹{listing.price}</p>
      <p>Quantity: {listing.quantity}</p>
      <p>Seller: {listing.seller}</p>
      <p>Location: {listing.location}</p>
      <p className="text-sm text-gray-500">{listing.tag}</p>
      <p className="text-sm text-gray-500">{listing.baseBidValue}</p>
    </div>
  );
};

export default ListingCard;
