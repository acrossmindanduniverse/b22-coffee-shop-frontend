/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { PropTypes } from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { TiMessages } from 'react-icons/ti';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import coffee1 from '../assets/coffee-1.png';
import { authSignOut } from '../redux/actions/auth';
import { getUserSigned } from '../redux/actions/user';

const Navbar = (props) => {
  const URL = 'https://historycoffee.herokuapp.com';
  const { signed } = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);

  const handleSignOut = () => {
    props.authSignOut();
  };

  useEffect(() => {
    if (props.auth.token !== null) {
      props.getUserSigned(props.auth.refreshToken?.token);
    }
  }, [props.auth.token]);

  const hamburgerVisible = (visible) => {
    setModal(visible);
    if (modal) {
      setModal(!modal);
    }
  };

  return (
    <div>
    <div className="flex flex-col mt-10 mb-10 items-end justify-end md:hidden">
    {modal ? (
      <AiOutlineClose onClick={() => hamburgerVisible(true)} className="text-black font-bold text-2xl mr-14 z-10 close-btn" />
    ) : (
      <GiHamburgerMenu onClick={() => hamburgerVisible(true)} className="text-black font-bold text-2xl mr-14 z-10" />
    )}
      {modal && (
      <div onClick={() => setModal(false)} className="hamburger h-screen w-screen pl-20">
      <div onClick={() => setModal(true)} className="bg-white modal-parent top-20 relative rounded-l-2xl flex items-center">
        <div onKeyPress={(e) => modal && e.preventDefault()} className="bg-white modal relative flex flex-col rounded-l-xl p-3 shadow-2xl">
          <div className="flex flex-row m-10">
            <img className="object-contain" src={coffee1} alt="" />
            <p className="font-bold text-xl relative left-3">
              Coffee Shop
            </p>
          </div>
          <div className="flex flex-col space-y-14 m-10">
            <Link className="nav-hover border-b-2 w-full" to="/">Home</Link>
            <Link className="nav-hover border-b-2 w-full" to="/product-cust">Product</Link>
            <Link className="nav-hover border-b-2 w-full" to="/payment-delivery">Your Cart</Link>
            <Link className="nav-hover border-b-2 w-full" to="/history">History</Link>
          </div>
          <div>
          {
          props.auth.token !== null ? (
            <div className="flex flex-row items-center ">
            <div className="flex flex-col mx-10">
              <Link to="/profile">
              {signed[0]?.picture !== null ? (
                <div className="flex justify-center items-center">
                  <img className="object-cover w-7 h-7 rounded-full " src={`${URL}${signed[0]?.picture}`} alt="" />
                </div>
              ) : (
              <div className="flex justify-center items-center">
                <div className="bg-gray-700 w-9 h-9 rounded-lg" />
              </div>
              )}
              </Link>
              <Link to="/chat">
                <TiMessages className="text-4xl text-black" />
              </Link>
            </div>
            <div>
              <button type="button" onClick={handleSignOut} className="rounded-lg p-4 flex primary-btn mt-3">
                <p>Sign Out</p>
              </button>
            </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mb-10 px-14">
              <Link to="/signin" className="font-bold">Sign In</Link>
              <Link to="/signup" className="rounded-lg flex items-center primary-btn p-4">
                <p>Sign Up</p>
              </Link>
            </div>
          )
        }
          </div>
        </div>
      </div>
      </div>
      )}
    </div>
    <div className="hidden md:flex justify-center items-center bg-white">
      <div className="flex flex-row justify-center space-x-72 items-center ml-14 mr-14 mt-8 mb-8">
        <div className="flex flex-row justify-center">
          <img className="object-contain" src={coffee1} alt="" />
          <p className="font-bold text-xl relative left-3">
            Coffee Shop
          </p>
        </div>
        <div className="flex flex-row space-x-8 mr-32">
          <Link className="nav-hover" to="/">Home</Link>
          <Link className="nav-hover" to="/product-cust">Product</Link>
          <Link className="nav-hover" to="/payment-delivery">Your Cart</Link>
          <Link className="nav-hover" to="/history">History</Link>
        </div>
        <div>
          {
          props.auth.token !== null ? (
            <div className="flex flex-row space-x-8 items-center">
              <Link to="/profile">
              {signed[0]?.picture !== null ? (
                <div className="flex justify-center items-center">
                  <img className="w-7 h-7 rounded-full object-cover" src={`${URL}${signed[0]?.picture}`} alt="" />
                </div>
              ) : (
                <div className="bg-gray-700 w-7 h-7 rounded-full" />
              )}
              </Link>
              <Link to="/chat">
                <TiMessages className="text-4xl text-black" />
              </Link>
              <button type="button" onClick={handleSignOut} className="rounded-full flex justify-center items-center primary-btn">
                <p className="mt-2 mb-2 mr-14 ml-14">Sign Out</p>
              </button>
            </div>
          ) : (
            <div className="flex flex-row space-x-20">
              <Link to="/signin" className="flex justify-center items-center font-bold right-7 relative">Sign In</Link>
              <Link to="/signup" className="rounded-full flex justify-center items-center primary-btn">
                <p className="mt-2 mb-2 mr-14 ml-14">Sign Up</p>
              </Link>
            </div>
          )
        }
        </div>
        <div />
      </div>
    </div>
    </div>

  );
};

authSignOut.defaultProps = {
  authSignOut: () => {},
  getUserSigned: () => {}
};

authSignOut.propTypes = ({
  authSignOut: PropTypes.func,
  getUserSigned: PropTypes.func
});

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = { authSignOut, getUserSigned };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
