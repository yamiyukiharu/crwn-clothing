import { Link } from "react-router-dom"
import { DirectoryContainer, BackgroundImage, Body } from "./directory-item.styles"

const CatergoryItem = ({category}) => {
    const {imageUrl, title} = category
    return (
        <DirectoryContainer>
        <BackgroundImage imageUrl={imageUrl}/>
        <Body>
        <h2>{title}</h2>
        <Link to={`shop/${title}`}>Shop Now</Link>
        </Body>
        </DirectoryContainer>
    )
}

export default CatergoryItem