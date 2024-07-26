/**
 *
 * @param {number[]} nums
 * @returns
 */
function permute(nums) {
  let result = [];
  /**
   *
   * @param {number[]} subArr
   * @param {number[]} remains
   * @returns
   */
  function backtrack(subArr, remains) {
    if (remains.length === 0) {
      result.push([...subArr]);
      return;
    }

    for (let i = 0; i < remains.length; i++) {
      subArr.push(remains[i]);
      backtrack(subArr, remains.slice(0, i).concat(remains.slice(i + 1)));
      subArr.pop();
    }
  }

  backtrack([], nums);
  return result;
}

console.log(permute([1, 2, 3]));
