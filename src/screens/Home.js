import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      const foodCatResponse = await fetch("http://localhost:5000/api/foodCategory", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const foodItemResponse = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application.json'
        }
      });

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
      <div>
        <Navbar />
        <Carousal />
        <div className="container">
          {foodCat.length > 0
            ? foodCat.map((data) => (
                <div key={data.id} className="fs- m-3">
                  {data.CategoryName}
                  <hr />
                  <div className="row">
                    {foodItem.length > 0 ? (
                      foodItem
                        .filter(
                          (items) =>
                            items.CategoryName === data.CategoryName &&
                            items.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((filterItems) => (
                          <div key={filterItems.id} className="col-12 col-md-6 col-lg-3">
                            {console.log(filterItems.url)}
                            <Card
                              foodName={filterItems.name}
                              item={filterItems}
                              options={filterItems.options[0]}
                              ImgSrc={filterItems.img}
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
