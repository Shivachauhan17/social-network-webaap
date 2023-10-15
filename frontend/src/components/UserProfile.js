import React, { useEffect, useState,useContext } from "react";
import {memo} from 'react';
import axios from 'axios'
import Cookie from '../components/Cookie'
import './css/UserProfile.css'
import { useProfileContext } from "../pages/profile";
import {AiFillMail,AiOutlineArrowDown} from 'react-icons/ai'

// import { ImProfile } from 'react-icons/im';
// import { MdSportsBaseball } from 'react-icons/gi';
// import { LiaBirthdayCakeSolid } from 'react-icons/lia';
// import { BsFillBalloonHeartFill } from 'react-icons/bs';
// import { PiPlusCircleBold } from 'react-icons/lu';



const UserProfile=()=>{
  const {newPost,setNewPost}=useProfileContext()

  const cookie=Cookie()

  useEffect(()=>{
    cookie.setUserCookie('Shiva')
  })
    const [formData, setFormData] = useState({
        image: null,
        caption: '',
        user:cookie.getUserCookie()
      });
    
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setFormData({ ...formData, image: file });
        }
      };
    
      const handleCaptionChange = (event) => {
        const caption = event.target.value;
        setFormData({ ...formData, caption });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSend=new FormData();
        formDataToSend.append('myfile',formData.image)
        formDataToSend.append('caption',formData.caption)
        formDataToSend.append('user',formData.user)
    
        try {
          const response = await axios.post('http://localhost:8000/post/createPost', formDataToSend,{
            
              headers: {
                'Content-Type': 'multipart/form-data', // Set the content type to handle file uploads
              },
          });
          
            console.log(response.status)
            setFormData({
              image: null,
        caption: '',
        user:cookie.getUserCookie()
            })
          
          setNewPost(newPost=>!newPost)
          // console.log(formData)
        } catch (error) {
          console.error(error);
        }
    
        // You can access formData.selectedImage and formData.caption separately as well
        // For example: formData.selectedImage and formData.caption
      };

    return(
        <div className="UserProfile">
            <div className="profileSec">
                <img 
                className="shadow-lg"
                src='https://imgs.search.brave.com/AMJIF4luRDh-XqO7A9Nmb2O84SqbuDIrugtKeEL5gx4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZmFuZG9td2lyZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjMvMDcvMzAwOTE1/NDYvSU1HXzAzMjku/anBlZw'/>
            
                <h3>{cookie.getUserCookie()}</h3>
                
            </div>

            <div>
              {/* <div>
                <PiPlusCircleBold/>
              </div>
              <div>
                <ImProfile/>
              </div>
              <div>
                <LiaBirthdayCakeSolid/>
              </div>
              <div>
                <MdSportsBaseball/>
              </div>
              <div>
                <BsFillBalloonHeartFill/>
              </div> */}

            </div>

            <div>
              <div>
              <h4>Post Something new</h4>
              </div>
              <div className="postForm" >
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                      <div className="flex flex-col">  
                        <div className="chooseImgDiv">
                          
                          <div className="flex gap-x-4">
                            <AiOutlineArrowDown/>
                            <label htmlFor="image">choose a image</label>
                            </div>
                            <input id="image" type="file" accept="image/*" name="myfile" onChange={handleImageChange}/>
                            
                        </div>

                        <div className="captionDiv mt-2.5">
                          <div className="flex gap-x-4">
                            <AiFillMail/>
                            <label htmlFor="caption">write caption</label>
                          </div>
                          <div>
                            <input placeholder="caption" value={formData.caption} id="caption" type="text" onChange={handleCaptionChange}/>
                            </div>
                        </div>
                        </div>
                      <div className="flex justify-center">
                      <button  type="submit" onSubmit={handleSubmit}>Post</button>
                      </div>
                  </form>
              </div>
              </div>
        </div>
    )

}


export default memo(UserProfile);