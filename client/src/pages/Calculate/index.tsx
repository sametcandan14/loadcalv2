import { Button, Col, Container, Form, Row } from "react-bootstrap";
import LoadPlan from "../../components/LoadPlan";

const Calculate = () => {
  return (
    <div className="steel-gray-back ">
      <Container className="pt-5">
        <Form>
          <Row>
            <Col xs={12} md={6} className="mb-4">
              <h3 className="text-center">Container Dimensions</h3>
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Container Width"
                required
              />
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Container Length"
                required
              />
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Container Height"
                required
              />
            </Col>
            <Col xs={12} md={6}>
              <h3 className="text-center">Box Dimensions</h3>
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Box Width"
                required
              />
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Box Length"
                required
              />
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Box Height"
                required
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-center align-items-center my-3">
            <Button type="submit" className="cargo-green-btn " color="black">
              Calculate
            </Button>
          </div>
        </Form>
      </Container>
      <LoadPlan />
    </div>
  );
};

export default Calculate;
