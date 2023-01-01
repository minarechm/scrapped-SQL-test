import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { CarouselWrap } from './components/CarouselWrap';
import { List } from "./components/List"
import { InputForm } from './components/InputForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ThreeJsSection } from './components/ThreeJsSection';
import { Heading } from "./components/Heading"
import { Contact } from "./components/Contact"
import { Email } from "./components/Email"

function App() {
  return (
    <>
    <div className="headingWrap">
      <Heading/>
      <ThreeJsSection/>
    </div>
    <Container>
      <Row className="justify-content-md-center mb-3">
        <Col>
          <CarouselWrap/>
          <List/>
          <InputForm/>
          
        </Col>
      </Row>
    </Container>
    <Container fluid className="contactSectionWrap">
      <Row className="justify-content-center mt-5 mb-5">
        <Col className="d-flex justify-content-md-end justify-content-sm-center mt-5 mb-5" md="6" sm="10">
          <Contact/>
        </Col>
        <Col className="d-flex justify-content-md-start justify-content-sm-center mt-5 mb-5" md="6" sm="10">
          <Email/>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col className="d-flex justify-content-center">
          
        </Col>
      </Row>
    </Container>

    </>
  )
}

export default App;
