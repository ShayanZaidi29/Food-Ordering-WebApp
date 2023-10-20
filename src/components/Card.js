import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const data = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  const options = props.options;
  const foodItem = props.foodItem;
  const dispatch = useDispatchCart();

  const handleAddToCart = async () => {
    const finalPrice = qty * parseInt(options[size]);

    await dispatch({
      type: 'ADD',
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    console.log(data);
  };

  const handleClick = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  };

  const handleQty = (e) => {
    setQty(parseInt(e.target.value)); // Parse the value to an integer
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (
    <div>
      <div className="card mt-3" style={{ width: '16rem', maxHeight: '360px' }}>
        <img src={foodItem.img} className="card-img-top" alt="..." style={{ height: '120px', objectFit: 'fill' }} />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <div className="container w-100 p-0" style={{ height: '38px' }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" onChange={handleQty}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className="m-2 h-100 w-20 bg-success rounded" ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
              {Object.keys(options).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}

              
            </select>
            <div className="d-inline ms-2 h-100 w-20 fs-5">
              ₹{finalPrice}/-
              </div>
          </div>
          <hr></hr>
          <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
