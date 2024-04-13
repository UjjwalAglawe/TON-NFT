// useMainContract.ts
import { useEffect} from "react";
import { Address, OpenedContract, toNano } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { NFTCollection } from "../wrappers/NFTCollection";
// import { NftItem } from "../wrappers/NftItem";

export function useCounterContract() {
    const { client } = useTonClient();
    const { wallet , sender } = useTonConnect();
    const sleep = (time: number) => new Promise((resolve) =>
        setTimeout(resolve, time));
    // const [count, setCount] = useState<BigInt | null>(null);
    const forinti=0;
    const nftContract = useAsyncInitialize(async () => {
        if (!client || !wallet) return;

        const Contract=NFTCollection.fromAddress(Address.parse("EQBRC9XpIDHl8AqdI46j4nzx1GXTuDroDG5EC8hkoyWrxOiJ"));

        return client.open(Contract) as OpenedContract<NFTCollection>;
    }, [client, wallet]);

    // async function getData() {
    //     const nftItemdata=await nftContract?.getGetCollectionData();
    //     const  nftitemIndex=nftItemdata?.next_item_index; //might need -1
    //     console.log("This is nftitemIndex",nftitemIndex);


        
    //     // const nftItemAdress=await nftContract.getGetNftAddressByIndex(nftitemIndex);
    //     const nftItemAdress=await nftContract?.getGetNftAddressByIndex(nftitemIndex);

    //     console.log("NFT Item Address",nftItemAdress);

    //     return nftItemAdress;
    // }
    
        
    //     const nftItemContract=useAsyncInitialize(async ()=>{
    //         if(!client) return;
    //         console.log("Before nftItems");
    //         const nftItemAdress2=getData();
    //         const nftItems=NftItem.fromAddress(nftItemAdress2);
    //         console.log("After nftItems");
    //         return client.open(nftItems) as OpenedContract<NftItem>;

    //     })

     async function Minting() {
        if (!nftContract) return;

        //sending transcation
        const transcation=await nftContract.send(sender,{
            value:toNano("0.003")
        },"Mint");

        console.log("This is tansaction",transcation);
        
        await sleep(5000);
        // if (!nftContract || !nftItemContract) return;
        // const nftItemData=await nftItemContract?.getGetItemData();
        // console.log("This is NftItemData");
        
        // console.log(nftItemData);
        
    }
    useEffect(()=>{
        
    },[forinti])
    // async function increase() {
    //     const increaseResult = await countContract?.send(
    //         sender,
    //         {
    //             value: toNano('0.005'),
    //         },
    //         {
    //             $$type: 'Add',
    //             queryId: 0n,
    //             amount: 1n,
    //         }
    //     );

    //     console.log("increase result", increaseResult);
        
    // }


    return {
        // counts:count,
        Minting:Minting,
        // increase:increase,
    };
}
