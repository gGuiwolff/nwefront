import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import axios from "../axios";
import "./styles/images.css";
import { Typography } from "@material-ui/core/";
import Modal from "./modal/Modal"


export function ListImageFeed(){
    console.log('ini')
    const [image, setImages] = useState("");
    const [allImages, setAllImages] = useState([]);
  
    const getPictues = async () => {
      try {
        const res = await axios.get("https://vegiw.herokuapp.com/listfeedimages");
        const ids = await axios.get("https://vegiw.herokuapp.com/listfeedimagesid");
        console.log('[MEU RES LISTANDO]',res)
        //const parseData = await res.json();
        console.log('[TESTE RES]',ids)

        //novo array
        
        
       
        setAllImages();
        //console.log('[PARSE DATA]',parseData)
        //console.log('[aqui] parse data ARRAY',parseData[0].array)
        setImages(); // name is the first array item
        const parseDataArray = res.data[0].array
        const idPost = ids.data[0].array



        console.log('[TESTE 2]',idPost)
        
        
        //ITERAR SOBRE ARRAY DE URLS E ARRAY DE IDS
        /*const arrayUrl = impar(parseDataArray)
        console.log(arrayUrl)
        const arrayIds = impar(parseDataArray)
        console.log(arrayIds)*/


        
        for (let description in parseDataArray && idPost){
        
          var createDiv = document.createElement('div')
          createDiv.className = "concertdiv"
          var createA = document.createElement('a');
        createA.href = `http://localhost:3000/indiviaualpost/`+[idPost[description]]
        createDiv.appendChild(createA);
        var createImg = document.createElement('img')
        createImg.src = [parseDataArray[description]]
        createImg.className = "concert"
        createA.appendChild(createImg)
        document.getElementById('app').appendChild(createDiv)
        }
  
        /*for (let description in parseDataArray){
          var createA = document.createElement('a')
          var createAText = document.createTextNode('theCounter')
          createA.id = 'jk'
          createA.href = '/feed'
          var createImg = document.createElement('img')
          createImg.src = [parseDataArray[description]]
          document.getElementById('app').appendChild(createA)
          document.getElementById('jk').appendChild(createImg);
          }*/
        //myImage.className = "gallery-image";
        /*
        for(let description in parseDataArray){
          var myImage = new Image();
          myImage.class="gallery-image"
          myImage.src = [parseDataArray[description]]
          document.getElementById('app').appendChild(myImage);
        }
        */


      } catch (err) {
        console.error(err.message);
      }
    };
  
    const logout = async () => {
      axios.get("/logout")
      window.location.href("/http://localhost:3000/welcome#/")
      setTimeout(window.location.reload(true),3000)
    };
    //=============pegar fotos ===================
  
    //============pegar fotos =====================
  
    useEffect(() => {
      getPictues();
    
    }, []);
  
    return (

      <div className="constainer">
        <Modal />
        <Link to="/feed">Feed Uploads</Link>
 <button onClick={logout => () => {console.log('deucerto')}} type="button" ><Link to="/welcome">OLA</Link></button>
        <div className="gallery">
        <div className ="gallery-item" id="app"></div>
      </div>
      {/*<div className="loader"></div>*/}
      <button onClick={logout}>BLABLABLA</button>
      </div>

    );
};
  
  export default ListImageFeed;
