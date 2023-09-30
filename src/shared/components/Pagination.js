import { useLocation, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";


const Pagination=({pages})=>{
    const {total, limit, currentPage, hasNext, hasPrev, next, prev} = pages;
    const{pathname,search}=useLocation();
    const [searchParams,setSearchParams]=useSearchParams();
    const totalPages=Math.ceil(total/limit);

    const formatUrl=(page)=>{
        return`${pathname}?keyword=${searchParams.get("keyword")}&page=${page}`;

    }
    const renderPagesHTML=(delta=2)=>{
        let pagesHtml=[];
        const left=currentPage-delta;
        const right=currentPage+delta;
        for(let i=1;i<=totalPages;i++){
            if(
                i===1||
                i===totalPages||
                i===currentPage||
                (i>=left && i<=right)
            ){
                pagesHtml.push(i);
            }
            else if(
                currentPage-delta===i+1||
               currentPage+delta===i-1

                ){
                    pagesHtml.push("...");
     
                }
        }

        return pagesHtml;
    }

    return(
        <ul className="pagination">
            {
                hasPrev
                ?        <li className="page-item"><Link className="page-link" to={formatUrl(prev)}>Trang trước</Link></li>
                :null


            }

        {

    renderPagesHTML().map((value)=>
    <li className={`page-item ${value===currentPage && 'active'}`}>
      
{
                                value === "..."
                                ? <span className="page-link">
                                    {value}
                                </span>
                                : <Link className="page-link" to={formatUrl(value)}>{value}</Link>                            
                            }
        </li>

)
        }
   

   {
    hasNext
    ?<li className="page-item"><Link className="page-link" to={formatUrl(next)}>Trang sau</Link></li>
    :null
   }
        
    </ul>
    )
}
export default Pagination;