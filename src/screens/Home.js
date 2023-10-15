import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

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
          'Content-Type': 'application/json'
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
      <Navbar />
      <Carousal />
      <div className="container">
        {foodCat.length > 0
          ? foodCat.map((data) => <div key={data.id}>{data.CategoryName}</div>)
          : ""}
        <Card />
      </div>
      <Footer />
    </div>
  );
}
