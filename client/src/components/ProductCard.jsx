/*eslint-disable */
import { MdStar } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { toast } from "react-toastify";
import PriceFormat from "../Helper/PriceFormat";
import { useState } from "react";
import { useEffect } from 'react';



const ProductCard = ({ item }) => {
    
  let { cart, setCart } = useSearch();
  const [blink, setBlink] = useState(true)
  console.log(blink);

useEffect(() => {

  let mm= setInterval(() => {
    setBlink(prev=>!prev)
  }, 1000);
  return ()=> clearInterval(mm)
}, [])




  return (
    <div className="col-6 col-md-3  ">
      <div className="card h-100">
        <img
          src={`${item?.picture[0]?.secure_url}`}
          className=" card-img-top"
          width={screen > 768 ? 200 : 100}
          height={screen > 768 ? 200 : 100}
          alt="image"
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <div className="card-text">
            <p className="m-0">Category: {item.category?.name}</p>
            <p className={item.offer?'text-decoration-line-through':'mb-1' }>Price: {<PriceFormat price={item.price} />} </p>
            <p className={item.offer?'mb-2 text-danger fs-5 offerPrice':'d-none' }><span className={blink?'text-danger':'text-dark'}>Offer Price: {<PriceFormat price={item.price - item.price*item.offer/100} />}</span> </p>
            <p className="m-0 ">
              <span className="bg-success p-1 rounded-3 text-white">
                Rating: {item?.rating}
                <MdStar className=" text-warning mb-1" />
              </span>{" "}
              ({item?.ratingNo})
            </p>
            <p className="m-0">
              Description: {item.description.substring(0, 8)} ...
            </p>
          </div>
        </div>
        <div className=" d-flex justify-content-evenly">
          <Link to={`/products/more-info/${item._id}`}>
            <button
              // onClick={() => navigate(`products/more-info/${item?._id}`)}
              className="btn btn-primary "
            >
              More info
            </button>
          </Link>
          <button
            onClick={() => {
              let cartIds = cart.map((it) => it._id);
              if (cartIds.includes(item._id)) {
                return alert("Already added");
              }
              setCart([...cart, item]);
              localStorage.setItem("cart", JSON.stringify([...cart, item]));
              toast.success(`${item.name} added to Cart`);
            }}
            className="btn btn-info mt-auto mb-1"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}


export default ProductCard