import { createContext, useContext, useEffect, useState } from "react";
import axios  from "axios";

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [moreInfo, setMoreInfo] = useState("");
  const [loading, setLoading] = useState(false);



  let getMoreInfo = async (item) => {
    setMoreInfo(item);
  };
  //========================================================
  const [similarProducts, setSimilarProducts] = useState([]);

  let getSimilarProducts = async () => {
    try {
      setLoading(true)
      let res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/products/search/similar/${
          moreInfo?._id
        }/${moreInfo?.category?._id}`,
        {
          method: "GET",
        }
      );
      setLoading(false)
      let data = await res.json();
      setSimilarProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (moreInfo.length < 1) return;
    getSimilarProducts();
  }, [moreInfo]);

  const [amount, setAmount] = useState();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    let storageCart = localStorage.getItem('cart')
    if(storageCart) setCart(JSON.parse(storageCart))
  }, [])
  //=================================================
    let [page, setPage] = useState(1);
  let [total, setTotal] = useState(0);

     let [priceCat, setPriceCat] = useState("");
     let priceCatArr = priceCat && priceCat?.split(",").map((v) => Number(v));

  let submitHandler = async (e) => {
    e && e.preventDefault();
    try {
      setLoading(true)
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/search`,
        {
          keyword,
          page: 1,
          size: 8,
          priceCatArr,
        }
      );
      setLoading(false);
      setPage(2)
      setTotal(data.total)
      setResults(data.products);
    } catch (error) {
      console.log(error);
    }

  };


  //=================================================
  let submitHandlerScroll = async (page) => {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/search`,
        {
          keyword,
          page: 1,
          size: 8,
          priceCatArr,
        }
      );
      setLoading(false);
      setPage(page+1)
      setResults([...results,...data.products]);
    } catch (error) {
      console.log(error);
    }

  };

    useEffect(() => {
      keyword && submitHandler();
    }, [priceCat]);
  
    useEffect(() => {
      setPriceCat('')
    }, [keyword]);

  return (
    <SearchContext.Provider
      value={{
        getMoreInfo,
        moreInfo,
        similarProducts,
        cart,
        setCart,
        keyword,
        setKeyword,
        results,
        setResults,
        submitHandler,
        total,
        page,
        submitHandlerScroll,
        loading,
        amount,
        setAmount,
        priceCat,
        setPriceCat,
        priceCatArr,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchContextProvider };
