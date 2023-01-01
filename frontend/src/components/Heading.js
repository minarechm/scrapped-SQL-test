import { useState, useEffect } from "react"
export const Heading = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100); // between 300-200
    const toRotate = [ "Web Development", "Web Design"];


    useEffect(() => {
        const ticker = setInterval(() => {
            tick();
        }, delta); 

        return () => { clearInterval(ticker) }; 
    }, [text])

    const tick = () => {
        const i = loopNum % toRotate.length;
        const fullText = toRotate[i];
        const updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
        setText(updatedText);



        

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }
        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(1000);
        } else if (isDeleting && updatedText === '') { 
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(300 - Math.random() * 100);
        }
    }
    return (
        <>
        <div className={text === toRotate[1] ? "heading ma" : "heading"}><a href="#" className="contactButton">{text}</a></div>
        
        </>
    )
}