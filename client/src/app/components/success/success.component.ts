import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultsService } from './../../services/results.service'
import { Result } from './../../Result';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  scores: Result[]= [];
  score: Result = {
    name: '',
    timeToComplete: 0,
    attempts: 0,
    finalScore: 0,
  }

  playerName: string = '';
  resultNumber: string = '';
  timeComplete: number = 0;
  attempts: number = 0;

  constructor(private resultsService: ResultsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSuccessDetails();

     this.score = {
      name: this.playerName,
      attempts: this.attempts,
      timeToComplete: this.timeComplete,
      finalScore: 0,
    }
    this.resultsService.saveScores(this.score).subscribe(score=>this.scores.push(score));
    
  }

  getSuccessDetails(): void {
    this.playerName = String(this.route.snapshot.paramMap.get('player-name'));
    this.resultNumber = String(this.route.snapshot.paramMap.get('result'));
    this.timeComplete = Number(this.route.snapshot.paramMap.get('complete-time'));
    this.attempts = Number(this.route.snapshot.paramMap.get('guesses'));
  }

  
}
