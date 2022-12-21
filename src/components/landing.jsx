import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';

import logo from '../logo.svg';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';


import '../App.css';

export const Landing = () => {
  const [randomPhotos, setRandomPhotos] = useState([]);
  //IMPORTANT
  //Access TOKEN should be handed by a vault secret provider and in the backend preferably. 
  //however as it is a public API and for the sake of this exercice I will leave as constant.
  const DEMO_KEY = '8PRRHXL8sjxYzX7Gqlx8pG4MvHZyZWDE7XoIHds1'



  useEffect(() => {
    //Initialize random photos 
    if(randomPhotos.length === 0){
        for (let index = 0; index < 3; index++) {
            getRandonPhotos()
            
        }
       
    }
        
    

  },[])


  //This function get a batch of 25 photos from a random SOL number. 
  //Then it generates a random number between 0 and 25.
  function getRandonPhotos(pages = 1){

    let randomNumber = parseInt(Math.floor(Math.random() * 1500))
    

    fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol='+randomNumber+'&page='+pages+'&api_key='+DEMO_KEY, { method: 'GET' })
    .then(response => {
        return response.json()
        
    }).then(json => {
        
        if(json !== undefined){
            if(json.photos.length > 0 ){
                    let len = json.photos.length
                    let subRandom = parseInt(Math.floor(Math.random() * len))
                    let photo = json.photos[subRandom]                 
                    setRandomPhotos(prevItems => [ photo,...prevItems])

            }              
        }
    }) 

  }


  return (

            <Grid container spacing={2} alignItems="center" justify="center">
                    
                    <Grid item xs={12} md={12}>
                        <div className='App'>
                            <img src={logo} alt="Nasa"/>
                            <h2 className='text-color'>Welcome to Mars Rover APP</h2>
                            <Button size='small' variant="contained" color="primary" onClick={() => {getRandonPhotos()}}>Show me more</Button>
                        </div>
                        
                    </Grid>
                        {randomPhotos.map((photo, index) => (
                                
                                        
                                <Grid item xs={12} md={4} id={index} alignItems="center" justify="center">

                                    <Card style={{margin: '15%'}} id={index}>
                                        <CardHeader
                                            title={"Random #" + (index + 1)}
                                            subheader={"Rover: " + photo.rover.name }
                                        />
                                        <CardActionArea onClick={() => { 
                                            
                                                    window.open(photo.img_src, '_blank');

                                            }}>
                                        <CardMedia
                                            component="img"
                                            
                                            image={photo.img_src}
                                            alt={photo.sol}
                                        />
                                        <CardContent style={{textAlign: 'left'}}>
                                            <Typography gutterBottom variant="h6" component="div">
                                            Camera {photo.camera.full_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Earth date: {photo.earth_date}
                                            </Typography>
                                        </CardContent>
                                        </CardActionArea>
                                        </Card>
                                </Grid>
                        
                    ))}
                                
            </Grid>

       
  );
}