import axios from "../axios";
import Profile from "./Profile";
import { withStyles } from "@material-ui/core/styles";
import mainGridStyles from "./ui/mainGridStyles";
import { Box } from "@material-ui/core/";
import { useEffect } from "react";
import FriendButton from "./FriendButton";
import { useDispatch, useSelector } from "react-redux";
import "./styles/images.css"

const IndividualPost = () => {
    const dispatch = useDispatch();
    const { id } = match.params;
    const user = useSelector(({ contacts }) => contacts[id]);

    useEffect(() => {
        !user &&
            (async () => {
                  try {
                    const res = await axios.get(`/listfeedimagesid/${id}.json`);
                      //const res2 = await axios.get(`/post`);

                      const { data } = res;
                      
                    console.log('[MEU RES LISTANDO]',res)
                    //const parseData = await res.json();
                    console.log('[VERIFICAÇAO]',res.data.user.array)
                   
          
                    const parseDataArray = res.data.user.array
                    
                     
                    for (let description in parseDataArray){
                      var createDiv = document.createElement('div')
                      createDiv.className = "concert"
                    var createA = document.createElement('a')
                    createDiv.appendChild(createA);
                    var createImg = document.createElement('img')
                    createImg.src = [parseDataArray[description]]
                    createA.appendChild(createImg)
                    document.getElementById('app').appendChild(createDiv)
                    }  
                  } catch (err) {
                    console.error(err.message);
                  }
                
            })();
    }, []);

    return (
        <>
        <div id="app" className="modal"><h1>OLA</h1>
        <div className="containermodal">
        <button className="close">Close</button>
        <div className="content"></div>
        </div>
        </div>

        </>
    );
};

export default withStyles(mainGridStyles)(IndividualPost);
  