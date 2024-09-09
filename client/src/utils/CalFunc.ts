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

  var m: number = 0;
  var n: number = 0;
  var max: number = 0;

  for (let i = 0; i <= widthwise1; i++) {
    for (let j = 0; j <= widthwise2; j++) {
      if (boxW * i + boxL * j <= contW) {
        if (boxW * i + boxL * j >= max) {
          max = boxW * i + boxL * j;
          m = i;
          n = j;
        }
      }
    }
  }

  console.log(m, n);

  //         // Muhammet Soytürk -->>
  //         var n = 0;
  //         var m = 0;
  //         var max = 0;
  //         for (var i = 0; i < dizi1.length; i++) {
  //           for (var j = 0; j < dizi2.length; j++) {
  //             if (bw * dizi1[i] + bl * dizi2[j] <= cw) {
  //               if (bw * dizi1[i] + bl * dizi2[j] >= max) {
  //                 max = bw * dizi1[i] + bl * dizi2[j];
  //                 n = dizi1[i];
  //                 m = dizi2[j];
  //               }
  //             }
  //           }
  //         }
  //         // Muhammet Soytürk <<--
};

// suq = Math.floor(ch / bh);

//         y1 = Math.floor(cw / bw);

//         y2 = Math.floor(cw / bl);

//         y3 = Math.floor(cl / bw);

//         y4 = Math.floor(cl / bl);

//         var dizi1 = new Array();

//         var dizi2 = new Array();

//         for (var a = 0; a <= y1; a++) dizi1.push(a);

//         for (var b = 0; b <= y2; b++) dizi2.push(b);

//         // Muhammet Soytürk -->>
//         var n = 0;
//         var m = 0;
//         var max = 0;
//         for (var i = 0; i < dizi1.length; i++) {
//           for (var j = 0; j < dizi2.length; j++) {
//             if (bw * dizi1[i] + bl * dizi2[j] <= cw) {
//               if (bw * dizi1[i] + bl * dizi2[j] >= max) {
//                 max = bw * dizi1[i] + bl * dizi2[j];
//                 n = dizi1[i];
//                 m = dizi2[j];
//               }
//             }
//           }
//         }
//         // Muhammet Soytürk <<--

//         TotalQty = suq * (n * y4 + m * y3);

//         SideSpace = cw - (n * bw + m * bl);

//         EndSpace1 = cl - y4 * bl;

//         EndSpace2 = cl - y3 * bw;

//         TopSpace = ch - suq * bh;
