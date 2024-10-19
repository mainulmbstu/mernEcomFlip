import React from 'react'

const OfferInput = ({ value }) => {
    let {offer, setOffer, offerSubmit}=value
  return (
    <div className="col-md-3 ps-2">
      <form className="d-flex" role="submit" onSubmit={offerSubmit}>
        <div className="mb-2 w-100">
          <input
            className="form-control"
            type="number"
            name="offer"
            value={offer}
            placeholder="Write offer percentage"
            onChange={(e) => setOffer(e.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-success btn-outline-black" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default OfferInput