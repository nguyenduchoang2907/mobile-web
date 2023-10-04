import React, { useEffect } from "react";
import { getProduct, getCommentsProduct, createCommentProduct } from "../../services/Api";
import moment from "moment";
import { getImageProduct } from "../../shared/ultils";
import { useParams,useNavigate, Navigate } from "react-router-dom";
import { ADD_TO_CART } from "../../shared/constants/action-type";
import { useDispatch } from "react-redux";


const ProductDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const dispatch=useDispatch();
    const addToCart=(type)=>{
        const {name,image,price}=product;
        dispatch({
            type:ADD_TO_CART,
            payload:{
                _id:id,
                name,
                image,
                price,
                qty:1,
            },
        });
        if(type==="buy-now"){
            return navigate("/Cart")
        }
    }
    const [product, setProduct] = React.useState({});//khoi tao bien product luu thong tin san pham {} tra ve doi tuong rong
    const [comments, setComments] = React.useState([]);//khoi bien tao comment [] chi mang rong
    const [data, setData] = React.useState({});
    
    const getComments = (id)=>{
        getCommentsProduct(id, {}).then(({ data }) => {
            return setComments(data.data.docs);
        });
    }//lay comment va in ra
    React.useEffect(() => {
        // Get Product
        getProduct(id, {}).then(({ data }) => {
            return setProduct(data.data);
        });
        // Get Comments
        getComments(id);
    }, [id]);

    const onChangeInput = (e)=>{
        const {name, value} = e.target;
         setData({...data, [name]: value});
         console.log(data);


    }//ham nhap cmt

    const onSubmitComment = (e)=>{
        e.preventDefault();//khi gui submit se ko reload ca trang
        createCommentProduct(id, data, {}).then(({data})=>{
            if(data.status=="success") setData("");
            getComments(id);
        
        });
    }

    return (
        <>
            <div>
                {/*	List Product	*/}
                <div id="product">
                    <div id="product-head" className="row">
                        <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                            <img src={getImageProduct(product?.image)} />
                        </div>
                        <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                            <h1>{product?.name}</h1>
                            <ul>
                                <li><span>Bảo hành:</span> {product?.warranty}</li>
                                <li><span>Đi kèm:</span> {product?.accessoories}</li>
                                <li><span>Tình trạng:</span> {product?.status}</li>
                                <li><span>Khuyến Mại:</span> {product?.promotion}</li>
                                <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                                <li id="price-number">{product?.price}đ</li>
                                {
                                    product?.is_stock
                                        ? <li id="status">Còn hàng</li>
                                        : <li className="text-danger" id="status">Hết hàng</li>

                                }

                            </ul>
                            <div id="add-cart">
	<button onClick={()=>addToCart("buy-now")} className="btn btn-warning mr-2">
		Mua ngay
	</button>

	<button onClick={addToCart} className="btn btn-info">
		Thêm vào giỏ hàng
	</button>
</div>

                        </div>
                    </div>
                    <div id="product-body" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3>Đánh giá về {product?.name}</h3>
                            {product?.details}
                        </div>
                    </div>
                    {/*	Comment	*/}
                    <div id="comment" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3>Bình luận sản phẩm</h3>
                            <form method="post">
                                <div className="form-group">
                                    <label>Tên:</label>
                                    <input 
                                        onChange={onChangeInput}
                                        name="name" 
                                        required type="text" 
                                        className="form-control"
                                        value={data.name || ""} />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input 
                                        onChange={onChangeInput}
                                        name="email" 
                                        required type="email" 
                                        className="form-control" id="pwd"
                                        value={data.email || ""} />
                                </div>
                                <div className="form-group">
                                    <label>Nội dung:</label>
                                    <textarea 
                                        onChange={onChangeInput}
                                        name="content" 
                                        required rows={8} 
                                        className="form-control"
                                        value={data.content || ""} />
                                </div>
                                <button onClick={onSubmitComment} type="submit" name="sbm" className="btn btn-primary">Gửi</button>
                            </form>
                        </div>
                    </div>
                    {/*	End Comment	*/}
                    {/*	Comments List	*/}
                    <div id="comments-list" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            {comments.map((cmt) =>{ 
                                
                                return (
                                <div className="comment-item">
                                    <ul>
                                        <li><b>{cmt.name}</b></li>
                                        <li>{moment(cmt.updatedAt).fromNow()}</li>
                                        <li>
                                            <p>{cmt.content}</p>
                                        </li>
                                    </ul>
                                </div>
                            )})

                            }
                        </div>
                    </div>
                    {/*	End Comments List	*/}
                </div>
                {/*	End Product	*/}
                <div id="pagination">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
                    </ul>
                </div>
            </div>

        </>
    )
}
export default ProductDetails;