import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import AdminMenu from "./AdminMenu";
import { toast } from 'react-toastify';
import PriceFormat from "../../Helper/PriceFormat";

const AdminPanel = () => {
  let [startDate, setStartDate] = useState(new Date(2024, 0, 1));
  let [endDate, setEndDate] = useState(new Date());
  let { Axios } = useAuth();
  let [loading, setLoading] = useState(false);
  let [totalSale, setTotalSale] = useState('');
  let [totalSaleToday, setTotalSaleToday] = useState('');
  let [timeDiff, setTimeDiff] = useState({days:'', hrs:'', mins:''});
  
  let seconds = Math.floor((new Date(endDate) - new Date(startDate)) / 1000);
  console.log(totalSaleToday);

  let timeConvert = (seconds) => {
    let days = Math.floor(seconds / 86400)
    let hrs = Math.floor((seconds % 86400)/3600)
    let mins = Math.floor((seconds % 3600)/60)
    setTimeDiff({days, hrs, mins})
  }
   useEffect(() => {
     timeConvert(seconds);
   }, [seconds]);

  //==================================
  let submitted = async (e) => {
    e && e.preventDefault()
    try {
      setLoading(true);
      let { data } = await Axios.get(`/admin/total-sale`, {
        params: {
          startDate,
          endDate,
        },
      });
      setLoading(false);
      if (data.success) {
        setTotalSaleToday(data.totalSaleToday)
        setTotalSale(data.totalSale);
      } else {
        setTotalSale(data.totalSale);
        toast.error(data.msg)
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    submitted()
  }, [])
  

  return (
    <Layout title={"Admin panel"}>
      <div className={loading ? "dim" : ""}>
        <div className="row ">
          <div className="col-md-3 p-2">
            <div className="card p-2">
              <AdminMenu />
            </div>
          </div>
          <div className=" col-md-9 p-2">
            <div className=" p-2 col-md-6 border mt-2">
              <h4>
                Total Sale in last{" "}
                <span className={timeDiff?.days ? "" : "d-none"}>
                  {timeDiff?.days} days{" "}
                </span>{" "}
                <span className={timeDiff?.hrs ? "" : "d-none"}>
                  {timeDiff?.hrs} hours{" "}
                </span>{" "}
                <span className={timeDiff?.mins ? "" : "d-none"}>
                  {timeDiff.mins} minutes{" "}
                </span>{" "}
              </h4>
              <div>
                <form onSubmit={submitted} className=" w-100">
                  <label htmlFor="sdate" className=" fw-bold">
                    Start Date
                    <input
                      id="sdate"
                      className=" mb-3 form-control"
                      onChange={(e) => setStartDate(e.target.value)}
                      // type="date"
                      type="datetime-local"
                    />
                  </label>
                  <label htmlFor="edate" className=" fw-bold">
                    End Date
                    <input
                      id="edate"
                      className=" mb-3 form-control"
                      onChange={(e) => setEndDate(e.target.value)}
                      // type="date"
                      type="datetime-local"
                    />
                  </label>

                  <button
                    className="btn btn-success d-block mb-2"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div>
                <h4>Total Sale: {<PriceFormat price={totalSale} />} </h4>
                <h4 className="text-success">Todays Sale: {<PriceFormat price={totalSaleToday} />} </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
