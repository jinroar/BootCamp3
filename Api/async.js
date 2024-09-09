/**
 * promises - resolved/reject
 *              check database, check conditions
 *  async - not instant
 *  await
 * 
 * */
//promises
const myFunction = async () => {
    const myPromise = new Promise((resolve, reject) => {
        const time = 59;
        setTimeout(()=>{
            if (time < 60) {
                resolve ({
                    message: "ok",
                })
            } else {
                reject({
                    message: "not ok",
                    error: `time (${time}) is greater than 60`,
                    timestamp: new Date(),
                })
            }
        }, 1000);
    });

    const promiseResults = await myPromise.catch((asdsadsad)=> {
        console.log("rejected", asdsadsad)
    });
    if (promiseResults) { 
        console.log("Here", promiseResults);
    }

}
myFunction()