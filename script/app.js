
const selectTag=document.querySelectorAll("select");
const traslateBtn=document.querySelector("#tranfer");
const fromText=document.querySelector("#fromText");
const toText=document.querySelector("#toText");
const icons=document.querySelectorAll("img");


//all counties language code in select
selectTag.forEach((tag,id)=>{
    for(const countiesCode in counties){
        let selected;
        if(id==0 && countiesCode=="en-GB"){
            selected="selected";
        }
        else if(id==1 && countiesCode=="hi-IN"){
            selected="selected";
        }

        
        let option= `<option value="${countiesCode}" ${selected}>${counties[countiesCode]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);

     }
});


//tranfer button 
traslateBtn.addEventListener(("click"),()=>{
    let Text=fromText.value;
    translateFrom=selectTag[0].value,
    translateTo=selectTag[1].value;

    const URL=`https://api.mymemory.translated.net/get?q=${Text}!&langpair=${translateFrom}|${translateTo}`;


    fetch(URL).then(res=>res.json()).then(data=>{

        toText.value = data.responseData.translatedText
    });
});

//speaker button & copy button 

icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{
        //COPY BUTTON
        if(target.classList.contains("copy")){
            if(target.id=="from"){
                navigator.clipboard.writeText(fromText.value);
            }
            else{
                navigator.clipboard.writeText(toText.value);
            }
        }
        //SPEAKER BUTTON
        else{
            let utterance;
            if(target.id=="from"){
                utterance=new SpeechSynthesisUtterance(fromText.value);
                utterance.lang=selectTag[0].value;
            }
            else{
                utterance=new SpeechSynthesisUtterance(toText.value);
                utterance.lang=selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
        
    });
    
});

