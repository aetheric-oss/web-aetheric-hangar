export const sharesParent = (child1: string, child2: string): boolean => {
  let child1Arr = child1.split('/');
  let child2Arr = child2.split('/');
  if(child1Arr.length > 1) {
    child1Arr.pop();
  }
  if(child2Arr.length > 1) {
    child2Arr.pop();
  }
  return child1Arr.join() === child2Arr.join();
}
export const isParent = (child: string, parent: string): boolean => {
  return parent.includes(child);
}
