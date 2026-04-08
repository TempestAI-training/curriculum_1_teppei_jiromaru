const N = Number(window.prompt("自然数を入力してください"));

/* 1からNまでの「偶数の和」(evenSum) と 
  「奇数の和」(oddSum) を計算します。 */
let evenSum = 0;
let oddSum = 0;

/* ループを作成し、順番iが偶数なら(i%2 === 0　)ならevenSumにiを加えるなどします。 */
for (let i = 0; i <= N; i++) {
  if (i % 2 === 0) {
    evenSum += i;
  } else {
    oddSum += i;
  }
}

/* ２つの差分を表示
  evenSumとoddSumの差分の絶対値を出力します。絶対値はMath.abs()を使います。
  出力にはdocument.write()を使いましょう。
*/
let diff = 0;
diff = Math.abs(evenSum - oddSum);
// document.write(String(diff));
// document.writeは非推奨っぽいので使うのをやめました
const element = document.createElement("p");
element.textContent = diff;
document.body.appendChild(element);
