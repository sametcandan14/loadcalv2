type LoadPlanProps1 = {
  boxW: number;
  boxH: number;
  boxL: number;
  contH: number;
  contW: number;
  contL: number;
};

type LoadPlanProps2 = {
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

const LoadPlan = (props1: LoadPlanProps1, props2: LoadPlanProps2) => {
  const { boxW, boxH, boxL, contH, contW, contL } = props1;
  const {
    inWidth,
    longit,
    lengthwise1,
    lengthwise2,
    boxStack,
    totalQuantity,
    spaceWidth,
    lengthwise3,
    widthwise3,
    additionalQty,
  } = props2;
  return (
    <div>
      {totalQuantity > 0 && (
        <h1 className="text-center">Total Quantity: {totalQuantity}</h1>
      )}
    </div>
  );
};

export default LoadPlan;
