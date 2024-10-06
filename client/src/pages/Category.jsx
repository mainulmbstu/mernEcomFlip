import  { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from '../components/Loading';

const Category = () => {
  const [products, setProducts] = useState([]);
  let params = useParams()
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


  return (
    <Layout title={`Category-${params.slug}`}>
      <div className={loading ? "dim" : ""}>
        <div>
          <div className="px-2">
            <h3 className=" text-capitalize">
              Category: {params.slug}({products?.length} of {total} )
            </h3>
            <h3 className=" text-danger">
              {!products?.length ? "No Product Found!!" : ""}
            </h3>
            <InfiniteScroll
              dataLength={products.length}
              next={() => {
                setPage(page + 1);
                getProducts(page + 1);
              }}
              hasMore={products.length < total}
              loader={<h1>Loading...</h1>}
              endMessage={<h4 className=" text-center">All items loaded</h4>}
            >
              <div className="row g-3">
                {products?.length &&
                  products?.map((item) => {
                    return (
                      <div key={item._id} className="col-md-3  ">
                        <div className="card h-100">
                          <img
                            src={`${item?.picture[0]?.secure_url}`}
                            className=" card-img-top"
                            height={200}
                            alt="image"
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <div className="card-text">
                              <p className="m-0">
                                Category: {item.category.name}{" "}
                              </p>
                              <p className="m-0">Price: {item.price} </p>
                              <p className="m-0">
                                Available quantity: {item.quantity}{" "}
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
                            <button className="btn btn-info mt-auto mb-1">
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
              {products.length < total ? (
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