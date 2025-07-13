import axios from "axios";
import { FETCH_COIN_BY_ID_FAILURE, FETCH_COIN_BY_ID_REQUEST, FETCH_COIN_BY_ID_SUCCESS, FETCH_COIN_DETAILS_FAILURE, FETCH_COIN_DETAILS_REQUEST, FETCH_COIN_DETAILS_SUCCESS, FETCH_COIN_LIST_FAILURE, FETCH_COIN_LIST_REQUEST, FETCH_COIN_LIST_SUCCESS, FETCH_MARKET_CHART_FAILURE, FETCH_MARKET_CHART_REQUEST, FETCH_MARKET_CHART_SUCCESS, FETCH_TOP_50_COINS_FAILURE, FETCH_TOP_50_COINS_REQUEST, FETCH_TOP_50_COINS_SUCCESS } from "./ActionType";
import api, { API_BASE_URL } from "@/config/api";

export const getCoinList = (page) => async(dispatch) =>{
    dispatch({type: FETCH_COIN_LIST_REQUEST})
    
    const baseUrl = "http://localhost:5455"
    
    try {
        const {data} = await axios.get(`${baseUrl}/coins?page=${page}`);
        console.log("coin list", data)
        dispatch({type: FETCH_COIN_LIST_SUCCESS, payload:data})
        
    } catch(error){
        dispatch({type: FETCH_COIN_LIST_FAILURE, payload:error.message})
        console.log(error);
    }
};

export const getTop50CoinList = () => async (dispatch) => {
    dispatch({ type: FETCH_TOP_50_COINS_REQUEST })

    try {
        const {data} = await axios.get(`${API_BASE_URL}/coins/top50`)
        dispatch({ type: FETCH_TOP_50_COINS_SUCCESS, payload: data})
        console.log("top 50", data)

    } catch (error) {
        console.log("error", error)
        dispatch({ type: FETCH_TOP_50_COINS_FAILURE, payload: error.message})
    }
}

export const fetchMarketChart = ({coinId, days, jwt}) => async (dispatch) => {
    dispatch({ type: FETCH_MARKET_CHART_REQUEST})

    try {
        const {data} = await api.get(`/coins/${coinId}/chart?days=${days}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: data})

    } catch (error) {
        console.log("error", error)
        dispatch({ type: FETCH_MARKET_CHART_FAILURE, payload: error.message})
    }
}

export const fetchCoinBYId = (coinId) => async (dispatch) => {
    dispatch({ type: FETCH_COIN_BY_ID_REQUEST })

    try {
        const {data} = await axios.get(`${API_BASE_URL}/coins/${coinId}`)
        dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: data})
        console.log("coin by id", data)

    } catch (error) {
        console.log("error", error)
        dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload: error.message})
    }
}

export const fetchCoinDetails = ({coinId, jwt}) => async (dispatch) => {
    dispatch({ type: FETCH_COIN_DETAILS_REQUEST })

    try {
        const {data} = await api.get(`/coins/details/${coinId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch({ type: FETCH_COIN_DETAILS_SUCCESS, payload: data})
        console.log("coin details", data)

    } catch (error) {
        console.log("error", error)
        dispatch({ type: FETCH_COIN_DETAILS_FAILURE, payload: error.message})
    }
}