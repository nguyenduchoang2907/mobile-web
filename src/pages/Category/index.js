import React from "react";
import { getCategory, getProductsCategory } from "../../services/Api";
import { useParams } from "react-router-dom";
import ProductItem from "../../shared/components/product-item";

const Category = () => {

    const params = useParams();
    const id = params.id;
    console.log(id);
    const [products, setProducts] = React.useState([]);
    const[productItem, setProducItem]=React.useState("");
    React.useEffect(() => {
        getProductsCategory(id, {}).then(({ data }) => setProducts(data.data.docs));
        getCategory(id,{}).then(({data})=>setProducItem(data.data));
    }, [id]);
        
        
    return (
        <>
            <div>
                {/*	List Product	*/}
                <div className="products">
                <h3>{`${productItem.name} (hiện có ${products.length} sản phẩm)`}</h3>
                    <div className="product-list card-deck">
                        {
                            products.map((item) =>
                                <ProductItem item={ item } />
                            )

                        }
                    </div>
                </div>
                {/*	End List Product	*/}
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
export default Category;