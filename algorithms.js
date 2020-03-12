const LinkedList = require('./LinkedList')

function swap(array, i, j) {
  const tmp = array[i]
  array[i] = array[j]
  array[j] = tmp
}

function bubbleSort(array) {
  let swaps = 0
  for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
          swap(array, i, i + 1)
          swaps++
      }
  }

  if (swaps > 0) {
      return bubbleSort(array)
  }
  return array
}

function mergeSort(array) {
  if (array.length <= 1) {
      return array
  }

  const middle = Math.floor(array.length / 2)
  let left = array.slice(0, middle)
  let right = array.slice(middle, array.length)

  left = mergeSort(left)
  right = mergeSort(right)
  return merge(left, right, array)
}

function merge(left, right, array) {
  let leftIndex = 0
  let rightIndex = 0
  let outputIndex = 0
  while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
          array[outputIndex++] = left[leftIndex++]
      }
      else {
          array[outputIndex++] = right[rightIndex++]
      }
  }

  for (let i = leftIndex; i < left.length; i++) {
      array[outputIndex++] = left[i]
  }

  for (let i = rightIndex; i < right.length; i++) {
      array[outputIndex++] = right[i]
  }
  return array
}

function quickSort(array, start = 0, end = array.length) {
  if (start >= end) {
      return array
  }
  const middle = partition(array, start, end)
  array = quickSort(array, start, middle)
  array = quickSort(array, middle + 1, end)
  return array
}

function partition(array, start, end) {
  const pivot = array[end - 1]
  let j = start
  for (let i = start; i < end - 1; i++) {
      if (array[i] <= pivot) {
          swap(array, i, j)
          j++
      }
  }
  swap(array, end-1, j)
  return j
}

function slice(list, beg, end){
  let navi = new LinkedList()
  let temp = list.head
  for(let i = 0; i < beg; i++) {
    temp = temp.next
  }
  for(let i = beg; i < end; i++) {
    navi.insertLast(temp)
    temp = temp.next
  }
  return navi
}

function mergeSortList(list) {
  if (list.length() <= 1) {
      return list
  }

  const middle = Math.floor(list.length() / 2)
  let left = slice(list, 0, middle)
  let right = slice(list, middle, list.length())

  left = mergeSortList(left)
  right = mergeSortList(right)
  return mergeList(left, right, list)
}

function mergeList(left, right, list) {
  let leftIndex = left.head
  let rightIndex = right.head
  let counter = 0

  while(leftIndex !== null && rightIndex !== null){
    if(leftIndex < rightIndex) {
      list.insertAt(leftIndex, counter++)
      leftIndex = leftIndex.next
    }
    else{
      list.insertAt(rightIndex, counter++)
      rightIndex = rightIndex.next
    }
  }

  while(leftIndex !== null) {
    list.insertAt(leftIndex, counter++)
    leftIndex = leftIndex.next
  }

  while(rightIndex !== null) {
    list.insertAt(rightIndex, counter++)
    rightIndex = rightIndex.next
  }

  return list
}


module.exports = {
  mergeSort,
  bubbleSort,
  quickSort,
  mergeSortList
}