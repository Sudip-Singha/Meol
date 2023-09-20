import React from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import sharevideo from '../assets/share.mp4';
import logo from '../assets/Meol.png';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const createOrGetUser = (response) => {
    const decoded = jwt_decode(response.credential);
    const { name, picture, sub } = decoded;
    localStorage.setItem('user', JSON.stringify(decoded));

    const user = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }

    client.createIfNotExists(user)
      .then(() => {
        navigate('/', { replace: true })
      })

  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className='relative w-full h-full'>
        <video src={sharevideo}
          className='w-full h-full object-cover'
          type='video/mp4'
          loop
          muted
          controls={false}
          autoPlay
        />
      </div>

      <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'>
        <div className='p-5'>
          <img src={logo} width='130px' alt="logo" />
        </div>

        <div className='shadow-2xl'>
          <GoogleLogin
            onSuccess={createOrGetUser}
            onError={() => console.log('error')}
          />
        </div>
      </div>
    </div>
  )
}

export default Login;

