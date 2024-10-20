type LoadPlanProps = {
  dimensions?: {
    boxW?: number;
    boxH?: number;
    boxL?: number;
    contH?: number;
    contW?: number;
    contL?: number;
  };
  planValues?: {
    inWidth?: number;
    longit?: number;
    lengthwise1?: number;
    lengthwise2?: number;
    boxStack?: number;
    totalQuantity?: number;
    spaceWidth?: number;
    lengthwise3?: number;
    widthwise3?: number;
    additionalQty?: number;
  };
};

const LoadPlan = (props: LoadPlanProps) => {
  console.log("props", props);

  console.log("totalQuantity", props?.planValues?.totalQuantity);

  return (
    <div>
      {props?.planValues?.totalQuantity &&
        props?.planValues?.totalQuantity > 0 && (
          <h1 className="text-center">
            Total Quantity: {props?.planValues?.totalQuantity}
          </h1>
        )}
    </div>
  );
};

export default LoadPlan;
