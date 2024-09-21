/* eslint-disable react/prop-types */
import { useRef } from "react";
import "../Filters/Filter.css";
import axios from "axios";
function Filter({ setProducts, selectedCategory }) {
  const priceFilterRef = useRef();
  const ratingFilterRef = useRef();
  async function handlePriceFilter() {
    try {
      const Data = await axios.post(
        `http://localhost:8000/filterPrice/${priceFilterRef.current.value}`,
        { selectedCategory },
        {
          withCredentials: true,
        }
      );
      setProducts(Data.data);
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function handleRatingFilter() {
    try {
      const Data = await axios.post(
        `http://localhost:8000/filterRating/${ratingFilterRef.current.value}`,
        { selectedCategory },
        {
          withCredentials: true,
        }
      );
      setProducts(Data.data);
    } catch (error) {
      alert(error.response.data);
    }
  }
  return (
    <div className="filters">
      <div className="dropdown">
        <label htmlFor="PriceFilter">
          <b>Price:</b>
        </label>
        <select
          id="PriceFilter"
          ref={priceFilterRef}
          onChange={() => {
            handlePriceFilter();
          }}
        >
          <option className="dropdown-item">Default</option>
          <option className="dropdown-item">Low To High</option>
          <option className="dropdown-item">High To Low</option>
        </select>
      </div>

      {/* rating Filters */}
      <div className="dropdown">
        <label htmlFor="RatingFilter">
          <b>Rating:</b>
        </label>
        <select
          id="RatingFilter"
          ref={ratingFilterRef}
          onChange={() => {
            handleRatingFilter();
          }}
        >
          <option className="dropdown-item">Default</option>
          <option className="dropdown-item">Low To High</option>
          <option className="dropdown-item">High To Low</option>
        </select>
      </div>
    </div>
  );
}
export default Filter;
