import React from 'react';
import { AiFillFacebook, AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai';
import coffee1 from '../../assets/coffee-1.png';
import './footer.css';

const Footer = () => (
  <div className="hidden md:flex flex-row justify-between px-32 py-36">
    <div className="flex flex-col space-y-6">
      <div className="flex flex-row space-x-3 ">
        <div>
          <img className="object-cover" src={coffee1} alt="" />
        </div>
        <div className="flex items-center">
          <p className="tracking-wider primary-text font-bold text-lg">Coffee Shop</p>
        </div>
      </div>
      <div className="w-52 tracking-wider">
        <p>
          Coffee Shop is a store that sells some good meals,
          and especially coffee. We provide high quality beans
        </p>
      </div>
      <div className="flex flex-col relative space-x-5 space-y-4">
        <div className="flex flex-row space-x-5">
          <div className="text-center h-10 w-10 flex items-center justify-center rounded-full bg-yellow-400">
            <AiFillFacebook />
          </div>
          <div className="text-center h-10 w-10 flex items-center justify-center rounded-full bg-yellow-400">
            <AiFillTwitterCircle />
          </div>
          <div className="text-center h-10 w-10 flex items-center justify-center rounded-full bg-yellow-400">
            <AiFillInstagram />
          </div>
        </div>
        <div className="tracking-wider">
          <p>
            ©2020CoffeeStore
          </p>
        </div>
      </div>
    </div>

    <div className="flex flex-row space-x-24 tracking-wider">
      <div>
        <div className="flex flex-col">
          <div className="space-y-2">
            <p className="font-bold text-xl">
              Product
            </p>
            <p>
              Download
            </p>
            <p>
              Pricing
            </p>
            <p>
              Locations
            </p>
            <p>
              Countries
            </p>
            <p>
              Blog
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="font-bold text-xl">
          Engage
        </p>
        <p>
          Coffee Shop?
        </p>
        <p>
          FAQ
        </p>
        <p>
          About Us
        </p>
        <p>
          Privacy Policy
        </p>
        <p>
          Terms of Service
        </p>
      </div>
    </div>
  </div>
);

export default Footer;
