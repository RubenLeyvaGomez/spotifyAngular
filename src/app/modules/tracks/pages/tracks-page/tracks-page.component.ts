import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '../../services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []

  listObservers$: Array<Subscription> = []

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    // const {data}: any = (dataRaw as any).default
    // this.mockTracksList = data

    this.loadDataAll()
    this.loadDataRandom()
  }

  async loadDataAll(): Promise<any>{
    this.tracksTrending = await this.trackService.getAllTracks$().toPromise()
    this.tracksRandom = await this.trackService.getAllRandom$().toPromise()
    
    // .subscribe((response:TrackModel[] )=> [
    //   this.tracksTrending = response 
    // ])
  }

  loadDataRandom(): void{
    // this.trackService.getAllRandom$().subscribe((response:TrackModel[] )=> [
    //   this.tracksRandom = response 
    // ], err =>{
    //   console.log('error de conexion')
    // })
  }

  ngOnDestroy(): void {
   
  }

}
