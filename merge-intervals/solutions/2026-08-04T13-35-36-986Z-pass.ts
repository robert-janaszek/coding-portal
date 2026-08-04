export function mergeIntervals(intervals: number[][]): number[][] {
  intervals.sort((int1, int2) => {
    const [int1Start, int1End] = int1;
    const [int2Start, int2End] = int2;

    if (int1Start === int2Start) {
      return int1End - int2End;
    }

    return int1Start - int2Start;
  });

  const mergedIntervals: [number, number][] = []
  for (const i of intervals) {
    const interval = i as [number, number];
    const [start, end] = interval;
    if (mergedIntervals.length === 0) {
      mergedIntervals.push(interval);
      continue;
    }

    const lastMerged = mergedIntervals[mergedIntervals.length - 1];
    const [_lastStart, lastEnd] = lastMerged;

    if (start <= lastEnd) {
      if (end > lastEnd) {
        lastMerged[1] = end;
      }
      continue;
    }

    mergedIntervals.push(interval);
  }

  return mergedIntervals;
}