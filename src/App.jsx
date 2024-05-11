import 'regenerator-runtime/runtime';
import { useEffect, useState } from 'react'
import './App.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import RestartAltIcon from '@mui/icons-material/RestartAlt';


function App() {

  const [inputText,setInputText]=useState("");
  const [isCopied, setCopied] = useClipboard(inputText, {
    successDuration:3000
});

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

  useEffect(()=>{
    setInputText(transcript);
  },[transcript])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }


  return (
    <>
      <div className=' w-[700px] mx-auto text-center mt-10'>
       <div>
        <h1 className='font-bold text-4xl mb-5'>Speech to Text Converter</h1>
        <p className='text-xl'>A React hook that converts speech from the microphone to text and makes it available to your React components.</p>
       </div>

       <div className='bg-white rounded-lg mt-7 shadow-md overflow-y-hidden'>
          <div className='w-full h-[500px] overflow-y-hidden'>
              <div className='main-content h-[430px] overflow-y-scroll text-left p-5 text-xl'>
                {transcript}
              </div>


              <div className='flex justify-around mt-[]'>
                <button onClick={startListening} className='text-xl bg-violet-400 px-3 py-2 rounded-lg hover:scale-105 transition-all'>Start Listening</button>
                <button onClick={SpeechRecognition.stopListening}  className='text-xl bg-violet-400 px-3 py-2 rounded-lg hover:scale-105 transition-all'>Stop Listening</button>
                <button onClick={setCopied}  className='text-xl bg-violet-400 px-3 py-2 rounded-lg hover:scale-105 transition-all'>{isCopied ? "Copied!" : "Copy to clipboard"}</button>
                <button onClick={resetTranscript} className='text-xl bg-violet-400 px-3 py-2 rounded-lg hover:scale-105 transition-all'><RestartAltIcon /></button>
              </div>
          </div>
       </div>
      </div>
    </>
  )
}

export default App
