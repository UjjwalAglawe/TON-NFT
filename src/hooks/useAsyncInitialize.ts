// import { useEffect, useState } from "react";
// //to initialize the contract
// export function useAsyncInitialize<T>(func: ()=> Promise<T>, deps: any[] = []) {
//     const [state, setState] = useState<T | undefined>();
//     useEffect(()=>{
//         (async ()=> {
//             setState(await func())
//         })()
//     }, deps)

//     return state
// }

import { useEffect, useState } from "react";

export function useAsyncInitialize<T>(func: () => Promise<T>, deps: any[] = []) {
    const [state, setState] = useState<T | undefined>();

    useEffect(() => {
        (async () => {
            setState(await func());
        })();
    }, deps);

    return state;
}
