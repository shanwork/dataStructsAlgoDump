class Sorter {
  constructor(unsortedArray) {
     this.rawArray = JSON.parse(JSON.stringify(unsortedArray));
  }   
  testOutput(testArray) {
      const ulDemo = document.createElement('ul');
      testArray.forEach(element => {
          const liDemo = document.createElement('li');
          liDemo.textContent = element ;
          ulDemo.appendChild(liDemo);
      });
      return ulDemo;
  }
  radixSort(rdSortArr) {
    let maxIterations = 1;
    let buckets = Array.from({length:10}, () => []) ; // [[],[], [], [], [], [], [], [], [], []];
    rdSortArr.forEach( rdEl => {
      const currentLength = rdEl === 0 ? 1 : Math.floor(Math.log10(Math.abs(rdEl))) + 1;
      if (maxIterations < currentLength) {
        maxIterations = currentLength;
      }
    });
    for (let i = 0; i < maxIterations ; i += 1){
      rdSortArr.forEach(rdIterated => {
        const getDigit = Math.floor((Math.abs(rdIterated) / Math.pow(10, i))) % 10;
        // console.log(`Number: ${rdIterated}, digit: ${i}, bucket ${getDigit}`);
        buckets[getDigit].push(rdIterated);
      });
      rdSortArr = [] ;
      buckets.forEach(bucket => {
       while (bucket.length > 0) {
        rdSortArr.push(bucket.shift());
       }
      });
      rdSortArr.push(100000) ;
    }
    return rdSortArr ; //  arr ; // mSortList;
   }
}