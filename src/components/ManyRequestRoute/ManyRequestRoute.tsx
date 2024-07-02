import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import styles from './ManyRequestRoute.module.scss';

interface ManyRequestRouteProps {}

const ManyRequestRoute: FC<ManyRequestRouteProps> = () => {

  const [numRequests, setNumRequests] = useState(0);
  const [highMemoryArray, setHighMemoryArray] = useState<any[]>([]);
  const [memoryUsage, setMemoryUsage] = useState("");
  const [numBurgers, setNumBurgers] = useState(0);
  const url = "https://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=5";

  const getPromiseArray = () => {
    let array = [];
    for(let i = 0; i<100;i++){
      array.push(new Promise(() => {
        return axios.get(url)
      }));
    }
    return array;
  }

  const allocateHighMemory = () => {
    let newArray = new Array(1000000).fill('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    setHighMemoryArray([...highMemoryArray, newArray]);
  }

  useEffect(() => {
    // setTimeout(() => {
    //   let promises = getPromiseArray();
    //   Promise.all(promises);
    //   setNumRequests(numRequests + 100);
    //   //@ts-ignore
    //   setMemoryUsage(window.performance.memory.totalJSHeapSize);
    // }, 1000)

    setTimeout(() => {
      // setNumBurgers(numBurgers + 100);
      allocateHighMemory();
      //@ts-ignore
      setMemoryUsage(window.performance.memory.totalJSHeapSize);
    }, 25)
  })


  return <div className={styles.ManyRequestRoute}>
    {/* Number of requests: {numRequests} */}
    Memory usage: {parseInt(memoryUsage) / 1000000}MB
    <br/>
    Array length: {highMemoryArray.length};

    {Array(numBurgers).fill(null).map(() => {
      return <img src="/burg.png"/>;
    })}
  </div>
};

export default ManyRequestRoute;
