/* eslint-disable react/prop-types */
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Category({ setProducts, setSelectedCategory }) {
  const navigate = useNavigate();
  async function getCategory(category) {
    try {
      const Data = await axios.post(
        `http://localhost:8000/selectCategory`,
        { category },
        {
          withCredentials: true,
        }
      );
      setProducts(Data.data);
      navigate("/products");
    } catch (error) {
      alert(error.response.data);
    }
  }
  return (
    <div className="categories">
      <div
        className="card"
        id="electronics"
        onClick={() => {
          getCategory("Electronics");
          setSelectedCategory("Electronics");
        }}
      >
        <img
          id="catImg"
          className="card-img-top"
          src="https://static-assets.business.amazon.com/assets/in/24th-jan/705_Website_Blog_Appliances_1450x664.jpg.transform/1450x664/image.jpg"
          alt="Image"
        />
        <div className="card-body">
          <h5 className="card-title">Electronics</h5>
        </div>
      </div>
      <div
        className=" card"
        id="electronics"
        onClick={() => {
          getCategory("Clothing & Accessories");
          setSelectedCategory("Clothing & Accessories");
        }}
      >
        <img
          id="catImg"
          className="card-img-top"
          src="https://cdn.sanity.io/images/gxmub2ol/production/e00fd223eb02496b9a323594e927a56c3b3def8e-904x826.png"
          alt="Image"
        />
        <div className="card-body">
          <h5 className="card-title">Clothing and Accessories</h5>
        </div>
      </div>
      <div
        className=" card "
        id="electronics"
        onClick={() => {
          getCategory("Home & Kitchen");
          setSelectedCategory("Home & Kitchen");
        }}
      >
        <img
          id="catImg"
          className="card-img-top"
          src="https://kitchenjackpot.com/wp-content/uploads/2023/10/kitchenjackpot1-1024x576.jpg"
          alt="Image"
        />
        <div className="card-body">
          <h5 className="card-title">Home and Kitchen</h5>
        </div>
      </div>
      <div
        className=" card"
        id="electronics"
        onClick={() => {
          getCategory("Beauty & Personal Care");
          setSelectedCategory("Beauty & Personal Care");
        }}
      >
        <img
          id="catImg"
          className="card-img-top"
          src="https://dmrqkbkq8el9i.cloudfront.net/Pictures/480xany/3/8/2/282382_cosmeticsgettyimages1141698953_607071.jpg"
          alt="Image"
        />
        <div className="card-body">
          <h5 className="card-title">Beauty & Personal Care</h5>
        </div>
      </div>
      <div
        className=" card"
        id="electronics"
        onClick={() => {
          getCategory("Sports & Outdoors");
          setSelectedCategory("Sports & Outdoors");
        }}
      >
        <img
          id="catImg"
          className="card-img-top"
          src="https://media.istockphoto.com/id/1223200749/photo/composition-of-various-sport-equipment-for-fitness-and-games.jpg?s=612x612&w=0&k=20&c=-Ss18LANDvpn6anywx-rokVop9G3xFVVY8X-8eKsNZ4="
          alt="Image"
        />
        <div className="card-body">
          <h5 className="card-title">Sports and Outdoors</h5>
        </div>
      </div>
      <div
        className=" card"
        id="electronics"
        onClick={() => {
          getCategory("Toys & Games");
          setSelectedCategory("Toys & Games");
        }}
      >
        <img
          id="catImg"
          className="card-img-top"
          src="https://www.learnenglish.com/wp-content/uploads/toys-games.jpg"
          alt="image"
        />
        <div className="card-body">
          <h5 className="card-title">Toys and Game</h5>
        </div>
      </div>
    </div>
  );
}

export default Category;
