import './category-menu.styles.scss'
import CatergoryItem from '../category-item/category-item.component'

const CategoryMenu = ({categories}) => {
    return (
        <div className="categories-container"> 
        {categories.map((category) => {
        return (
            <CatergoryItem key={category.id} category={category}/>
        )
        })}
        </div>
    )

}

export default CategoryMenu