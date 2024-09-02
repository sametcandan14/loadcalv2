import { Button, Col, Container, Form, Row } from "react-bootstrap";
import LoadPlan from "../../components/LoadPlan";
import { FormEvent, useState } from "react";

const Calculate = () => {
  type valuesT = {
    contWidth?: number | undefined;
    contLength?: number | undefined;
    contHeight?: number | undefined;
    boxWidth?: number | undefined;
    boxLength?: number | undefined;
    boxHeight?: number | undefined;
  };

  const [values, setValues] = useState<valuesT>();

  const handleChange = (e: FormEvent) => {
    setValues({
      ...values,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });

    console.log(values);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(values);
  };
  return (
    <div className="steel-gray-back ">
      <Container className="pt-5">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={6} className="mb-4">
              <h3 className="text-center">Container Dimensions</h3>
              <Form.Control
                name="contWidth"
                className="mb-2"
                type="number"
                placeholder="Container Width"
                required
                onChange={handleChange}
              />
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Container Length"
                name="contLength"
                required
                onChange={handleChange}
              />
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Container Height"
                name="contHeight"
                required
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={6}>
              <h3 className="text-center">Box Dimensions</h3>
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Box Width"
                name="boxWidth"
                required
                onChange={handleChange}
              />
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Box Length"
                name="boxLength"
                required
                onChange={handleChange}
              />
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Box Height"
                name="boxHeight"
                required
                onChange={handleChange}
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
