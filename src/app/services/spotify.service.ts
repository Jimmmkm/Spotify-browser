import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    var trial=  this.http.get(this.expressBaseUrl+endpoint).toPromise();
    return trial;
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data
    return this.sendRequestToExpress('/me').then((data) => {
      console.log(data)
      return new ProfileData(data);
    });

  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    return this.sendRequestToExpress('/search/'+category+'/'+encodeURIComponent(resource)).then((response) => {
      var info=[];
      if (category=='artist') {
        for (let i=0; i<response.artists['items'].length; i++) {
          info.push(new ArtistData(response.artists['items'][i]))
        }
        
      } if (category=='album') {
          for (let i=0; i<response.albums['items'].length; i++) {
            info.push(new AlbumData(response.albums['items'][i]))
          }
      } if (category=='track') {
          for (let i=0; i<response.tracks['items'].length; i++) {
            info.push(new TrackData(response.tracks['items'][i]))
          }
      }
      return info; 
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    return this.sendRequestToExpress('/artist/'+encodeURIComponent(artistId)).then((response) => {
      return new ArtistData(response);
    });

  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    return this.sendRequestToExpress('/artist-related-artists/'+encodeURIComponent(artistId)).then((response) => {
      var info=[];
      for (let i=0; i<response.artists.length; i++) {
        info.push(new ArtistData(response.artists[i]))
      }
      return info;
    })
   
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-top-tracks/'+encodeURIComponent(artistId)).then((response) => {
      var info=[];
      for (let i=0; i<response.tracks.length; i++) {
        info.push(new TrackData(response.tracks[i]))
      }
      return info;
    })
    
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-albums/'+encodeURIComponent(artistId)).then((response) => {
        var info=[];
        for (let i=0; i<response.items.length; i++) {
          info.push(new AlbumData(response.items[i]))
            
        }
        return info;
    })
    
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress('/album/'+encodeURIComponent(albumId)).then((response) => {
      return new AlbumData(response);
    })
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return this.sendRequestToExpress('/album-tracks/'+encodeURIComponent(albumId)).then((response) => {
       var info=[];
       for (let i=0; i<response.items.length; i++) {
         info.push(new TrackData(response.items[i]));
       }
       return info;
    })
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return this.sendRequestToExpress('/track/'+encodeURIComponent(trackId)).then((response) => {
      return new TrackData(response);
    })
    
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress('/track-audio-features/'+encodeURIComponent(trackId)).then((response) => {
      var info=[];
      info.push(new TrackFeature('danceability',response.danceability))
      info.push(new TrackFeature('energy',response.energy))
      info.push(new TrackFeature('speechiness',response.speechiness))
      info.push(new TrackFeature('acousticness', response.acousticness))
      info.push(new TrackFeature('instrumentalness', response.instrumentalness))
      info.push(new TrackFeature('liveness', response.liveness))
      info.push(new TrackFeature('valence', response.valence))
      return info;
    });
  };
}
