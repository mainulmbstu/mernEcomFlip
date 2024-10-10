import { useAuth } from '../context/AuthContext'


const HomeCatPage = () => {
let {category}=useAuth()

  return (
    <div className="row my-2">
      {category.length &&
        category.map((item) => (
          <div key={item._id} className="col-4 col-md-2">
            <div>
              <img
                src={
                  item.picture
                    ? `${import.meta.env.VITE_BASE_URL}/${item.picture}`
                    : `/placeholder.jpg`
                }
                // `${import.meta.env.VITE_BASE_URL}/${cat.picture }`
                alt="image"
                width={"100%"}
                height={200}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default HomeCatPage