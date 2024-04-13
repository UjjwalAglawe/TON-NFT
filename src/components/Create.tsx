// import { useEffect, useState } from 'react'
// // import { ethers } from "ethers"
// import { Row, Form, Button } from 'react-bootstrap'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// //use main conract from hooks


// interface FormInfo {
//     title: string;
//     description: string;
//     // owner: string;
//     price: number | null;
// }

// interface DataInfo {
//     name: string;
//     description: string;
//     image: string;
//     price: number | null;
//     // owner: string | null;
// }
// const Create = () => {

//     const [nftimage, setNFTImage] = useState<File | undefined>();
//     const [forminfo, setFormInfo] = useState<FormInfo>({
//         title: "",
//         description: "",
//         price: null
//     });

//     useEffect(() => {
//         document.title = "Create"
//     }, []);

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = event.target;
//         setFormInfo((prevState) => ({ ...prevState, [name]: value }));
//     };

//     const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             setNFTImage(event.target.files[0]);
//         }
//     };

//     const handleEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         console.log(nftimage)
//         console.log(forminfo);

//         const formData = new FormData();
//         const jsonformData = new FormData();

//         formData.append("file", nftimage);

//         const metadata = JSON.stringify({
//             name: forminfo.title,
//             description: forminfo.description
//         });
//         jsonformData.append('pinataMetadata', metadata);

//         const options = JSON.stringify({
//             cidVersion: 0,
//         })
//         jsonformData.append('pinataOptions', options);

//         try {

//             const resFile = await axios({
//                 method: "post",
//                 url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//                 data: formData,
//                 headers: {
//                     pinata_api_key: `1a7cac69d0dac2bceaeb`,
//                     pinata_secret_api_key: `d70366959ea7a7fd5396abed2b11003168369c278987b9d6cb09d195d71cebc2`,
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             console.log(resFile.data);

//             const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

//             const info: DataInfo = {
//                 name: forminfo.title,
//                 description: forminfo.description,
//                 image: ImgHash,
//                 price: forminfo.price
//             }

//             async function pinJSONToPinata(info: DataInfo) {
//                 const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
//                 const headers = {
//                     'Content-Type': 'application/json',
//                     'pinata_api_key': `1a7cac69d0dac2bceaeb`,
//                     'pinata_secret_api_key': `d70366959ea7a7fd5396abed2b11003168369c278987b9d6cb09d195d71cebc2`
//                 };

//                 try {
//                     const res = await axios.post(url, info, { headers });
//                     const meta = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
//                     console.log(meta);
//                 } catch (error) {
//                     console.error(error);
//                 }

//             }

//             pinJSONToPinata(info)


//         } catch (error) {
//             console.log(error);
//         }



//     };



//     return (
//         <div className='min-h-screen' >
//             <div className="flex ml-20 mt-20">
//                 <main role="main">
//                     <div className="content mx-auto text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5 px-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
//                         <Row className="g-4">
//                             <Form.Control
//                                 type="file"
//                                 required
//                                 name="file"
//                                 onChange={changeHandler}
//                             />
//                             <Form.Control onChange={handleChange} name="title" id="title" size="lg" required type="text" placeholder="Name" />
//                             <Form.Control onChange={handleChange} name="description" id="description" size="lg" required as="textarea" placeholder="Description" />
//                             <Form.Control onChange={handleChange} name="price" id="price" size="lg" required type="number" placeholder="Price in BIT" />
//                             <div className="d-grid px-0">
//                                 <Button onClick={handleEvent} variant="primary" size="lg">
//                                     Create NFT!
//                                 </Button>
//                             </div>
//                         </Row>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// }

// export default Create

import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
// import { Row, Form, Button } from 'react-bootstrap';
import { useCounterContract } from '../hooks/useMainContract';
import axios from 'axios';
import { toast } from 'react-toastify';

interface FormInfo {
    title: string;
    description: string;
    price: number | null;
}

interface DataInfo {
    name: string;
    description: string;
    image: string;
    price: number | null;
}

const Create: React.FC = () => {
    const [nftimage, setNFTImage] = useState<File | undefined>();
    const [forminfo, setFormInfo] = useState<FormInfo>({
        title: "",
        description: "",
        price: null
    });

    useEffect(() => {
        document.title = "Create"
    }, []);
    const {Minting}=useCounterContract();
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setNFTImage(event.target.files[0]);
        }
    };

    const handleEvent = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!nftimage) {
            console.error("No image selected.");
            return;
        }
        Minting();
        try {
            const formData = new FormData();
            formData.append("file", nftimage);

            const resFile = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                headers: {
                    pinata_api_key: `f655347379957f34ac93`,
                    pinata_secret_api_key: `9c617c9f5adfe78b43d43e60e03d2074dcd69e0669ad0b89dd8dc1e061fd52ca`,
                    "Content-Type": "multipart/form-data",
                },
            });

            const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

            const info: DataInfo = {
                name: forminfo.title,
                description: forminfo.description,
                image: ImgHash,
                price: forminfo.price
            }

            const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
            const headers = {
                'Content-Type': 'application/json',
                'pinata_api_key': `f655347379957f34ac93`,
                'pinata_secret_api_key': `9c617c9f5adfe78b43d43e60e03d2074dcd69e0669ad0b89dd8dc1e061fd52ca`
            };

            const res = await axios.post(url, info, { headers });
            const meta = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
            console.log(meta);

        } catch (error) {
            console.error(error);
        }
        // Minting();
        setTimeout(() => {
            toast.success("NFT Created Successfully!");
        }, 9000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="flex justify-center mt-20">
                <main role="main">
                    <div className="content mx-auto text-xl space-y-8 shadow-2xl rounded-lg border-2 p-5 px-10">
                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="file"
                                required
                                name="file"
                                onChange={changeHandler}
                                className="rounded-lg border-2 border-gray-200 p-2 w-full"
                            />
                            <input
                                onChange={handleChange}
                                name="title"
                                id="title"
                                required
                                type="text"
                                placeholder="Name"
                                className="rounded-lg border-2 border-gray-200 p-2 w-full"
                            />
                            <textarea
                                onChange={handleChange}
                                name="description"
                                id="description"
                                required
                                placeholder="Description"
                                className="rounded-lg border-2 border-gray-200 p-2 w-full"
                            />
                            <input
                                onChange={handleChange}
                                name="price"
                                id="price"
                                required
                                type="number"
                                placeholder="Price in BIT"
                                className="rounded-lg border-2 border-gray-200 p-2 w-full"
                            />
                            <div className="flex justify-center">
                                <button
                                    onClick={handleEvent}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                                >
                                    Create NFT!
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>

    );

}

export default Create;
