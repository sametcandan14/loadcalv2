type CalFuncProps = {
  boxW: number;
  boxH: number;
  boxL: number;
  contH: number;
  contW: number;
  contL: number;
};

export const CalFunc = (props: CalFuncProps) => {
  const { boxW, boxH, boxL, contH, contW, contL } = props;

  const boxStack = Math.floor(contH / boxH);

  const widthwise1 = Math.floor(contW / boxW);
  const widthwise2 = Math.floor(contW / boxL);
  const lengthwise1 = Math.floor(contL / boxW);
  const lengthwise2 = Math.floor(contL / boxL);

  var inWidth: number = 0;
  var longit: number = 0;
  var max: number = 0;

  //         // Muhammet Soytürk -->>

  for (let i = 0; i <= widthwise1; i++) {
    for (let j = 0; j <= widthwise2; j++) {
      if (boxW * i + boxL * j <= contW) {
        if (boxW * i + boxL * j >= max) {
          max = boxW * i + boxL * j;
          inWidth = i;
          longit = j;
        }
      }
    }
  }
  // Muhammet Soytürk <<--

  //         TotalQty = suq * (n * y4 + m * y3);

  //         EndSpace1 = cl - y4 * bl;

  //         EndSpace2 = cl - y3 * bw;

  const endSpace = contL - lengthwise2 * boxL;

  var totalQuantity = 0;
  var spaceWidth = 0;
  var lengthwise3 = 0;
  var widthwise3 = 0;
  var additionalQty = 0;

  if (endSpace > boxW) {
    spaceWidth = contW - longit * boxL;
    lengthwise3 = Math.floor(endSpace / boxW);
    widthwise3 = Math.floor(spaceWidth / boxL);
    additionalQty = lengthwise3 * widthwise3 * boxStack;

    totalQuantity =
      boxStack * (inWidth * lengthwise2 + longit * lengthwise1) + additionalQty;
  } else {
    totalQuantity = boxStack * (inWidth * lengthwise2 + longit * lengthwise1);
  }

  return {
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
  };
};
