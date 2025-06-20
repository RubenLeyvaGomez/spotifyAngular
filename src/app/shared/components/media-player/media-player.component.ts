import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  listObservers$: Array<Subscription>= []
  state:string = 'paused'

  constructor(public multiMediaService: MultimediaService) { }

  ngOnInit(): void {
    // const observe1$: Subscription = this.multiMediaService.callback.subscribe(
    //   (response: TrackModel) => {
    //     console.log('Recibiendo cancion...', response)
    //   }
    // )
    // this.listObservers$ = [observe1$]

    const observe1$ = this.multiMediaService.playerStatus$
    .subscribe(status => this.state = status)

    this.listObservers$ = [observe1$]
  }

  ngOnDestroy():  void{
    this.listObservers$.forEach(u => u.unsubscribe())
  }

  handlePosition(event: MouseEvent):void{
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()
    const clicX = clientX - x
    const percentageFromX = (clicX * 100) / width
    console.log(`Click(x): ${percentageFromX}`);
    this.multiMediaService.seekAudio(percentageFromX)

    
  }

}
