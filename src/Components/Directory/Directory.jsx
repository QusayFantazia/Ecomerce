import{DirectoryContaier, BackGroundImage, DirectoryBodyContainer} from "./Directory.styles"
import { useNavigate } from "react-router-dom"
const Directory = (props) => {

    const {imageUrl, title, routeName} = props.category
    const navigate = useNavigate(routeName)
    const HandleNaviage = () => navigate(routeName)


   return(
    <DirectoryContaier onClick={HandleNaviage}>
        <BackGroundImage imageUrl= {imageUrl}/>
        <DirectoryBodyContainer>
            <h2>{title}</h2>
            <p>SHOP NOW</p>
        </DirectoryBodyContainer>
    </DirectoryContaier>
   )

}
export default Directory;