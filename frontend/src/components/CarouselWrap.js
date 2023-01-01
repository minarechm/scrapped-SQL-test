import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect } from "react"
import { CarouselItem } from "./CarouselItem"
import { setPosts } from "../redux/counter"
import { useSelector, useDispatch} from "react-redux"

export const CarouselWrap = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.counter)  
  console.log(JSON.stringify(posts))

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:4000/posts", {
                method: "GET"
            })
            const json = await response.json()
            if (response.ok) {          
              dispatch(setPosts(json))
              
            }
    }
    fetchPosts()
  }, [dispatch])

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
      <>
        {/*<Carousel swipeable={false}
            draggable={true}
            //showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            //autoPlay={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="carousel-container"
            //removeArrowOnDeviceType={["tablet", "mobile"]}
            //deviceType={this.props.deviceType}
            //dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px">*/}
            {posts && posts.map((post) => (
              <CarouselItem post={post} key={post.id}/>
            ))}
        {/*</Carousel>*/}
      </>
    )
}