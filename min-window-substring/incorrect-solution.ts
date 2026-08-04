type Occurence = number[]

export function minWindow(s: string, t: string): string {
  let windowStart = 0;
  let windowEnd = 0;

  const charsOfT = [...t];
  const setOfCharsOfT = new Set(charsOfT);
  const newOccurence = () => Array.from({ length: charsOfT.length }).fill(0) as number[];
  let occurenceStruct: Occurence;

  let bestFindPosition = Infinity;
  let bestFindLength = Infinity;

  for (; windowStart <= s.length - t.length; windowStart++) {
    occurenceStruct = newOccurence();
    const enteringChar = s.substring(windowStart, windowStart + 1);
    if (!setOfCharsOfT.has(enteringChar)) {
      continue;
    }

    addOccurrence(occurenceStruct, enteringChar, t);

    const maxWindowEnd = Math.min(s.length, bestFindLength + windowStart);
    if (t.length === 1) {
      return t;
    }
    for (windowEnd = windowStart + 2; windowEnd <= maxWindowEnd; windowEnd++) {
      if (bestFindLength <= windowEnd - windowStart) {
        break;
      }
      const endEnteringChar = s.substring(windowEnd - 1, windowEnd);
      if (!setOfCharsOfT.has(endEnteringChar)) {
        continue;
      }
      addOccurrence(occurenceStruct, endEnteringChar, t)

      if (hasAll(occurenceStruct)) {
        const currentSubstrLength = (windowEnd - windowStart)
        if (bestFindLength > currentSubstrLength) {
          bestFindLength = currentSubstrLength;
          bestFindPosition = windowStart;
        }
      }
    }

    // Doesn't work because I'm recreating occurenceStruct at beggining of each loop
    // const leavingChar = s.substring(windowStart, windowStart + 1);
    // if (setOfCharsOfT.has(leavingChar)) {
    //   const indexOfChar = t.indexOf(leavingChar);
    //   occurenceStruct[indexOfChar]--;
    //   removeOccurence(occurenceStruct, leavingChar, t);
    //   console.log('leaving', leavingChar)
    // }
  }

  if (bestFindPosition === Infinity) {
    return "";
  }

  return s.substring(bestFindPosition, bestFindPosition + bestFindLength);
}

const hasAll = (arr: number[]) => {
  return arr.reduce((acc, item) => acc * item, 1) !== 0;
}

const addOccurrence = (arr: number[], char: string, t: string) => {
  let bestPosition = -1;
  let occAtPosition = Infinity;

  for (let i = 0; i < t.length; i++) {
    if (t[i] === char) {
      if (occAtPosition > arr[i]) {
        bestPosition = i;
        occAtPosition = arr[i];
      }
    }
  }

  if (bestPosition !== -1) {
    arr[bestPosition]++;
  }
}

// const removeOccurence = (arr: number[], char: string, t: string) => {
//   let bestPosition = -1;
//   let occAtPosition = -Infinity;

//   for (let i = 0; i < t.length; i++) {
//     if (t[i] === char) {
//       if (occAtPosition < arr[i]) {
//         bestPosition = i;
//         occAtPosition = arr[i];
//       }
//     }
//   }

//   if (bestPosition !== -1) {
//     arr[bestPosition]--;
//   }
// }