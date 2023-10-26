import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";
import cookies from "js-cookies";


export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [foodItems, setFoodItems] = useState([])

  const loadData = async () => {
    try {
    
      const foodCatResponse = await fetch(
        "http://localhost:5000/api/foodCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const foodItemResponse = await fetch(
        "http://localhost:5000/api/foodData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application.json",
          },
        }
      );

      const foodCatData = await foodCatResponse.json();
      const foodItemData = await foodItemResponse.json();

      setFoodCat(foodCatData);
      setFoodItem(foodItemData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner " id="carousel">
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Type in..."
                  aria-label="Search"
                  value={search} onChange={(e)=> {setSearch(e.target.value)}}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100  "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?barbeque"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="container">
          {foodCat.length > 0
            ? foodCat.map((data) => (
                <div key={data.id} className="fs- m-3">
                  {data.CategoryName} 
                  <hr />
                  <div className="row mb-3">
                    {foodItem.length > 0 ? (
                      foodItem
                        .filter(
                          (items) =>
                            items.CategoryName === data.CategoryName &&
                            items.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        )
                        .map((filterItems) => (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            {console.log(filterItems.url)}
                            
                            <Card foodItem={filterItems}
                              options={filterItems.options[0]}
                              
                            ></Card>
                          </div>
                        ))
                    ) : (
                      <div>No Such Data Found</div>
                    )}
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
      <Footer />
    </div>
  );
}
