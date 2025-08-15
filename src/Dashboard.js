import { useState, useEffect } from 'react'
import useAuth from './useAuth.js'
import {Container, Card, Row, Col   } from 'react-bootstrap'
import SpotifyWebApi from "spotify-web-api-node"
import TrackSearchResult from './TrackSearchResult.js'
import Player from './Player.js'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
})



export default function Dashboard({code}) {
    const access_token = useAuth(code)
    // const [search, setSearch] = useState("")
    const [topArtists, setTopArtists] = useState([])
    const [playingTrack, setPlayingTrack] = useState()

    function chooseTrack(track){
        setPlayingTrack(track)
       
    }
  

    useEffect(()=> {
        if(!access_token) return;
        spotifyApi.setAccessToken(access_token)
    }, [access_token])

    
    useEffect(() => {
        if (!access_token) return;
      
        spotifyApi.getMyTopArtists()
          .then(res => {
            setTopArtists(
              res.body.items.map(artist => {
                const smallestImage = artist.images.reduce(
                  (smallest, image) => image.height < smallest.height ? image : smallest,
                  artist.images[0]
                );
      
                return {
                  artist: artist.name,
                  title: artist.name, 
                  uri: artist.uri,
                  albumUrl: smallestImage.url
                };
              })
            );
          })
          .catch(err => {
            console.error("Error fetching top artists", err);
          });
      }, [access_token]);
      

  return (
<Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
  <div className="mb-3" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
    Welcome to your Recapify
  </div>
  <div className="mb-2" style={{ fontSize: "1.2rem" }}>
    Top Artists:
  </div>

  <Row className="flex-grow-1 overflow-auto">
    {topArtists.map(artist => (
      <Col key={artist.uri} xs={12} sm={6} md={4} lg={3} className="mb-4">
        <Card
          onClick={() => chooseTrack(artist)}
          style={{
            cursor: "pointer",
           backgroundColor: "#169c46",
            color: "#fff",
            border: "none"
          }}
        >
          <Card.Img
            variant="top"
            src={artist.albumUrl}
            alt={`${artist.artist} cover`}
            style={{ objectFit: "cover", height: "200px" }}
            
          />
          <Card.Body>
            <Card.Title className="mb-1">{artist.artist}</Card.Title>
            <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
              Artist
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>

  <div className="mt-4" >
    <Player 
    accessToken={access_token} trackUri={playingTrack?.uri} />
  </div>
</Container>

  )
}
