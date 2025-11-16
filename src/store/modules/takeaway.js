// 编写store

import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore =  createSlice({
    name: 'foods',
    initialState: {
        // 商品列表
        foodsList:[],
        // 菜单激活下标值
        activeIndex:0,
        // 购物车列表
        cartList:[]
    },
    reducers: {
        // 更改商品列表
        setFoodsList(state, action) {
            state.foodsList = action.payload
        },
        // 更改activeIndex
        changeActiveIndex(state, action) {
            state.activeIndex = action.payload
        },
        // 添加购物车
        addCart(state, action) {
            const item = state.cartList.find((item) => item.id === action.payload.id)
            if (item) {
                item.count++
            }else{
                state.cartList.push(action.payload)
            }
        },
        // count增
        increCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id);
            item.count++
        },

        // count减
        decreCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id);
            if (item.count === 0) {
                return
            }
            item.count--
        },
        // 清除购物车
        clearCart(state, action) {
            state.cartList = []
        }

    }
})

// 异步获取部分
const {setFoodsList,changeActiveIndex,addCart,clearCart,increCount,decreCount,} = foodsStore.actions;
const fetchFoodsList = () =>{
    return async (dispatch)=>{
        // 编写异步逻辑
        const res =  await axios.get("http://localhost:3004/takeaway")

        dispatch(setFoodsList(res.data))
    }
}

export {fetchFoodsList,changeActiveIndex,addCart,increCount,decreCount,clearCart}

const reducer = foodsStore.reducer;

export default reducer;
