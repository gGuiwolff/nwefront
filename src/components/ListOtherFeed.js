import axios from "../axios";
import Profile from "./Profile";
import { withStyles } from "@material-ui/core/styles";
import mainGridStyles from "./ui/mainGridStyles";
import { Box } from "@material-ui/core/";
import { useEffect } from "react";
import FriendButton from "./FriendButton";
import { useDispatch, useSelector } from "react-redux";

const ListImageFeed = ({ history, match, classes }) => {
    const dispatch = useDispatch();
    const { id } = match.params;
    const user = useSelector(({ contacts }) => contacts[id]);

    useEffect(() => {
        !user &&
            (async () => {
                /*try {
                    const response = await axios.get(`/otherfeed/${id}.json`);
                    const { data } = response;
                    if (data.ownProfile) {
                        history.push("/profile");
                        return;
                    }
                    const { user } = response.data;
                    user.id = id;
                    dispatch(addContact(user));
                } catch (err) {
                    const { error } = err.response.data;
                    dispatch(setError(error));
                    history.push("/");
                }*/
                  try {
                      const res = await axios.get(`/otherfeed/${id}.json`);
                      //const res2 = await axios.get(`/post`);

                      const { data } = res;
                      if (res.data.ownProfile) {
                      history.push("/listfeed");
                      return;
                    }
                    console.log('[MEU RES LISTANDO]',res)
                    //const parseData = await res.json();
                    console.log('[VERIFICAÇAO]',res.data.user.array)
                   
          
                    const parseDataArray = res.data.user.array
                    
                     
                    for (let description in parseDataArray){
                      var createDiv = document.createElement('div')
                      createDiv.className = "app"
                    var createA = document.createElement('a')
                    createDiv.appendChild(createA);
                    createA.href = [parseDataArray[description]]
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
        <div id="app"></div>
            {user && (
                <Box
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Profile
                        classes={classes}
                        first_name={user.first_name}
                        last_name={user.last_name}
                        profile_picture={user.profile_picture}
                        bio={user.bio}
                    />
                    <Box
                        style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <FriendButton
                            user={user}
                            style={{ margin: "0 auto" }}
                            id={id}
                        />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default withStyles(mainGridStyles)(ListImageFeed);

/*const ListImageFeed = async ({ history, match, classes }) => {
    console.log('[HJJJJJJJJJJJ]')
    const { id } = match.params;
    console.log(match.params)*/

   /*if (response) {
        history.push("/listfeed");
        return;
    }*/


    /*const getPictues = async () => {
        try {
            const res = await axios.get(`/otherfeed/${id}.json`);
            const { data } = res;
          console.log('[MEU RES LISTANDO]',res)
          //const parseData = await res.json();
          console.log('[TESTE RES]',res.data[0].array)
          
         

          const parseDataArray = res.data[0].array
          console.log('[TESTE 2]',parseDataArray)
          
          console.log('[IMAGENS AQUI]',image)
           
          for (let description in parseDataArray){
            var createDiv = document.createElement('div')
            createDiv.className = "app"
          var createA = document.createElement('a')
          createDiv.appendChild(createA);
          createA.href = 'https://www.google.com/'
          var createImg = document.createElement('img')
          createImg.src = [parseDataArray[description]]
          createImg.class = "intercom-lightweight-app-launcher-custom-icon-open"
          createA.appendChild(createImg)
          document.getElementById('app').appendChild(createDiv)
          }  
        } catch (err) {
          console.error(err.message);
        }
      };*/

    // kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
   /*const { user } = response.data;
   user.id = id;
   console.log('[USUARIO AQUI]',id)
               

    return (
        <>
        <div>
            <h1>
            ola
            </h1>
        </div>
        </>
    );
};*/

//export default withStyles(mainGridStyles)(ListImageFeed);