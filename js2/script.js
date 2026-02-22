"use strict";

const N = Number(window.prompt("自然数を入力"));

const score_array = [];
for (let n = 0; n < N; n++) {
  score_array.push(Number(window.prompt(`score${n}`)));
}

const judge = (score) => {
  if (score >= 80) {
    return "A";
  } else if (score >= 60) {
    return "B";
  } else if (score >= 40) {
    return "C";
  } else if (score >= 20) {
    return "D";
  } else {
    return "E";
  }
};

const assignGrades = (score_array) => {
  return score_array.map(judge);
};

console.log("input: ", score_array);
console.log("grade: ", assignGrades(score_array));
