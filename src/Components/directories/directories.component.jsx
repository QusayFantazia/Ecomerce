import "./directories.styles.scss"
import Directory from "../Directory/Directory";

const directories = 
[
  {
    "id": 1,
    "title": "hats",
    "imageUrl": "https://i.ibb.co/cvpntL1/hats.png",
    "routeName": "/shop/hats"
  },
  {
    "id": 2,
    "title": "jackets",
    "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png",
    "routeName": "/shop/jackets"
  },
  {
    "id": 3,
    "title": "sneakers",
    "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png",
    "routeName": "/shop/sneakers"
  },
  {
    "id": 4,
    "title": "womens",
    "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png",
    "routeName" : "/shop/womens"
  },
  {
    "id": 5,
    "title": "mens",
    "imageUrl": "https://i.ibb.co/R70vBrQ/men.png",
    "routeName": "/shop/mens"
  }
]

const Directories = () =>{
    return(
    <div className="directories-container">
    {directories.map(category =>
        <Directory key={category.id} category={category}></Directory>
        )}
    </div>

    )

}
export default Directories;