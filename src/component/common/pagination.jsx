import React, { Component } from 'react';
import _ from "../../../node_modules/lodash"
import propTypes from 'prop-types'; 
const Pagination = props => {
    
    
    const {itemsCount,pageSize,currentPage,onPageChange}=props;
    const pagesCount=itemsCount / pageSize;
    //[1...pagesCount].map() for every Li 
    const pages =_.range(1,pagesCount+1);
    console.log(currentPage);
    if (Math.ceil(pagesCount )===1)return null;
    return (<div>

      <nav aria-label="Page navigation example m-4">
       <ul className="pagination">
        {pages.map(page=>(
          <li key={page} className={page===currentPage?"page-item active":"page-item"}>
            <a onClick={()=>onPageChange((page))} className="page-link">{page}</a> 
          </li>
        ))}

        </ul>
      </nav>
    </div>);
    
};

Pagination.propTypes={

  itemsCount:propTypes.number.isRequired
  ,pageSize:propTypes.number.isRequired
  ,currentPage:propTypes.number.isRequired
  ,onPageChange:propTypes.func.isRequired
};
 
export default Pagination;