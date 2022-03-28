import { Component, OnInit } from '@angular/core';
import {NgToastService} from 'ng-angular-popup';
import {ActivatedRoute, Router} from '@angular/router'

import * as moment from 'moment';

@Component({
  selector: 'app-guess-area',
  templateUrl: './guess-area.component.html',
  styleUrls: ['./guess-area.component.css']
})
export class GuessAreaComponent implements OnInit {
  playerName: string = 'Walter';
  startingTime: number = 0;
  completeTime: number = 0;
  targetNumber: string = '';
  guessedNumber: string = '';
  guesses: number = 0;
  result: string = '';
  results: any[] = [];

  constructor(private toast: NgToastService, private route: ActivatedRoute, private router: Router) {

   }

  ngOnInit(): void {
    this.getPlayerName();
    this.startingTime = new Date().getTime();
    this.targetNumber=this.generateNumber(4);
  }
  
  getPlayerName(): void {
    this.playerName = String(this.route.snapshot.paramMap.get('player-name'));
  }

  generateNumber(len: number) {
    let randomNumber = '';
    let digit,
      count = 0;
  
    do {
      digit = Math.floor(Math.random() * 10).toString();
      if (!randomNumber.includes(digit)) {
        randomNumber = randomNumber + digit;
        count++;
      }
    } while (count < len);
    return randomNumber;
  }

  onSubmit(){
    const numberRegX = new RegExp('^[0-9]*$');
    console.log(this.targetNumber);
    if (!numberRegX.test(this.guessedNumber)) {
      this.toast.error({detail: "Not a Number!", summary:"Please input only digits!", duration: 3500})
    } 
    else {
      if (!this.hasUniqueDigits(this.guessedNumber)){
        this.toast.error({detail: "Bad Number!", summary:"Your number should contain four unique digits!", duration: 3500})
      } else {
        this.checkNumber(this.guessedNumber,this.targetNumber);
      }
    }
  }

   hasUniqueDigits(num: string) {
    return new Set(num).size == num.length;
  }

  checkNumber(guess: string, target: string){
    this.result='';
    this.guessedNumber = '';
    if (guess === target) {
      this.results = [];
      this.completeTime = new Date().getTime();
      const timeToFinish = this.completeTime - this.startingTime;
      console.log(`You got the right number! it took you ${timeToFinish} seconds.`);
      this.router.navigateByUrl(`/success/${this.playerName}/${guess}/${timeToFinish}/${this.guesses}`);
    } else {
      for (let index = 0; index < guess.length; index++) {
        if (guess.includes(target[index])) {
          if (guess[index] === target[index]) {
            this.result =  this.result + '+';
          } else {
            this.result =  this.result + '-';
          }
        }
      }
      this.guesses++;
      this.results.push({attempt: guess, result: this.result})
      console.log(this.results);
    }
  }
}
