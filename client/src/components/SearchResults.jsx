import { useSearch } from "../context/SearchContext";
import Layout from "./Layout";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "./ProductCard";

const SearchResults = () => {
  const { results, submitHandlerScroll, total, page, loading } = useSearch();


  return (
    <Layout title={"Search result"}>
      <div className={loading ? "dim" : ""}>
        <InfiniteScroll
          dataLength={results?.length && results?.length}
          next={() => submitHandlerScroll(page)}
          hasMore={results?.length < total}
          loader={<h1>Loading...</h1>}
          endMessage={<h4 className=" text-center">All items loaded</h4>}
        >
          <div className="row g-3">
            <h3>Search results ({results?.length}) </h3>
            {results?.length &&
              results?.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
          </div>
        </InfiniteScroll>
        <div className="d-flex">
          {results.length < total ? (
            <>
              <button
                onClick={() => submitHandlerScroll(page)}
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
    </Layout>
  );
};

export default SearchResults;
