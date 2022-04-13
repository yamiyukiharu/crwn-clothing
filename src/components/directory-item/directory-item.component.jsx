import { DirectoryContainer, BackgroundImage, Body } from "./directory-item.styles"

const CatergoryItem = ({category}) => {
    const {imageUrl, title} = category
    return (
        <DirectoryContainer>
        <BackgroundImage imageUrl={imageUrl}/>
        <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
        </Body>
        </DirectoryContainer>
    )
}

export default CatergoryItem