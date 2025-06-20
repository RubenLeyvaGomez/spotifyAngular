import { Injectable, EventEmitter } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  
  callback: EventEmitter<any> = new EventEmitter<any>()


  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement
  public timeElapse$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemainin$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)
  

  constructor() { 
    this.audio = new Audio()
    this.trackInfo$.subscribe(responseOk =>{

      if(responseOk){
        this.setAudio(responseOk)
      }

    })

    this.listenAllEvents();
  }

  private listenAllEvents(): void{
    console.log('Escuchando evento de tiempo');
    this.audio.addEventListener('timeupdate', this.calculateTime , false)
    this.audio.addEventListener('playing', this.setPlayerStatus , false)
    this.audio.addEventListener('play', this.setPlayerStatus , false)
    this.audio.addEventListener('pause', this.setPlayerStatus , false)
    this.audio.addEventListener('endend', this.setPlayerStatus , false)


  }

  private setPlayerStatus = (state: any) => {
    // console.log('Holaa', state);
    switch(state.type){
      case 'play':
        this.playerStatus$.next('play')
        break;

      case 'playing': 
        this.playerStatus$.next('playing')
        break;

      case 'ended':
        this.playerStatus$.next('ended')
        break;

      default:
        this.playerStatus$.next('paused')
        break;
    }
  }



  private calculateTime = () =>{
    // console.log('reproduciendo cancion')
    const {duration , currentTime} = this.audio

    // console.log('La duracion es ',[duration, currentTime])

    this.setTimeElapse(currentTime)
    this.setTimeRemainin(currentTime, duration)
    this.setPercentage(currentTime, duration)

  }

  private setPercentage(currentTime:number, duration: number ): void{
    let percentage = (currentTime * 100) / duration;

    this.playerPercentage$.next(percentage)
  } 

  private setTimeElapse(currentTime: number):void{
    let seconds = Math.floor(currentTime % 60 )
    let minutes = Math.floor((currentTime /60) %60)

    const displaySeconds = (seconds < 10 )? `0${seconds}` : seconds; 
    const displayMinutes = (minutes < 10 )? `0${minutes}` : minutes; 

    const displayFormat = `${displayMinutes}:${displaySeconds}`

    this.timeElapse$.next(displayFormat)

  }

  private setTimeRemainin(currentTime:number, duration: number ): void{
    let timeleft = duration - currentTime;

    let seconds = Math.floor(timeleft % 60 )
    let minutes = Math.floor((timeleft /60) %60)

    const displaySeconds = (seconds < 10 )? `0${seconds}` : seconds; 
    const displayMinutes = (minutes < 10 )? `0${minutes}` : minutes; 

    const displayFormat = `-${displayMinutes}:${displaySeconds}`

    this.timeRemainin$.next(displayFormat)
  }

  public setAudio(track:TrackModel): void{
    // console.log('La cancion es ', track)

    this.audio.src = track.url
    this.audio.play()
  }

  public togglePlayer():void{
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }

  public seekAudio(percentage: number): void{
    const{duration} = this.audio
    const percentageToSecond = (percentage * duration) / 100
    this.audio.currentTime = percentageToSecond
  }
}
