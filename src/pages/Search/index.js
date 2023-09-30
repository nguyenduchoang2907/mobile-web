import React from "react";
import { useSearchParams } from "react-router-dom";
import { getProduct, getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
import Pagination from "../../shared/components/Pagination";
const Search = () => {

    const [products, setProducts] = React.useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const page =searchParams.get("page") || 1;
    const[pages,setPages]=React.useState({
        limit:12,
    });

    React.useEffect(     ()=>{
       getProducts({
        params:{
            name:keyword,
            limit:12,
            page:page,
        }
       }).then(({data})=>{
        setPages({...pages,...data.data.pages});
        setProducts(data.data.docs);

    
    });
    },[keyword,pages]
    );

    return (
        <>
            <div>
                {/*	List Product	*/}
                <div className="products">
                    <div id="search-result">Kết quả tìm kiếm với sản phẩm <span>{keyword}</span></div>
                    <div className="product-list card-deck">
                       {
                        products.map((item=>
                            <ProductItem item={item}/>
                            ))
                       }
                    </div>
                </div>
                {/*	End List Product	*/}
                <div id="pagination">
                  <Pagination pages={pages}/>
                </div>
            </div>

        </>
    )
}
export default Search;