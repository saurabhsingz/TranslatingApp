
import './App.css';
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {

  const [txt, settxt] = useState("");
  const [resulttxt, resultsettxt] = useState("");
  const [languagelist, setlanglist] = useState([]);
  const [langkey, setlangkey] = useState("");
  const [declangkey, decsetlangkey] = useState("");

  useEffect(() => {
    axios.get('https://libretranslate.com/languages')
      .then(response => {
        setlanglist(response.data)
      })
      getlanguagesource();
  }, [txt])

  function setinputarea(e) {
    
    settxt(e.target.value)
    
  }

  function getlanguagesource(){
    let data1={
      q:txt
    }
    axios.post('https://libretranslate.de/detect',data1)
    .then(response=>{
      decsetlangkey(response.data[0].language)
    })
  }

  function translatetext() {
    let data={
      q:txt,
      source: declangkey,
      target: langkey
    }
    if(data.q==""){
      resultsettxt("*Please Type Something")
    }
    else if(data.target=="")resultsettxt("*Please Select Desired Language")
    else
    {axios.post('https://libretranslate.de/translate',data)
    .then(response=>{
      resultsettxt(response.data.translatedText)
    })}
  }
  function languagekey(e) {
    setlangkey(e.target.value)
  }
  return (
    <div class="container">
      <div className="row">
        <div className="col-md-12">
          <h1 class="mt-3 position-relative font">⌨️ Translate</h1>
          <div class="form-group shadow-textarea mt-4">
            <textarea onChange={setinputarea} class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="5" placeholder="Enter the Text you want to Translate..."></textarea>
          </div>
          <div class="form-group" aria-label="Default select example">
            <select class="form-control" id="sel1" onChange={languagekey}>
              <option value="none" selected>Select Translating Language</option>
              {languagelist.map((language) => {
                return <option value={language.code}>{language.name}</option>
              })}
            </select>
          </div>
          <div class="form-group shadow-textarea mt-4">
            <textarea disabled class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="5" placeholder="Translated Text will show Here..." value={resulttxt}></textarea>
          </div>
          <button onClick={translatetext} className="btn btn-primary">Translate</button>
        </div>
      </div>
    </div>
  );
}

export default App;
