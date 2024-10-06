import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const CategoryTable = () => {
  const [inputVal, setInputVal] = useState({
    name: "",
    parentId: "",
    picture: "",
  });
  let { token, category, getCategory } = useAuth();
    let [loading, setLoading] = useState(false);
  let inputHandle = (e) => {
    let { name, value } = e.target;
    setInputVal((prev) => ({ ...prev, [name]: value }));
  };
//===============================================
  let categorySubmit = async (e) => {
    e.preventDefault();
      let formdata = new FormData();
      formdata.append("picture", inputVal.picture);
      formdata.append("name", inputVal.name);
      formdata.append("parentId", inputVal.parentId);

    try {

 setLoading(true);

      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/category/create-category`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (data.success) {
        toast.success(data.msg);
        setInputVal({
          name: "",
           parentId: inputVal.parentId,
          picture: inputVal.picture,
        });
        getCategory();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log({ msg: "create category", error });
    }
  };

  //====== without picture=================
  // let categorySubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     let res = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}/category/create-category`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(inputVal),
  //       }
  //     );

  //     let data = await res.json();
  //     if (res.ok) {
  //       toast.success(data.msg);
  //       setInputVal({ name: "", parentId: inputVal.parentId });
  //       getCategory();
  //     } else {
  //       toast.error(data.msg);
  //     }
  //   } catch (error) {
  //     console.log({ msg: "create category", error });
  //   }
  // };
  return (
    <div>
      <div className=" mb-3 col-md-6">
        <div className=" px-3">
          <h3>Create new category</h3>
        </div>
        <form onSubmit={categorySubmit} className="">
          <input
            onChange={inputHandle}
            className=" form-control m-2 text-capitalize border border-black"
            type="text"
            name="name"
            value={inputVal?.name}
            placeholder="Enter category name"
          />

          <input
            className="form-control border border-black m-2"
            list="categoryList"
            type={"text"}
            placeholder="Select Parent ID"
            // eslint-disable-next-line react/prop-types
            onChange={(e) => {
              let cat = category.filter((item) => item.slug === e.target.value);
              setInputVal((prev) => ({
                ...prev,
                parentId: cat[0]?._id,
              }));
            }}
          />

          <datalist id="categoryList">
            {category.map((item) => {
              return <option key={item._id} value={item.slug}></option>;
            })}
          </datalist>

          <label htmlFor="pic" className="">
            Upload product image (jpeg, jpg, png, webp, Max size- 1mb)
          </label>
          <input
            className="form-control border border-black m-2"
            id="pic"
            type="file"
            name="picture"
            accept="image/*"
            onChange={(e) => {
              inputHandle({
                target: { name: "picture", value: e.target.files[0] },
              });
            }}
          />

          <div className="mb-4 ms-2">
                  {inputVal.picture && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(inputVal.picture)}
                        alt="image"
                        className="img img-responsive"
                        height={"100px"}
                      />
                    </div>
                  )}
                </div>

          <button
            className=" btn btn-primary w-100 text-white fs-5 ms-2 btn-outline-success"
            type="submit"
            disabled={loading}
          >
            Create Category
          </button>
        </form>
      </div>
      <hr />
    </div>
  );
};

export default CategoryTable;
