import { ADD_TO_CART, DELETE_CART, UPDATE_CART } from "../../shared/constants/action-type";

const initState = {
    items: [],
}
export default (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_CART: return addToCart(state, action.payload);//payload chua thong tin gio hang vua cap nhat
        case UPDATE_CART:return updateCart(state,action.payload);
        case DELETE_CART: 
        const newItems=state.items.filter((item)=>item._id!=action.payload._id);
        return {...state,items:newItems};
        default: return state;

    }
}
const addToCart = (state, payload) => {
    const items = state.items;
    let isProductExists;
    items.map((item) => {
        if (item._id === payload._id) {
            item.qty += payload.qty;
            isProductExists = true;
        } return item;
    })
    const newItems = isProductExists ? items : [...items, payload];//bien newitems chua mang moi neu isProductExists la true thi giu nguyen gia tri cua items neu la false thi tao mang moi 
    //bang cach them payload vao cuoi mang items
    localStorage.setItem("cart_items", JSON.stringify(newItems));
    return { ...state, items: newItems }//tra ve 1 state
}
const updateCart = (state, payload)=>{
    const items = state.items;
    const {_id, qty} = payload;

    const newCarts = items.map((item)=>{
        if(item._id === _id){
            item.qty = qty;
        }
        return item;
    });
    return {...state, items: newCarts}
}
// const deleteCart = (state, payload)=>{
//     const items = state.items;
//     const newCarts = items.filter((item)=>{
//         if(item._id === payload.id){
//             return false;
//         } 
//         return true;
//     });

//     return {...state, items: newCarts}
// }