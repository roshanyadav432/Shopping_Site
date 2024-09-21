/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Home.css";
import Category from "./Category/Category";
function Home({ setProducts, setSelectedCategory }) {
  const Images = [
    "https://img.freepik.com/free-vector/flat-sale-landing-page-template-with-photo_23-2149055632.jpg?t=st=1722058893~exp=1722062493~hmac=2c8ecda900b023958837e69ab0f6262c05d59804b1ccc9d06dce26e7ab3a69fb&w=900",
    "https://img.freepik.com/free-vector/hand-drawn-shopping-center-landing-page_23-2149336510.jpg?t=st=1722058924~exp=1722062524~hmac=117db34e2454b3422614e6b39acc42805d55895226d898d0a359a89da630b469&w=900",
    "https://img.freepik.com/free-psd/landing-page-template-online-fashion-sale_23-2148585400.jpg?t=st=1722058958~exp=1722062558~hmac=7036d4d38dec6007f67f3e2e7479cb0e3007008bb51f79f01a0aec2a5d383817&w=900",
    "https://img.freepik.com/free-vector/fashion-sale-landing-page_23-2148587977.jpg?t=st=1722059028~exp=1722062628~hmac=9b60cdcab90795e6fdb36c99168b06bafea1ed027106bac1eb6ab64cbb9119dd&w=900",
    "https://img.freepik.com/free-vector/flat-design-online-shopping-landing-page_52683-37401.jpg?t=st=1722059076~exp=1722062676~hmac=6d0cd2ad1c4aa1b53a1276e462bc504809f86b7c1cce2b5230ee855bc6765084&w=900",
    "https://img.freepik.com/free-vector/flat-sale-landing-page-template_52683-15404.jpg?t=st=1722059110~exp=1722062710~hmac=014a653b711dc8bbea84d08ab5ca5df771a95fdd4f542f144e2e38f3420c9d65&w=900",
  ];
  const [ImageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    const Id = setInterval(() => {
      next();
    }, 10000);
    return () => clearInterval(Id);
  }, []);

  function next() {
    setImageIndex((imageIndex) => {
      return imageIndex == Images.length - 1 ? 0 : imageIndex + 1;
    });
  }

  //prevesious button:
  function prev() {
    setImageIndex((imageIndex) => {
      return imageIndex == 0 ? Images.length - 1 : imageIndex - 1;
    });
  }
  return (
    <div className="home">
      <div
        className="imageCrousel"
        style={{
          backgroundImage: `url(${Images[ImageIndex]})`,
        }}
      >
        <button className="btn" onClick={prev}>
          &#10094;
        </button>
        <button className="btn" onClick={next}>
          &#10095;
        </button>
      </div>
      <div className="category">
        <Category
          setProducts={setProducts}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
}

export default Home;
