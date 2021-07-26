/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { BsPencil } from 'react-icons/bs';
import Footer from '../footer/footer';
import defaultAvatar from '../../assets/default-avatar.png';
import Navbar from '../../navbar/navbar';
import { authSignOut } from '../../redux/actions/auth';
import './profile.css';
import { getUserSigned, updateProfile } from '../../redux/actions/user';

const { REACT_APP_BACKEND_URL: URL } = process.env;

const Profile = (props) => {
  const defaultData = props.auth.token;
  const signed = props.user.signed[0];

  const [contacts, setContacts] = useState(props.user.signed.length > 0 && {
    picture: null,
    name: signed.name,
    user_address: signed.user_address,
    username: signed.username,
    phone_number: signed.phone_number,
    first_name: signed.first_name,
    last_name: signed.last_name
  });

  const onClickSignOut = () => {
    props.authSignOut();
  };

  console.log(signed);

  const [modal, setModal] = useState({
    onClick: false
  });

  console.log('asd');

  const handleUpdateProfile = () => {
    props.updateProfile(defaultData.refreshToken, defaultData.userData.id, contacts).then(() => {
      setContacts({
        ...contacts,
        picture: null,
        name: '',
        user_address: '',
        username: '',
        phone_number: '',
        first_name: '',
        last_name: ''
      });
      setModal({
        ...modal,
        onClick: false
      });
      props.getUserSigned(defaultData.refreshToken);
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    props.getUserSigned(defaultData.refreshToken);
  }, [defaultData.userData]);

  console.log(props);

  return signed !== undefined && (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="profile-banner">
        <div className="pl-36 pt-52 flex">
          <div className="user-profile-box flex justify-center">
            <div className="absolute top-52">
              <p className="primary-shadow primary font-bold text-white text-4xl">User Profile</p>
            </div>
          </div>

          <div className="primary user-profile absolute bg-white user-description items-center rounded-lg p-4">
            <div className="flex-col flex items-center h-full justify-between">
              <div className="space-y-7">
                <div className="flex flex-row justify-between">
                  <div className="flex items-center space-y-4 flex-col justify-center">
                    <input
                      className="w-full"
                      type="file"
                      onChange={(e) => setContacts({
                        ...contacts,
                        picture: e.target.files[0]
                      })}
                    />
                    <img className="h-32 w-32 rounded-full" src={`${URL}${signed.picture}` ? `${URL}${signed.picture}` : defaultAvatar} alt="" />
                  </div>
                </div>
                <div className="flex-col leading-9 text-center">
                  <div>
                    <p className="font-bold text-2xl">{signed.name}</p>
                  </div>
                  <div>
                    <p>{signed.username}</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p>No Orders Yet</p>
              </div>
            </div>
            <div />
          </div>

          <div id="user-contacts" className="user-profile primary flex-1 bg-white absolute justify-center items-center rounded-lg">
            <div className="flex flex-col">
              <div className="flex-1 flex flex-row pt-5">
                <div className="flex-1 w-96 relative pl-10">
                  <p className="font-bold text-gray-600 text-2xl">Contacts</p>
                </div>
                <div className="flex-1 flex justify-end items-end relative">
                  <div className="pr-5 pb-2">
                    <button type="button" className="text-one-bg relative top-1 h-6 w-6 rounded-full text-center flex items-center justify-center">
                      <BsPencil
                        className="text-white"
                        // onClick={() => {
                        //   setContacts({
                        //     ...contacts,
                        //     username: signed.username,
                        //     phone_number: signed.phone_number,
                        //     user_address: signed.user_address
                        //   });
                        // }}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 pt-5">
                <div className="flex flex-row h-96 pl-10">

                  <div className="flex-1">
                    <div className="user-contact-modal flex flex-col">
                      <div className="flex-1">
                        <label htmlFor>
                          <p className="text-gray-400">
                            Email Address:
                          </p>
                          <div className="bottom-border">
                            <input
                              className="w-full"
                              value={contacts.username}
                              type="text"
                              placeholder=""
                              onChange={(e) => setContacts({
                                ...contacts,
                                username: e.target.value
                              })}
                            />
                          </div>
                        </label>
                      </div>
                      <div className="flex-1 pt-36">
                        <label htmlFor>
                          <p className="text-gray-400">
                            {' '}
                          </p>
                          Delivery Address
                          <div className="bottom-border-2nd">
                            <input
                              className="w-full"
                              value={contacts.user_address}
                              type="text"
                              placeholder=""
                              onChange={(e) => setContacts({
                                ...contacts,
                                user_address: e.target.value
                              })}
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="user-contact-modal">
                      <label htmlFor>
                        <p className="text-gray-400">
                          Mobile Number:
                        </p>
                        <div className="bottom-border">
                          <input
                            className="w-full"
                            value={contacts.phone_number}
                            type="text"
                            placeholder=""
                            onChange={(e) => setContacts({
                              ...contacts,
                              phone_number: e.target.value
                            })}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="user-details user-profile primary border-2 bg-white flex-1">
            <div className="flex flex-row">

              <div className="flex flex-col">

                <div className="flex-1 flex flex-row pt-5">
                  <div className="flex-1 w-96 relative pl-10">
                    <p className="font-bold text-gray-600 text-2xl">Details</p>
                  </div>
                  <div id="contacts-pen" className="flex-1 flex justify-end items-end relative">
                    <div className="details-pen pb-2">
                      <button type="button" className="text-one-bg relative top-1 h-6 w-6 rounded-full text-center flex items-center justify-center">
                        <BsPencil
                          className="text-white"
                          // onClick={() => {
                          //   setModal({
                          //     ...modal,
                          //     onClick: true
                          //   });
                          //   setContacts({
                          //     ...contacts,
                          //     name: signed.name,
                          //     first_name: signed.first_name,
                          //     last_name: signed.last_name
                          //   });
                          // }}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 pt-5">
                  <div className="flex flex-row h-96 pl-10 space-x-10">

                    <div className="flex-1">
                      <div className="user-contact-modal flex flex-col">
                        <div className="flex-1">
                          <label htmlFor>
                            <p className="text-gray-400">
                              Display name:
                            </p>
                            <div className="bottom-border">
                              <input
                                className="w-full"
                                // defaultValue={contacts.name}
                                value={contacts.name}
                                type="text"
                                placeholder=""
                                onChange={() => setContacts({
                                  ...contacts,
                                  name: signed.name
                                })}
                              />
                            </div>
                          </label>
                        </div>
                        <div className="flex-1">
                          <label htmlFor>
                            <p className="text-gray-400">
                              First name:
                            </p>
                            <div className="bottom-border-2nd">
                              <input
                                className="w-full"
                                value={contacts.first_name}
                                type="text"
                                placeholder=""
                                onChange={(e) => setContacts({
                                  ...contacts,
                                  first_name: e.target.value
                                })}
                              />
                            </div>
                          </label>
                        </div>
                        <div className="flex-1">
                          <label htmlFor>
                            <p className="text-gray-400">
                              Last name:
                            </p>
                            <div className="bottom-border-2nd">
                              <input
                                className="w-full"
                                value={contacts.last_name}
                                type="text"
                                placeholder=""
                                onChange={(e) => setContacts({
                                  ...contacts,
                                  last_name: e.target.value
                                })}
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 pl-20">

                      <div className="flex flex-col">

                        <div className="flex-1 user-contact-modal">
                          <div className="text-gray-400">
                            <p>DD/MM/YY:</p>
                          </div>
                          <div className="bottom-border">
                            <p>03/04/90</p>
                          </div>
                        </div>

                        <div className="user-contact-modal pt-10 flex flex-col space-y-5">
                          <div className="flex flex-row space-x-3">
                            <div className="flex justify-center items-center">
                              <label htmlFor className="radio">
                                <input type="radio" name="gender" />
                                <span className="item" />
                              </label>
                            </div>
                            <div>
                              <span>Male</span>
                            </div>
                          </div>

                          <div className="flex flex-row space-x-3">
                            <div className="flex justify-center items-center">
                              <label htmlFor className="radio">
                                <input type="radio" name="gender" />
                                <span className="item" />
                              </label>
                            </div>
                            <div>
                              <span>Female</span>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>

                    <div className="flex-1 flex flex-col space-y-8 pl-24">
                      <div className="font-bold text-white text-2xl flex items-center justify-center text-center relative bottom-14">
                        <p className="w-72">
                          Do you want to save the change?
                        </p>
                      </div>
                      <div className="flex-1 flex flex-col space-y-5 w-96 h-44">
                        <div className="flex items-center h-16 rounded-2xl">
                          <button type="button" className="text-one-bg w-full h-full rounded-2xl font-bold text-white text-xl" onClick={handleUpdateProfile}>Save Change</button>
                        </div>
                        <div className="flex h-16 rounded-2xl">
                          <button type="button" className="text-two-bg w-full h-full save-changes-color rounded-2xl font-bold text-xl">Cancel</button>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col space-y-3 save-changes-color">
                        <div className="flex items-center h-16 rounded-2xl bg-white">
                          <button type="button" className="font-bold w-full h-full">Edit Password</button>
                        </div>
                        <div className="flex h-16 rounded-2xl bg-white">
                          <button onClick={onClickSignOut} type="button" className="font-bold w-full h-full">Sign Out</button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
};

Profile.defaultProps = ({
  updateProfile: () => {},
  authSignOut: () => {},
  getUserSigned: () => {},
  user: [],
  auth: []
});

Profile.propTypes = {
  authSignOut: PropTypes.func,
  updateProfile: PropTypes.func,
  getUserSigned: PropTypes.func,
  user: PropTypes.node,
  auth: PropTypes.node
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user
});

const mapDispatchToProps = { updateProfile, authSignOut, getUserSigned };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
