import { Component, OnInit } from '@angular/core';
import { Result } from './../../Result';
import { ResultsService } from './../../services/results.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  scores: Result[]= [];

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.resultsService.getScores().subscribe((scores)=>this.scores=scores)
  }

}
