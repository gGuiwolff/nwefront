import React, { useEffect, useState } from "react";
import axios from '../../axios'
import './index.css';


//components
const logout = async (e) => {

  res.cookie("mytoken", req.csrfToken());
  next();
};

function UploadFile() {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadImage = async e => {
    console.log('File uploading');
    const { files } = e.target;

    console.log(e.target.files);

    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'fsibtowr');
    setLoading(true);

    console.log(data);

    for (let d of data.entries()) {
      console.log(d[0] + ', ' + d[1]);
    }
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/guiwolff/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    if(res){
      const description = await res.json([{
        user_id:{}
      }]);
      try {
        const body = { description };
        console.log('meu body.description.url esta aqui...',body.description.url)
        const response = await axios.post("/feed", {
          body: body
        });
        
        const parseResponse = await response.json();
        // window.location = "/";
      } catch (err) {
        console.error(err.message);
      }
    console.log(description.url)
    setImage(description.secure_url);
    setLoading(false);
    console.log('a url é:',description.url)
    
    }
};
  
  return (
    <div className='container'>
      <h1>Upload your image</h1>
      <form >
        <input type='file' name='file' onChange={uploadImage} />
        <button>Add</button>
      </form>
      <div className='preview'>
        {loading ? <p>Loading...</p> : <img src={image} alt='pic' />}
      </div>
      <div id="app"></div>
      <input
						type='button'
						onClick={logout()}
						value="LOGOUT"
					/>
    </div>
  );
}

export default UploadFile;
