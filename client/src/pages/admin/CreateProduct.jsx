import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";
import CreateProductModal from "./CreateProductModal";
import UpdateProductModal from "./UpdateProductModal";
import Layout from "../../components/Layout";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import DeleteModal from "../../components/DeleteModal";
import PriceFormat from "../../Helper/PriceFormat";


const CreateProduct = () => {
  let { token,userInfo, loading, setLoading } = useAuth();
  const [editProduct, setEditProduct] = useState('');
  //=============================================================
  let [page, setPage] = useState(1);
  let [total, setTotal] = useState(0);
  let [products, setProducts] = useState([]);
console.log(page);
  let size=3
  let getProducts = async (page = 1, size=10) => {
    // page === 1 && window.scrollTo(0, 0);
    try {
      setLoading(true);
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/product-list`,
        {
          params: {
            page,
            size,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTotal(data.total);
      page===1 || editProduct?
      setProducts(data.products)
      :setProducts([...products, ...data.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   if (token && userInfo.role) getProducts(page, size);
  }, []);
  //======================================================
  let [searchVal, setSearchVal] = useState("");

  let getSearchAdminProducts = async (e, page = 1, size=10) => {
    e && e.preventDefault();
    try {
      if (!searchVal) return;
      setLoading(true);
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/product-search`,
        {
          params: {
            keyword: searchVal,
            page,
            size,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);

      setTotal(data.total);
      page === 1
        ? setProducts(data?.searchProduct)
        : setProducts([...products, ...data.searchProduct]);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setPage(1);
  // }, [searchVal]);

  //===================================================
  let [delItem, setDelItem] = useState('');

  let deleteItem = async (id) => {
    setLoading(true);
    // setSelectedItem(item);
    let res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/products/delete-product/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    let data = await res.json();
    if (res.ok) {
      toast.success(`${delItem?.name} is deleted successfully`);
      setLoading(false);
      getProducts()
    } else {
      toast.success(data?.msg);
    }
  };
  //====================================================================

  return (
    <Layout title={"Products"}>
      <div className={loading ? "dim" : ""}>
        <div className="row ">
          <div className="col-md-3 p-2">
            <div className="card p-2">
              <AdminMenu />
            </div>
          </div>
          <div className=" col-md-9 p-2">
            <div className=" card p-2">
              <div className="">
                <div className=" d-flex justify-content-between mb-3">
                  <h3>
                    Product List ({products?.length} of {total}){" "}
                  </h3>

                  <div>
                    <button
                      onClick={() => setPage(1)}
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#createProduct"
                    >
                      Create Product
                    </button>
                    <CreateProductModal getProducts={getProducts} />
                  </div>
                </div>

                <div className=" d-flex my-2">
                  <div className="col-md-4">
                    <form
                      className="d-flex"
                      role="search"
                      onSubmit={getSearchAdminProducts}
                    >
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Product Name"
                        aria-label="Search"
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                      />
                      <button
                        className="btn btn-success btn-outline-black"
                        type="submit"
                      >
                        Search
                      </button>
                    </form>
                  </div>
                </div>

                <div className=" border">
                  {/* {loading && <Loading />} */}
                  <InfiniteScroll
                    dataLength={products.length}
                    next={
                      !searchVal
                        ? () => {
                            setPage(page + 1);
                            getProducts(page + 1, size);
                          }
                        : (e) => {
                            setPage(page + 1);
                            getSearchAdminProducts(e, page + 1, size);
                          }
                    }
                    hasMore={products.length < total}
                    loader={<h1>Loading...</h1>}
                    endMessage={
                      <h4 className=" text-center">All items loaded</h4>
                    }
                  >
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">SL</th>
                          <th scope="col">Image</th>
                          <th scope="col">Name</th>
                          <th scope="col">Category</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Delete</th>
                          <th scope="col">Update</th>
                        </tr>
                      </thead>

                      <tbody>
                        {products?.length &&
                          products.map((item, index) => {
                            return (
                              <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                  <img
                                    src={`${item?.picture[0]?.secure_url}`}
                                    alt=""
                                    width="30"
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.category?.name}</td>
                                <td>{<PriceFormat price={item.price} />}</td>
                                <td>{item.quantity}</td>
                                {/* <td>{"edit/update"}</td> */}
                                <td>
                                  <button
                                    onClick={() => {
                                      setPage(1);
                                      setDelItem(item);
                                    }}
                                    className="btn btn-danger"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteCategory"
                                    disabled={loading}
                                  >
                                    {loading && item._id === delItem._id ? (
                                      <>
                                        <div
                                          className="spinner-border text-primary"
                                          role="status"
                                          disabled
                                        >
                                          <span className="visually-hidden">
                                            Loading...
                                          </span>
                                        </div>
                                      </>
                                    ) : (
                                      <>Delete</>
                                    )}
                                  </button>
                                </td>
                                <td>
                                  {loading && item._id === editProduct._id ? (
                                    <>
                                      <button
                                        className="btn btn-primary"
                                        type="button"
                                        disabled
                                      >
                                        <span
                                          className="spinner-border spinner-border-sm"
                                          role="status"
                                          aria-hidden="true"
                                        />
                                        Updating...
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => {
                                          // setPage(1);
                                          setEditProduct(item);
                                        }}
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editProduct"
                                        disabled={loading}
                                      >
                                        Details & Edit
                                      </button>
                                    </>
                                  )}
                                </td>
                                <UpdateProductModal
                                  value={{
                                    editProduct,
                                    getProducts,
                                    setEditProduct,
                                    page,
                                    size
                                  }}
                                />
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </InfiniteScroll>
                  <DeleteModal value={{ func: deleteItem, item: delItem }} />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex">
            {products?.length < total ? (
              <>
                <button
                  onClick={
                    !searchVal
                      ? () => {
                          setPage(page + 1);
                          getProducts(page + 1, size);
                        }
                      : (e) => {
                          setPage(page + 1);
                          getSearchAdminProducts(e, page + 1, size);
                        }
                  }
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

export default  CreateProduct;
// export default UseEdit;
