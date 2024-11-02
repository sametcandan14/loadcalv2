type LoadPlanProps = {
  dimensions?: {
    boxWidth?: number;
    boxHeight?: number;
    boxLength?: number;
    contHeight: number;
    contWidth?: number;
    contLength?: number;
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

  let width = screen.width;
  let newWidth = (width * 80) / 100;

  console.log(props.dimensions?.contWidth);

  let newHeight =
    (newWidth / Number(props.dimensions?.contWidth)) *
    Number(props.dimensions?.contLength);

  console.log(newHeight);

  console.log(width);
  console.log(newWidth);

  return (
    <div className="load-plan">
      {props?.planValues === undefined && (
        <h3 className="text-center">Please enter values to calculate</h3>
      )}
      {props?.planValues?.totalQuantity &&
        props?.planValues?.totalQuantity > 0 && (
          <>
            <h1 className="text-center">
              Total Quantity: {props?.planValues?.totalQuantity}
            </h1>
            <div
              style={{
                margin: "auto",
                width: `${newWidth}px`,

                height: `${newHeight}px`,
                border: "1px solid",
              }}
            ></div>
          </>
        )}
    </div>
  );
};

export default LoadPlan;
