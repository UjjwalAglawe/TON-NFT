import { useState, useEffect } from 'react'
import Cards from './Cards';

interface Item {
  ipfs_pin_hash: string;
}

interface dataItem {
  count: number;
  rows: [];
}

const Home = () => {

  useEffect(() => {
    document.title = "Home"
  }, []);

  // const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Item[]>([])
  // const [data, setData] = useState<Dataval | null>(null)
  
    const loadMarketplaceItems = async () => {


      const uri: string = "https://api.pinata.cloud/data/pinList";

      // Define headers
      const header: HeadersInit = {
        "Content-Type": "application/json",
        pinata_api_key: `f655347379957f34ac93`,
        pinata_secret_api_key: `9c617c9f5adfe78b43d43e60e03d2074dcd69e0669ad0b89dd8dc1e061fd52ca`,
      };

      fetch(uri, {
        method: "GET",
        headers: header,
      })
        .then((response: Response) => {
          if (response.ok) {
            // Parse the JSON response
            console.log(response.json);
            
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((files: dataItem) => {
          setItems(files.rows);
          console.log(files);
        })
        .catch((error: Error) => {
          console.error("Error:", error);
        });
    };
    useEffect(()=>{
      loadMarketplaceItems();
    },[])


  // useEffect(() => {
  //   loadMarketplaceItems()
  // }, [])
  // if (loading) return (
  //   <main style={{ padding: "1rem 0" }}>
  //     <h2>Loading...</h2>
  //   </main>
  // )
  return (
    // <>
    //   <div className="flex justify-center">
    //     {items.length > 0 ?
    //       <div className="px-5 py-3 container">
    //         <div className='flex flex-wrap  gap-4 mt-4 justify-start items-center'>
    //           {items.map((item, idx) => (


    //             <div className="w-1/5 h-fit bg-red-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">

    //               <img
    //                 className="rounded-t-lg overflow-hidden object-cover justify-center w-full max-h-60"
    //                 src={item.image}
    //                 alt="flower"
    //               />

    //               <div className="py-2 flex flex-col items-center flex-center">

    //                 <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //                   {item.name}
    //                 </h5>

    //                 <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
    //                   <strong>{ethers.utils.formatEther(item.totalPrice)} BIT</strong>
    //                 </p>
    //                 <a className="inline-flex no-underline w-20 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    //                   Buy
    //                   <svg
    //                     className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
    //                     aria-hidden="true"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 14 10"
    //                   >
    //                     <path
    //                       stroke="currentColor"
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       strokeWidth="2"
    //                       d="M1 5h12m0 0L9 1m4 4L9 9"
    //                     />
    //                   </svg>
    //                 </a>
    //               </div>
    //             </div>

    //           ))}
    //         </div>
    //       </div>
    //       : (
    //         <main style={{ padding: "1rem 0" }}>
    //           <h2>No listed assets</h2>
    //         </main>
    //       )}
    //   </div>
    // </>
    <>
      <div className="flex flex-wrap gradient-bg-welcome min-h-screen  gap-10 justify-center pt-24 pb-5 px-16">
        {items.map((item: Item, index: number) => (
          <Cards key={index} item={item} />
        ))}
      </div>
    </>
  );
}
export default Home