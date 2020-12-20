import React, {useState, useEffect} from 'react'
import soundFile from './sounds/beep.mp3'

function Body() {
    const [arr, setArr] = useState([])
    const [sortSteps, setSortSteps] = useState([])
    const [isSelected, setIsSelected] = useState("None")
    const [isReset, setIsReset] = useState(false)

    useEffect(() => {
        setArr(addElements())
    },[])

    useEffect(() => {
        const audioEl = document.getElementsByClassName("audio-element")[0]
        isSelected !== "None"?audioEl.play():console.log();
    },[arr,isSelected])

    useEffect(() => {
        sortSteps.map((ele,ind) => {
            return (
                setTimeout(() => {
                    setArr(ele)
                },500)
            )
        })
    },[sortSteps])
    
    useEffect(() => {
        isReset === true? window.location.reload(false): console.log();
    },[isReset])

    const addElements = () => {
        const temp = []
        for(let i=0; i<100; i++){
            temp.push(Math.ceil(Math.random() * 100))
        }
        return temp
    }

    const bubbleSort = () => {
        const temp = []
        for(let i=0;i<99;i++){
            for(let j=0;j<99-i;j++){
                if(arr[j]>arr[j+1]){
                    let swap = arr[j]
                    arr[j] = arr[j+1]
                    arr[j+1] = swap
                }
                temp.push(arr.slice())
            }
        }
        setArr(temp[0])
        return temp
    }

    const selectionSort = () => {
        const temp = []
        for (let i = 0; i < 99; i++) 
        { 
            let min_idx = i; 
            for (let j = i+1; j < 100; j++) 
                if (arr[j] < arr[min_idx]) 
                    min_idx = j;
                temp.push(arr.slice())
            let swap = arr[min_idx]; 
            arr[min_idx] = arr[i]; 
            arr[i] = swap;
            temp.push(arr.slice()) 
        } 
        setArr(temp[0])
        return temp
    }
    
    const insertionSort = () => {
        const temp = []
        for (let i = 1; i < 100; ++i) { 
            let key = arr[i] 
            let j = i - 1
            while (j >= 0 && arr[j] > key) { 
                arr[j + 1] = arr[j]; 
                j = j - 1;
                temp.push(arr.slice())
            } 
            arr[j + 1] = key;
            temp.push(arr.slice())
        }
        setArr(temp[0])
        return temp
    }

    const merge = (mergeTemp,l,m,r) =>
    {
        let n1 = m - l + 1
        let n2 = r - m

        let L = []
        let R = []

        for (let i = 0; i < n1; ++i)
            L.push(arr[l + i])
        for (let j = 0; j < n2; ++j)
            R.push(arr[m + 1 + j])

        let i = 0, j = 0, k = l
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            }
            else {
                arr[k] = R[j];
                j++;
            }
            k++;
            mergeTemp.push(arr.slice())
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
            mergeTemp.push(arr.slice())
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
            mergeTemp.push(arr.slice())
        }
    }
 
    const mergeSort = () => {
        const temp = []
        const mergeHelper = (l, r) =>
        {
            if (l < r) {
                let m = Math.floor((l + r) / 2)
                mergeHelper(l, m)
                mergeHelper(m + 1, r)
                merge(temp, l, m, r)
            }
        }
        mergeHelper(0,99)
        setArr(temp[0])
        return temp
    }

    const partition = (quickTemp, low, high) =>
    { 
        let pivot = arr[high]
        let i = (low-1)
        for (let j=low; j<high; j++) 
        {  
            if (arr[j] < pivot) 
            { 
                i++
                let temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
            quickTemp.push(arr.slice())
        }

        let temp = arr[i+1]
        arr[i+1] = arr[high]
        arr[high] = temp
        quickTemp.push(arr.slice())
  
        return i+1
    } 

    const quickSort = () => {
        const temp = []
        const quickHelper = (low,high) => {
            if (low < high) 
            { 
                let pi = partition(temp, low, high)
                quickHelper(low, pi-1); 
                quickHelper(pi+1, high); 
            } 
        }
        quickHelper(0,99)
        setArr(temp[0])
        return temp
    }

    const shellSort = () => 
    {
        const temp = []
        let n = 100
        for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) 
        {   
            for (let i = gap; i < n; i += 1) 
            { 
                let key = arr[i]
                let j         
                for (j = i; j >= gap && arr[j - gap] > key; j -= gap){
                    arr[j] = arr[j - gap]
                    temp.push(arr.slice())
                }
                arr[j] = key
                temp.push(arr.slice())
            } 
        }
        setArr(temp[0])
        return temp
    }

    const heapSort = () =>
    {
        console.log(arr)
        const heapTemp = []
        let n = 100
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--){
            heapify(heapTemp,n, i)
            heapTemp.push(arr.slice())
        }
 
        for (let i = n - 1; i > 0; i--) {
            let temp = arr[0]
            arr[0] = arr[i]
            arr[i] = temp
            heapTemp.push(arr.slice())
            heapify(heapTemp,i, 0);
            heapTemp.push(arr.slice())
        }
        heapTemp.push(arr.slice())
        console.log(arr)
        setArr(heapTemp[0])
        return heapTemp
    }
 
    const heapify = (heapTemp, n, i) => 
    {
        let largest = i
        let l = 2 * i + 1
        let r = 2 * i + 2
 
        if (l < n && arr[l] > arr[largest])
            largest = l

        if (r < n && arr[r] > arr[largest])
            largest = r

        if (largest !== i) {
            let swap = arr[i]
            arr[i] = arr[largest]
            arr[largest] = swap
            heapTemp.push(arr.slice())
            heapify(heapTemp, n, largest)
            heapTemp.push(arr.slice())
        }
    }

    return (
        <div className = "body">
            {
                isSelected !== "None"? 
                <div className = "reset-section">
                    <p>SORTING WITH {isSelected.toUpperCase()}</p>
                    <button onClick = {() => {setIsSelected("None"); setIsReset(true);}}>Reset</button>
                </div>:
                <div className = "button-container">
                    <div><button onClick = {() => {setSortSteps(bubbleSort()); setIsSelected("Bubble Sort")}}>BUBBLE SORT</button></div>
                    <div><button onClick = {() => {setSortSteps(selectionSort()); setIsSelected("Selection Sort")}}>SELECTION SORT</button></div>
                    <div><button onClick = {() => {setSortSteps(insertionSort()); setIsSelected("Insertion Sort")}}>INSERTION SORT</button></div>
                    <div><button onClick = {() => {setSortSteps(mergeSort()); setIsSelected("Merge Sort")}}>MERGE SORT</button></div>
                    <div><button onClick = {() => {setSortSteps(quickSort()); setIsSelected("Quick Sort")}}>QUICK SORT</button></div>
                    <div><button onClick = {() => {setSortSteps(heapSort()); setIsSelected("Heap Sort")}}>HEAP SORT</button></div>
                    <div><button onClick = {() => {setSortSteps(shellSort()); setIsSelected("Shell Sort")}}>SHELL SORT</button></div>
                </div>
            }
            <div className = "sort-container">
                <audio className="audio-element">
                    <source src={soundFile}></source>
                </audio>
                {
                    arr.map((ele, ind) => {
                        return (
                            <div  key = {ind} className = "bars" style = {{"height": String(ele*3.5) + "px", "width": "1vw"}}/>
                        )
                    })

                }
            </div>
        </div>
    )
}

export default Body
