/* eslint-disable no-console */
import { http } from '../../helpers/http';

export const getItemsCategory = () => async (dispatch) => {
  try {
    const { data } = await http().get('http://localhost:3001/category');
    dispatch({
      type: 'GET_CATEGORY',
      payload: {
        items: data.data
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const getItemCategories = (id) => async (dispatch) => {
  try {
    const { data } = await http().get(`http://localhost:3001/category?search=${id}`);
    dispatch({
      type: 'GET_ITEM_CATEGORIES',
      payload: {
        items: data.data
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const getItemsAndVariants = (id) => async (dispatch) => {
  try {
    const { data } = await http().get(`http://localhost:3001/variant/${id}`);
    dispatch({
      type: 'ITEMS_AND_VARIANTS',
      payload: {
        items: data.data
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const getDetailVariant = (id, key) => async (dispatch) => {
  try {
    const { data } = await http().get(`http://localhost:3001/variant/detail/${id}?search=${key}`);
    dispatch({
      type: 'VARIANT_DETAIL',
      payload: {
        items: data.data
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllTransactions = (token, id) => async (dispatch) => {
  try {
    const { data } = await http(token, id).get('http://localhost:3001/private/user-transactions');
    dispatch({
      type: 'GET_ALL_TRANSACTIONS',
      payload: {
        items: data.data
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTransaction = (token, id) => async (dispatch) => {
  const { data } = await http(token).delete(`http://localhost:3001/private/${id}`);
  try {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: data.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const getDetailItem = (id) => async (dispatch) => {
  try {
    const { data } = await http().get(`http://localhost:3001/items/${id}`);
    dispatch({
      type: 'GET_ITEM_BY_ID',
      payload: {
        items: data.data
      }
    });
  } catch (err) {
    console.log(err);
  }
};
