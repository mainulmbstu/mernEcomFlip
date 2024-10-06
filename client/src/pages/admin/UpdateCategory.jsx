import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";

// eslint-disable-next-line react/prop-types
const UpdateCategory = ({ value }) => {
  const [inputVal, setInputVal] = useState({ name: "" });
  const [trix, setTrix] = useState(true);
  let { token, getCategory } = useAuth();
  
  // eslint-disable-next-line react/prop-types
  if (value?.updateItem?.name && trix) {
    // eslint-disable-next-line react/prop-types
    setInputVal({ name: value?.updateItem?.name });
    setTrix(false);
  }
  let inputHandle = (e) => {
    let { name, value } = e.target;
    setInputVal((prev) => ({ ...prev, [name]: value }));
  };

  let handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/category/update-category/${
          // eslint-disable-next-line react/prop-types
          value?.updateItem?._id
        }`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(inputVal),
        }
      );

      let data = await res.json();
      if (res.ok) {
        toast.success(data.msg);
        setInputVal({ name: "" });
        getCategory();
        value.setUpdateItem("");
        setTrix(true);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log({ msg: "update category", error });
    }
  };

  return (
    <Layout title={"Category list"}>
      <div>
        <div>
          <div>
            {/* Button trigger modal */}

            {/* <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#updateCategory"
          >
            Launch demo modal
          </button> */}

            {/* Modal */}
          </div>
          <div
            className="modal fade"
            id="updateCategory"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edite category
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>

                <div className="modal-body">
                  <form onSubmit={handleUpdate} className="">
                    <input
                      onChange={inputHandle}
                      className=" form-control m-2"
                      type="text"
                      name="name"
                      value={inputVal?.name}
                      placeholder="Enter category name"
                    />

                    <button
                      className=" btn btn-primary text-white fs-5 w-50 ms-2 btn-outline-success"
                      type="submit"
                      data-bs-dismiss="modal"
                    >
                      Update Category
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateCategory;
