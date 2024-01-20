import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Axios from "axios";


function Dashboard() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [nominatorList, setNominatorList] = useState([]);
    const [pocValuesList, setPOCValuesList] = useState([]);
    const [ageGroupValuesList, setAgeGroupValuesList] = useState([]);
    const [preferredRegionValuesList, setPreferredRegionValuesList] = useState([]);
    const [theaterExperienceValuesList, setTheaterExperienceValuesList] = useState([]);
    
    const getNominators = () => {
        Axios.get("http://localhost:3001/nominators").then((response) => {
            setNominatorList(response.data);
        });    
        if (ageGroupValuesList.length == 0) getAgeGroupValues();
        if (pocValuesList.length == 0) getPOCValues();
        if (preferredRegionValuesList.length == 0) getPreferredRegionValues();
        if (theaterExperienceValuesList.length == 0) getTheaterExperienceValues();
    };


    function getPOCValues() {
        Axios.get("http://localhost:3001/pocValues").then((response) => {
            setPOCValuesList(response.data);
        });
    };
    
    function getAgeGroupValues() {
        Axios.get("http://localhost:3001/ageGroupValues").then((response) => {
            setAgeGroupValuesList(response.data);
        });
    };
    
    function getPreferredRegionValues() {
        Axios.get("http://localhost:3001/preferredRegionValues").then((response) => {
            setPreferredRegionValuesList(response.data);
        });
    };
    
    function getTheaterExperienceValues() { 
        Axios.get("http://localhost:3001/theaterExperienceValues").then((response) => {
            setTheaterExperienceValuesList(response.data);
        });
    };
    
    function PushOnCheckboxList(wordList, word, sentence) {
        if (sentence.includes(word))
        {
            wordList.push(<div>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id={word} name={word} value="yes" checked></input><label for={word}>{word}</label></div>);
        }
        else {
            wordList.push(<div>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id={word} name={word} value="yes"></input><label for={word}>{word}</label></div>);
        }
    }

    function CreateDBCheckBoxList(sentence, valuesList)  {
        if (sentence == null) sentence = "";
        var wordList = [];
    
        {valuesList.map((val, key) => {
            PushOnCheckboxList(wordList, val.Value, sentence);
            console.log(val.Value);
        })}
    
        return wordList;
    }    

    return (
        <div className="">
        <button onClick={getNominators}>Show My Profile</button>        

        {nominatorList.map((val, key) => {
          return (
              <div className="nominator">
              <div>
                <h1>-------------------------------------------------------------------------------------------------------</h1>
                <h3>Name: {val.FirstName} {val.LastName}</h3>
                <h3>Email: {val.Email}</h3>
                <h3>Phone: {val.Phone}</h3>
                <h3>Address: {val.Address1} {val.Address2}, {val.City} {val.State}, {val.ZipCode}</h3>
                <h3>Occupation: {val.Occupation}</h3>
                <h3>Theater Education / Training: {val.TheaterEducationTraining}</h3>
                <h3>Age Group: <br/> {CreateDBCheckBoxList(val.AgeGroup, ageGroupValuesList)}</h3>
                <h3>Gender: {val.GenderIdentification}</h3>
                <h3>Do you identify as a Person of Color: {CreateDBCheckBoxList(val.PersonOfColorStatus, pocValuesList)}</h3>
                <h3>Theater Affiliations: {val.TheaterAffiliations}</h3>
                <h3>Preferred Region: {CreateDBCheckBoxList(val.PreferredRegion, preferredRegionValuesList)}</h3>
                <h3>Current TPS Member?: {val.CurrentTpsMember}</h3>
                <h3>AntiBias Training Done?: {val.AntiBiasTraining}</h3>
                <h3>AntiBias Training Comments: {val.AdditionalComments}</h3>
                <h3>Stage and Theater Experience: <br/> {CreateDBCheckBoxList(val.ElementExperience, theaterExperienceValuesList)}</h3>
                <h3>Can Travel: {val.CanTravel}</h3>
              </div>
            </div>
          );
        })}
      </div>
      );   
  };
  
  export default Dashboard;