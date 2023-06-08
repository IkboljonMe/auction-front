import React from "react";
import { Link } from "react-router-dom";
import {BiChevronRightCircle} from 'react-icons/bi'
import "../styles/footer.css";

export default function Footer() {
  return (
   <div className="footer-link">
    <div className="footer">
      <div className="footer-links">
        <h1>Shipping</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          mollitia eius, similique at consequuntur quia incidunt voluptatum
          facere inventore quae.
        </p>
      </div>
      <div className="footer-links">
        <h1>Auction</h1>
        <ul>
          <li>
            <Link to={'/'}><BiChevronRightCircle className="right"/>Auction</Link>
          </li>
          <li>
            <Link to={'/'}><BiChevronRightCircle className="right"/>Auction</Link>
          </li>
          <li>
            <Link to={'/'}><BiChevronRightCircle className="right"/>Auction</Link>
          </li>
          <li>
            <Link to={'/'}><BiChevronRightCircle className="right"/>Auction</Link>
          </li>
          <li>
            <Link to={'/'}><BiChevronRightCircle className="right"/>Auction</Link>
          </li>
        </ul>
      </div>
      <div className="footer-links">
        <h1>Footer</h1>
        <ul>
          <li>
            <Link to={'/'}><BiChevronRightCircle className="right"/>Auction</Link>
          </li>
          <li>
            <Link to={'/'}><BiChevronRightCircle className="right"/>Auction</Link>
          </li>
          <li>
            <Link to={'/'}><BiChevronRightCircle className="right"/>Auction</Link>
          </li>
          <li>
            <Link to={'/'}><BiChevronRightCircle className="right"/>Auction</Link>
          </li>
          <li>
            <Link to={'/'}><BiChevronRightCircle className="right"/>Auction</Link>
          </li>
        </ul>
      </div>
      
    </div>
     
   </div>
  );
}
