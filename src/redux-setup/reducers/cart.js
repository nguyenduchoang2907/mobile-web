import { ADD_TO_CART } from "../../shared/constants/action-type";

const initState={
    items:[],
}
export default (state=initState,action)=>{
switch(action.type){
    case  ADD_TO_CART: return addToCart(state,action.payload);//payload chua thong tin gio hang vua cap nhat
    default: return state;
}
}
const addToCart=(state,payload)=>{
    const items = state.items;
    let isProductExists;
    items.map((item)=>{
        if(item._id=payload._id){
            item.qty+=payload.qty;
            isProductExists=true;
        }return item;
    })
const newItems=isProductExists? items:[...items,payload];//bien newitems chua mang moi neu isProductExists la true thi giu nguyen gia tri cua items neu la false thi tao mang moi 
//bang cach them payload vao cuoi mang items
localStorage.setItem("cart_items",JSON.stringify(newItems));
return{...state,items:newItems}//tra ve 1 state
}