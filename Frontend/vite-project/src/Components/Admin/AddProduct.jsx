import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
useNavigate;
function AddProduct() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const priceRef = useRef();
  const audienceRef = useRef();
  const categoryRef = useRef();
  const pictureRef = useRef(null);
  const stockRef = useRef();
  const ratingRef = useRef();
  const descriptionRef = useRef();
  async function handleAddProduct(e) {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", nameRef.current.value);
      formData.append("price", priceRef.current.value);
      formData.append("audience", audienceRef.current.value);
      formData.append("category", categoryRef.current.value);
      formData.append("stock", stockRef.current.value);
      formData.append("rating", ratingRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("file", pictureRef.current.files[0]);
      console.log(pictureRef.current.files[0]);

      //sending it to the database:
      const Data = await axios.post(
        "http://localhost:8000/AddProduct",
        formData,
        { withCredentials: true }
      );
      alert(Data.data);
      navigate("/admin/UpdateProduct");
      (nameRef.current.value = ""),
        (priceRef.current.value = ""),
        (audienceRef.current.value = ""),
        (categoryRef.current.value = ""),
        (pictureRef.current = ""),
        (stockRef.current.value = ""),
        (ratingRef.current.value = "");
      descriptionRef.current.value = "";
      pictureRef.value = "";
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleAddProduct}>
        <h1 className="h3 mb-3 fw-normal">Add Products</h1>
        <div className="form-floating">
          <input
            type="text"
            required
            className="form-control"
            id="floatingInputName"
            placeholder="name:"
            ref={nameRef}
            autoComplete="true"
          />
          <label htmlFor="floatingInputName">Product Name</label>
        </div>
        {/* price: */}
        <div className="form-floating">
          <input
            autoComplete="true"
            required
            type="number"
            className="form-control"
            id="floatingInputPrice"
            placeholder="Price"
            ref={priceRef}
          />
          <label htmlFor="floatingInputPrice">Price</label>
        </div>
        <div className="form-floating">
          <select
            id="floatingInput"
            className="form-control"
            placeholder="Catgory:"
            ref={categoryRef}
            required
          >
            <option>Clothing & Accessories</option>
            <option>Electronics</option>
            <option>Home & Kitchen</option>
            <option>Beauty & Personal Care</option>
            <option>Sports & Outdoors</option>
            <option>Toys & Games</option>
          </select>
          <label htmlFor="floatingInput">Select Category </label>
        </div>
        {/* Audience: */}
        <div className="form-floating">
          <select
            className="form-control"
            id="gender"
            required
            ref={audienceRef}
            autoComplete="true"
            placeholder="abc"
          >
            <option>man</option>
            <option>women</option>
            <option>girl</option>
            <option>boy</option>
            <option>Little girl</option>
            <option>Little boy</option>
          </select>
          <label htmlFor="gender">select Audience</label>
        </div>

        {/* select picture */}
        <div className="form-floating">
          <input
            type="file"
            autoComplete="true"
            required
            className="form-control"
            id="userDp"
            accept=".jpg,.jpeg,.png"
            ref={pictureRef}
          />
          <label htmlFor="userDp">Select Your Products picture:</label>
        </div>

        {/* Stocks: */}
        <div className="form-floating">
          <input
            autoComplete="true"
            ref={stockRef}
            required
            type="number"
            className="form-control"
            id="stock"
            placeholder="stock:"
          />
          <label htmlFor="stock">Total Stocks</label>
        </div>
        <div className="form-floating">
          <input
            autoComplete="true"
            required
            type="number"
            className="form-control"
            id="rating"
            placeholder="rating:"
            ref={ratingRef}
          />
          <label htmlFor="rating">rating</label>
        </div>
        {/* description: */}
        <div className="form-floating">
          <input
            autoComplete="true"
            required
            type="text"
            className="form-control"
            id="description"
            placeholder="rating:"
            ref={descriptionRef}
          />
          <label htmlFor="description">description about product:</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Add
        </button>
        <p className="mt-5 mb-3 text-muted">© 2024–2025</p>
      </form>
    </div>
  );
}

export default AddProduct;
