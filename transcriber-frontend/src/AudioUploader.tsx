import axios from "axios";
import { useState } from "react";

export const AudioUploader = () =>{
    const [file,setFile] = useState<File | null>(null);
    const [transcription, setTranscription] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFile(e.target.files ? e.target.files[0]: null);
    }

    const handleUpload = async () =>{
        const formData = new FormData();
        //this approach is ideal for sending files via the htt requests as it allows us to easily append the file and any additional data if needed.
        if(file){
            formData.append("file",file);
            try{
                const response = await axios.post('http://localhost:8080/api/transcribe',formData,{
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                })
                setTranscription(response.data);
            }
            catch(error){
                console.log("Error uploading the file:",error); 
            }
        }
    }


    return(
        <div className="container mx-auto p-4 text-center bg-gray-100 rounded-lg shadow-md">
            <h1 className="font-bold text-2xl">Audio to text transcriber</h1>
            <div className="mt-4 p-4 border-2 border-dashed border-gray-400 rounded-lg">
                <input type="file" accept="audio/*" onChange={handleFileChange}/>
            </div>
            <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload and Transcribe</button>
            <div>
                <h2 className="font-semibold text-xl mt-6"> Transcription Result:</h2>
                <p className="mt-2 text-gray-700">Transcribed result will be displayed here.
                    {transcription ? transcription : "No transcription yet."}
                </p>
            </div>
        </div>
    )
};