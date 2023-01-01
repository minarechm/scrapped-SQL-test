import { useState } from "react";
import { useDispatch} from "react-redux"
import { addPost } from "../redux/counter";

export const InputForm = () => {

    const dispatch = useDispatch()
    const [added,setAdded] = useState(false)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [image,setImage] = useState("")
    const [price,setPrice] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const input = {title, text, image, price}
        const response = await fetch("http://localhost:4000/posts", {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()
        if (response.ok) {
            setAdded(true)
            setTitle("")
            setText("")
            setImage("")
            setPrice("")
            dispatch(addPost(json))
        }
    }
    return (
        <form onSubmit={handleSubmit}>
        <h3>Add new</h3>

        <label>Title:</label>
        <input
            type="text"
            onChange={(e) => {
                setTitle(e.target.value)
            }}
            value={title}
        />

        <label>Text:</label>
        <input
            type="text"
            onChange={(e) => {
                setText(e.target.value)
            }}
            value={text}
        />

        <label>Image:</label>
        <input
            type="text"
            onChange={(e) => {
                setImage(e.target.value)
            }}
            value={image}
        />

        <label>Price:</label>
        <input
            type="number"
            onChange={(e) => {
                setPrice(e.target.value)
            }}
            value={price}
        />

        <button>Add</button>
        {added ? <p>Successfully added!</p> : ""}
    </form>
    )
}