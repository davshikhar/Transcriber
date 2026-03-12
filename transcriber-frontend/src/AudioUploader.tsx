import axios from "axios";
import { useState } from "react";

export const AudioUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [transcription, setTranscription] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files ? e.target.files[0] : null);
    }

    const handleUpload = async () => {
        const formData = new FormData();
        //this approach is ideal for sending files via the htt requests as it allows us to easily append the file and any additional data if needed.
        if (file) {
            formData.append("file", file);
            try {
                const response = await axios.post('http://localhost:8080/api/transcribe', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                setTranscription(response.data);
            }
            catch (error) {
                console.log("Error uploading the file:", error);
            }
        }
    }


    return (
        <div className="min-h-screen bg-slate-900 rounded-2xl flex items-center justify-center from-blue-50 to-indigo-100 p-6">

            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    🎙 Audio to Text Transcriber
                </h1>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">

                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M7 16V4m0 0l-4 4m4-4l4 4M17 8v12m0 0l-4-4m4 4l4-4" />
                        </svg>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-blue-600">Click to upload</span> or drag audio
                        </p>
                    </div>

                    <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
                <div className="flex justify-center mt-8">
                    <button
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition transform cursor-pointer"
                        onClick={handleUpload}>
                        Upload & Transcribe
                    </button>
                </div>
                <div className="mt-10">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                        Transcription Result
                    </h2>

                    <div
                        className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-lg text-gray-700 leading-relaxed shadow-sm">
                        {transcription ? transcription : "No transcription yet."}
                    </div>
                </div>

            </div>
        </div>
    )
};