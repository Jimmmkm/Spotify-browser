import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];
  bool: boolean;
  slide: string='carouselInterval'
  track: boolean;
  trackList: TrackData[];

  constructor(private spotifyService:SpotifyService) {
    
  }

  ngOnInit() {
}

  search() {
    //TODO: call search function in spotifyService and parse response
    if (this.searchString!=null && this.searchString.length==0) {
      this.bool=false;
      this.track=false;
      return;
    }
    if (this.searchCategory=='artist' || this.searchCategory=='album') {
      this.bool=true;
      this.track=false;
    } else {
      this.bool=false;
      this.track=true;
    }

    if (this.searchCategory=='artist' || this.searchCategory=='album') {
      this.spotifyService.searchFor(this.searchCategory, this.searchString).then((response) => {
        this.resources=response;
        if (this.resources.length==0 || this.searchString==null) {
          this.bool=false;
          this.resources=[];
          return;
        }
      })
    } else {
      this.spotifyService.searchFor(this.searchCategory, this.searchString).then((response) => {
        var trackInfo=[]
        this.resources=response;
        if (this.resources.length==0 || this.searchString==null) {
          this.track=false;
          this.resources=[];
          return;
        }
        else {
          response.forEach((d) => {
            trackInfo.push(d)
          })
          this.trackList=trackInfo;
          return;
        }
      })
    }
  }

  changeContent() {
    this.searchString = document.querySelector('input').value;
    
  }

  changeType() {
    this.searchCategory=document.querySelector('select').value;
  }

}
