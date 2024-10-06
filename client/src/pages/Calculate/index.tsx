import { Button, Col, Container, Form, Row } from "react-bootstrap";
import LoadPlan from "../../components/LoadPlan";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CalFunc } from "../../utils/CalFunc";

const Calculate = () => {
  type dimensionsT = {
    contWidth?: number;
    contLength?: number;
    contHeight?: number;
    boxWidth?: number;
    boxLength?: number;
    boxHeight?: number;
  };

  type planValuesT = {
    inWidth: number;
    longit: number;
    lengthwise1: number;
    lengthwise2: number;
    boxStack: number;
    totalQuantity: number;
    spaceWidth: number;
    lengthwise3: number;
    widthwise3: number;
    additionalQty: number;
  };

  const [dimensions, setDimensions] = useState<dimensionsT>();
  const [planValues, setPlanValues] = useState<planValuesT>();

  const handleChange = (e: FormEvent) => {
    setDimensions({
      ...dimensions,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      dimensions?.boxHeight &&
      dimensions.boxLength &&
      dimensions.boxWidth &&
      dimensions.contHeight &&
      dimensions.contLength &&
      dimensions.contWidth
    ) {
      if (Number(dimensions.contWidth) > Number(dimensions.contLength)) {
        toast.warn("Container Width must be smaller than Container Length");
        return;
      }

      if (Number(dimensions.boxWidth) > Number(dimensions.boxLength)) {
        toast.warn("Box Width must be smaller than Box Length");
        return;
      }

      const boxW = dimensions.boxWidth;
      const boxL = dimensions.boxLength;
      const boxH = dimensions.boxHeight;
      const contW = dimensions.contWidth;
      const contL = dimensions.contLength;
      const contH = dimensions.contHeight;

      const checkedValues = {
        boxW,
        boxL,
        boxH,
        contW,
        contL,
        contH,
      };

      const calculatedValues = CalFunc(checkedValues);
      setPlanValues(calculatedValues);
      console.log("plan values", planValues);
    }
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
        <ToastContainer />
      </Container>
      <LoadPlan dimensions={dimensions} planValues={planValues} />
    </div>
  );
};

export default Calculate;
