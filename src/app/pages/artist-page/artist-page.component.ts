import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];
  back: string='carouselSecondInterval';
  start: string='carouselThirdInterval';


  

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    this.spotify.getArtist(this.artistId).then((data) => {
      this.artist=data;
    })

    this.spotify.getTopTracksForArtist(this.artistId).then((response) => {
      var tp=[];
      response.forEach((data) => {
        tp.push(data);
      })
      this.topTracks=tp;
    })

    this.spotify.getAlbumsForArtist(this.artistId).then((response) => {
      var albumInfo=[];
      response.forEach((data) => {
        albumInfo.push(data)
      })
      this.albums=albumInfo;
    })

    this.spotify.getRelatedArtists(this.artistId).then((response) => {
      var singer=[];
      response.forEach((data) => {
        singer.push(data)
      })
      this.relatedArtists=singer;
    })

  }

}