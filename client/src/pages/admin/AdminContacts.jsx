import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import ContactReplyModal from "../../components/ContactReplyModal";
import InfiniteScroll from "react-infinite-scroll-component";


const AdminContacts = () => {
  let [contacts, setContacts] = useState([]);
  let { token, userInfo, Axios } = useAuth();

  let [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  let [total, setTotal] = useState(0);
  let [replyItem, setReplyItem] = useState('');

  let size=10
  //==================================
  let getAdminContacts = async (page = 1, size) => {
    // page === 1 && window.scrollTo(0, 0);
    try {
      setLoading(true);
      let { data } = await Axios.get(`/admin/contacts`, {
        params: {
          page,
          size,
        },
      });
      setTotal(data.total);
      page === 1 || replyItem
        ? setContacts(data.contacts)
        : setContacts([...contacts, ...data.contacts]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (token && userInfo.role) getAdminContacts(page, size);
  }, [token, userInfo.role]);

  return (
    <Layout title={"Admin contacts"}>
      <div className={loading ? "dim" : ""}>
        <div className="row ">
          <div className="col-md-3 p-2">
            <div className="card p-2">
              <AdminMenu />
            </div>
          </div>
          <div className=" col-md-9 p-2">
            <InfiniteScroll
              dataLength={contacts?.length}
              next={() => {
                setPage(page + 1);
                getAdminContacts(page + 1, size);
              }}
              hasMore={contacts?.length < total}
              loader={<h1>Loading...</h1>}
              endMessage={<h4 className=" text-center">All items loaded</h4>}
            >
              {contacts?.length &&
                contacts.map((item) => {
                  return (
                    <div key={item._id} className="mb-4 border p-2 px-3">
                      <h5>
                        Name: {item.name} ({moment(item?.createdAt).fromNow()}){" "}
                      </h5>
                      <p>email: {item.email} </p>
                      <p>Message: {item.message} </p>
                      <button
                        onClick={() => setReplyItem(item)}
                        type="button"
                        className={`btn ${
                          item?.replies?.length ? "btn-success" : "btn-danger"
                        }`}
                        data-bs-toggle="modal"
                        data-bs-target="#contactReply"
                      >
                        {item?.replies?.length ? "Replied" : "Reply"}
                      </button>

                      <h5>Replies </h5>
                      {item?.replies.map((rep, i) => {
                        return (
                          <div key={i}>
                            <p className=" fw-bold">
                              Reply-{i + 1}: {rep.msg}
                            </p>
                            <p>Time: {moment(rep?.date).fromNow()} </p>
                            <p className=" ms-4">Replied by: {rep.userName}</p>
                            <hr className=" w-25" />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </InfiniteScroll>
          </div>
          <ContactReplyModal
            value={{
              replyItem,
              getAdminContacts,
              page,
              size,
              setReplyItem,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AdminContacts;
