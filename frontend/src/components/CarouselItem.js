import { setPosts,deletePost } from "../redux/counter"
import { useDispatch} from "react-redux"

export const CarouselItem = ({post}) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        const deleteItem = async () => {
            const response = await fetch("http://localhost:4000/posts/" + post.id, {
                method: "POST",
                //body: JSON.stringify(post.id),
            })
            const json = await response.json()
            if (response.ok) {          
              dispatch(deletePost(post.id))
            }
        }
        deleteItem()
    }
    return (    
        <div className="carouselItem">
            <h1>{post.title}, ID - {post.id}</h1>
            <img className="carouselImg" src={post.image} alt="img" />
            <p>{post.text}</p>
            <p>{post.price}  €</p>   
            <p onClick={handleClick}>DELETE</p>
        </div>
    )
}