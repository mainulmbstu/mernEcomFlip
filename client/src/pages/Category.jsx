import  { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import PriceFormat from '../Helper/PriceFormat';
import { useAuth } from '../context/AuthContext';
import { MdStar } from 'react-icons/md';
import { useSearch } from '../context/SearchContext';
import { toast } from 'react-toastify';

const Category = () => {
  const [products, setProducts] = useState([]);
  let params = useParams()
  let { category, catPlain } = useAuth()
    let { cart, setCart } = useSearch();


  
  let catItem =catPlain.length && catPlain.find((item) => item.slug == params.slug);
  
  let catItemChildren= catItem && catPlain.filter(item=>item.parentId===catItem._id)

  //======================================================
let [page, setPage] = useState(1);
  let [total, setTotal] = useState(0);
  let [loading, setLoading] = useState(false);
  
   useEffect(() => {
     setPage(1);
   }, [params.slug]);
//================================================
    let getProducts = async (page=1) => {
      try {
        setLoading(true);
        let { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/products/category/${params.slug}`,
          {
            params: {
              page: page,
              size: 4,
            },
          }
        );
        setLoading(false);
        setTotal(data?.total?.length);
        page===1?setProducts(data?.products):setProducts([...products, ...data.products]);
      } catch (error) {
        console.log(error);
      }
    };
  
  useEffect(() => {
    getProducts();
  }, [params.slug]);

  //======================================
   let getCategoryList = (category) => {
     let myCategories = [];
     if (category.length) {
       for (let v of category) {
         myCategories.push(
           <li key={v.slug}>
             {
               v.parentId?<Link to={`/products/category/${v.slug}`}>{v.name}</Link>:<span>{v.name} </span>
             }
             {v.children.length > 0 ? (
               <ul>{getCategoryList(v.children)} </ul>
             ) : null}
           </li>
         );
       }
     }
     return myCategories;
  };
  
   let screen = window.screen.width;

  return (
    <Layout title={`Category-${params.slug}`}>
      <div className={loading ? "dim" : ""}>
        <div>
          <div className="catPage">
            <ul>{getCategoryList(category)}</ul>
          </div>
          <div>
            <div className="row my-2">
              {catItemChildren.length &&
                catItemChildren.map((item) => (
                  <div key={item._id} className="col-2 col-md-2 p-2 ">
                    <div className="p-2">
                      <Link
                        to={`/products/category/${item.slug}`}
                        className=" text-decoration-none"
                      >
                        <img
                          src={
                            item.picture
                              ? `${import.meta.env.VITE_BASE_URL}/${
                                  item.picture
                                }`
                              : `/placeholder.jpg`
                          }
                          // `${import.meta.env.VITE_BASE_URL}/${cat.picture }`
                          alt="image"
                          width={"100%"}
                          // height={400}
                          height={screen > 768 ? 150 : 50}
                        />
                        <h3 className=" text-center">{item?.name} </h3>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="px-2">
            <h3 className=" text-capitalize">
              {
                products?.length?`Category: ${params.slug} (${products?.length} of ${total})`:''
              }
              
            </h3>
            <h3 className=" text-danger">
              {!products?.length ? "No Product Found!!" : ""}
            </h3>
            <InfiniteScroll
              dataLength={products?.length}
              next={() => {
                setPage(page + 1);
                getProducts(page + 1);
              }}
              hasMore={products?.length < total}
              loader={<h1>Loading...</h1>}
              endMessage={<h4 className=" text-center">All items loaded</h4>}
            >
              <div className="row g-3">
                {products?.length &&
                  products?.map((item) => {
                    return (
                      <div key={item._id} className="col-6 col-md-3  ">
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
                              <p className="m-0">
                                Category: {item.category?.name}
                              </p>
                              <p className="m-0">
                                Price: {<PriceFormat price={item.price} />}{" "}
                              </p>
                              <p className="m-0">
                                Available quantity: {item.quantity}{" "}
                              </p>
                              <p className="m-0">
                                Rating: {item.rating.toFixed(1)}
                                <MdStar /> ({item?.review} Reviews)
                              </p>
                              <p className="m-0">
                                Description: {item.description.substring(0, 8)}{" "}
                                ...
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
            <div className="d-flex">
              {products?.length < total ? (
                <>
                  <button
                    onClick={() => {
                      setPage(page + 1);
                      getProducts(page + 1);
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
      </div>
    </Layout>
  );
}

export default Category