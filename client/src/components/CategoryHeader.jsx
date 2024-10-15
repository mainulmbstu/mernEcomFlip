import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CategoryHeader = () => {
      let { category, catPlain } = useAuth();


 let getCategoryList = (category) => {
   let myCategories = [];
   if (category.length) {
     for (let v of category) {
       myCategories.push(
         <li key={v.slug}>
           {v.parentId ? (
             <Link to={`/products/category/${v.slug}`}>{v.name}</Link>
           ) : (
             <span>{v.name} </span>
           )}
           {v.children.length > 0 ? (
             <ul>{getCategoryList(v.children)} </ul>
           ) : null}
         </li>
       );
     }
   }
   return myCategories;
 };
  


  return (
    <div className="catPage">
      <ul>{getCategoryList(category)}</ul>
    </div>
  );
}

export default CategoryHeader