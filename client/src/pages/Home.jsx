import { useEffect, useState } from "react";
import useStore from "../hooks/useStore";
import { Checkbox } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import Layout from "../components/Layout";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loading from "../components/Loading";
import Marquee from "react-fast-marquee";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  let { category } = useStore();
  let { cart, setCart } = useSearch();

  const [checkedCat, setCheckedCat] = useState([]);
  const [priceCat, setPriceCat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  let catHandle = (checked, id) => {
    let all = [...checkedCat];
    if (checked) {
      all.push(id);
    } else {
      all = all.filter((item) => item !== id);
    }
    setCheckedCat(all);
  };

  //==============  filter ====================================
  const [filterPage, setFilterPage] = useState(1);
  let [total, setTotal] = useState(0);

  useEffect(() => {
   setFilterPage(1)
 }, [checkedCat, priceCat]);

  let getProductFilter = async (filterPage=1) => {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/product-filter`,
        {
          checkedCat,
          priceCat,
          pageOrSize: {
            page: filterPage,
            size: 4,
          },
          headers: { "Content-Type": "application/json" },
        }
      );
      setLoading(false);
      if (!data.success) {
        return toast.error(data.msg);
      }
      setTotal(data.total);
      // setFilterPage(2);
        filterPage === 1
          ? setProducts(data?.products)
          : setProducts([...products, ...data.products]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (priceCat.length !== 0 || checkedCat.length !== 0)
      getProductFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedCat, priceCat]);

  //========== products with limit  ==================

  let [page, setPage] = useState(1);

  let getProducts = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products/product-list-limit`,
        {
          params: {
            page: page,
            size: 4,
          },
        }
      );
      setPage(page + 1);
      setTotal(data.total);
      setProducts([...products, ...data.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  //===========================================
  return (
    <Layout title={"home"}>
      <div className={loading?'dim':''}>
        <div className=" hero-area text-danger">
          <Marquee direction="left" speed={300} autofill={false} loop={""}>
            <h1>WELCOME TO DEMO ECOMMERCE WEBSITE || </h1>
          </Marquee>
        </div>
        <div className="row px-md-4">
          <div className="col-md-2">
            <h5>Category</h5>
            <div className=" d-flex flex-column">
              {category?.length &&
                category?.map((item) => (
                  <Checkbox
                    key={item?._id}
                    onChange={(e) => catHandle(e.target.checked, item._id)}
                  >
                    {item?.name}
                  </Checkbox>
                ))}

              {/* {category?.map((item) => {
              return (
                <div key={item._id} className="input-group mb-3">
                  <div className="input-group-text">
                    <input
                      onChange={(e) => catHandle(e.target.checked, item._id)}
                      name="category"
                      // checked
                      value={item._id}
                      className="form-check-input mt-0"
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                    />
                  </div>
  
                  <input
                    onChange={cat}
                    value={item.name}
                    type="text"
                    className="form-control"
                    aria-label="Text input with checkbox"
                  />
                </div>
              );
            })} */}
            </div>

            <div>
              <h5>Price Category</h5>
              {/* <Radio.Group onChange={(e) => setPriceCat(e.target.value)}>
              {priceCategory.map((p) => {
                return (
                  <div key={p._id}>
                    <Radio name="price" value={p.array}>
                      {p.name}
                    </Radio>
                  </div>
                );
              })}
            </Radio.Group> */}
              <div className=" d-flex flex-column">
                <div>
                  <input
                    onChange={() => setPriceCat([1, 5000])}
                    type="radio"
                    name="kkk"
                    id="one"
                  />
                  <label htmlFor="one">1-5000</label>
                </div>
                <div>
                  <input
                    onChange={() => setPriceCat([5001, 10000])}
                    type="radio"
                    name="kkk"
                    id="two"
                  />
                  <label htmlFor="two">5001-10000</label>
                </div>
                <div>
                  <input
                    onChange={() => setPriceCat([10001, 15000])}
                    type="radio"
                    name="kkk"
                    id="three"
                  />
                  <label htmlFor="three">10001-15000</label>
                </div>
                <div>
                  <input
                    onChange={() => setPriceCat([15001, 999999999])}
                    type="radio"
                    name="kkk"
                    id="four"
                  />
                  <label htmlFor="four">15001-Above</label>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button
                onClick={() => window.location.reload()}
                className=" btn btn-success"
              >
                Reset Filter
              </button>
            </div>
          </div>

          <div className="col-md-10">
            <h3>
              {!checkedCat.length ? "All Products" : "Products by category"}
            </h3>
            <h3 className=" text-danger">
              {!products?.length ? "No Product Found!!" : ""}
            </h3>

            <InfiniteScroll
              dataLength={products.length}
              next={
                !checkedCat.length && !priceCat.length
                  ? getProducts
                  : () => {
                      setFilterPage(filterPage + 1);
                      getProductFilter(filterPage + 1);
                    }
              }
              hasMore={products.length < total}
              loader={<h1>Loading...</h1>}
              endMessage={<h4 className=" text-center">All items loaded</h4>}
            >
              <div className="row g-3">
                {products?.length &&
                  products?.map((item) => {
                    return (
                      <div key={item?._id} className="col-md-3  ">
                        <div className="card h-100">
                          <LazyLoadImage
                            src={`${item?.picture[0]?.secure_url}`}
                            className=" "
                            height={200}
                            alt="image"
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item?.name}</h5>
                            <div className="card-text">
                              <p className="m-0">
                                Category: {item?.category?.name}{" "}
                              </p>
                              <p className="m-0">Price: {item?.price} </p>
                              <p className="m-0">
                                Available quantity: {item?.quantity}
                              </p>
                              <p className="m-0">
                                Description: {item?.description.substring(0, 8)}{" "}
                                ....
                              </p>
                            </div>
                          </div>
                          <div className=" d-flex justify-content-evenly">
                            <Link to={`products/more-info/${item?._id}`}>
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
                                localStorage.setItem(
                                  "cart",
                                  JSON.stringify([...cart, item])
                                );
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
                  })}
              </div>
            </InfiniteScroll>
            {/* {loading && <Loading />} */}
          </div>
          <div className="d-flex">
            {products.length < total ? (
              <>
                <button
                  onClick={() => {
                    if (!checkedCat.length && !priceCat.length) {
                      getProducts();
                    } else {
                      setFilterPage(filterPage + 1);
                      getProductFilter(filterPage + 1);
                    }
                  }}
                  className="btn btn-primary my-3 px-3 mx-auto"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
