import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../components/Layout";

// eslint-disable-next-line react/prop-types
const ProductUpdateInput = ({ value }) => {
  let [trix, setTrix] = useState(true);
  const [inputVal, setInputVal] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    picture: [],
    shipping: "",
  });
  let { token, category, loading, setLoading } = useAuth();
  // eslint-disable-next-line react/prop-types
  let { editProduct, getProducts, setEditProduct } = value;

  if (editProduct?.name && trix) {
    setInputVal({
      name: editProduct.name,
      description: editProduct.description,
      category: editProduct.category._id,
      price: editProduct.price,
      quantity: editProduct.quantity,
      picture: "",
      shipping: editProduct.shipping,
    });
    setTrix(false);
  }

  let inputHandle = (e) => {
    let { name, value } = e.target;
    setInputVal((prev) => ({ ...prev, [name]: value }));
  };
//=======================================
  let productSubmit = async (e) => {
    e.preventDefault();

    let formdata = new FormData();
    inputVal?.picture?.length &&
      inputVal.picture.length &&
      inputVal.picture.map((item) => formdata.append("picture", item));
    formdata.append("name", inputVal.name);
    formdata.append("description", inputVal.description);
    formdata.append("category", inputVal.category);
    formdata.append("price", inputVal.price);
    formdata.append("quantity", inputVal.quantity);
    formdata.append("shipping", inputVal.shipping);
    try {
      setLoading(true);

      let { data } = await axios.post(
        // eslint-disable-next-line react/prop-types
        `${import.meta.env.VITE_BASE_URL}/products/update-product/${editProduct?._id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.msg);
        setTrix(true);
        setEditProduct("");
       getProducts();
        setLoading(false);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log({ msg: "update product", error });
    }
  };
  // let productSubmit = async (e) => {
  //   e.preventDefault();

  //   let formdata = new FormData();
  //   inputVal?.picture &&
  //     formdata.append("picture", inputVal?.picture, inputVal?.picture?.name);
  //   formdata.append("name", inputVal.name);
  //   formdata.append("description", inputVal.description);
  //   formdata.append("category", inputVal.category);
  //   formdata.append("price", inputVal.price);
  //   formdata.append("quantity", inputVal.quantity);
  //   formdata.append("shipping", inputVal.shipping);
  //   try {
  //     setLoading(true);

  //     let { data } = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/products/update-product/${editProduct?._id}`,
  //       formdata,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (data.success) {
  //       toast.success(data.msg);
  //       setTrix(true);
  //       setEditProduct("");
  //      getProducts();
  //       setLoading(false);
  //     } else {
  //       toast.error(data.msg);
  //     }
  //   } catch (error) {
  //     console.log({ msg: "update product", error });
  //   }
  // };

  return (
    <Layout title={"Product list"}>
      <div className="row  ">
        {/* <div className="col-md-3 p-2">
        <div className="card p-2">
          <AdminMenu />
        </div>
      </div> */}
        <div className=" p-2">
          <div className="card p-2">
            <div className=" border">
              <form
                onSubmit={productSubmit}
                className="px-4"
                encType="multipart/form-data"
              >
                <input
                  onChange={inputHandle}
                  className=" form-control mb-2"
                  type="text"
                  name="name"
                  value={inputVal.name}
                  placeholder="Enter product name"
                />

                <div className="mb-2">
                  <input
                    className="form-control"
                    list="categoryList"
                    type={"text"}
                    // eslint-disable-next-line react/prop-types
                    placeholder={editProduct?.category?.name}
                    onChange={(e) => {
                      let cat = category.filter(
                        (item) => item.slug === e.target.value
                      );
                      setInputVal((prev) => ({
                        ...prev,
                        category: cat[0]?._id,
                      }));
                    }}
                  />

                  <datalist id="categoryList">
                    {category.map((item) => {
                      return <option key={item._id} value={item.slug}></option>;
                    })}
                  </datalist>
                </div>

                <input
                  onChange={inputHandle}
                  className=" form-control mb-2"
                  type="number"
                  name="price"
                  value={inputVal.price}
                  placeholder="Enter price"
                />

                <input
                  onChange={inputHandle}
                  className=" form-control mb-2"
                  type="number"
                  name="quantity"
                  value={inputVal.quantity}
                  placeholder="Enter quantity"
                />

                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="shipping">
                    Shipping
                  </label>
                  <select
                    name="shipping"
                    onChange={(e) => {
                      return setInputVal((prev) => ({
                        ...prev,
                        shipping: e.target.value,
                      }));
                    }}
                    className="form-select"
                    id="shipping"
                  >
                    <option>{inputVal.shipping ? "Yes" : "No"} </option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pic" className="btn">
                    Upload product image
                  </label>
                  <input
                    className=" form-control mb-2"
                    id="pic"
                    type="file"
                    name="picture"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      inputHandle({
                        target: { name: "picture", value: [...e.target.files] },
                        // target: { name: "picture", value: e.target.files[0] },
                      });
                    }}
                  />
                </div>
                <div className="mb-4 ms-2 d-flex justify-content-evenly">
                  {inputVal.picture.length && (
                    <div>
                      <p>New uploaded</p>
                      <img
                        src={URL.createObjectURL(inputVal?.picture[0])}
                        alt="image"
                        className="img img-responsive"
                        height={"100px"}
                      />
                    </div>
                  )}

                  <div>
                    <p>Current Image</p>
                    <img
                      // eslint-disable-next-line react/prop-types
                      src={editProduct?.picture?.length && editProduct?.picture[0]?.secure_url}
                      alt="image"
                      className="img img-responsive"
                      height={"100px"}
                    />
                  </div>
                </div>

                <textarea
                  onChange={inputHandle}
                  className=" form-control mb-2"
                  type="text"
                  rows="4"
                  name="description"
                  value={inputVal.description}
                  placeholder="Enter product description"
                />
                <div className=" d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn  btn-danger text-white fs-5 ms-2 btn-outline-dark"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>

                  {loading ? (
                    <>
                      <button
                        className="btn btn-primary w-50 fs-5 ms-2"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Uploadin data...
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className=" btn  btn-primary text-white fs-5 w-50 ms-2 btn-outline-dark"
                        type="submit"
                        data-bs-dismiss="modal"
                      >
                        Update Product
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductUpdateInput;
