import { makeBindingParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  gesture:string = "";
  searchGenre:any;
  openMenu:boolean = false;
  menuIndex = -1;
  currentPage = 1;
  

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.searchGenre = this.route.snapshot.paramMap.get('id');
    let searchUrl = "https://api.themoviedb.org/3/discover/movie?api_key=c61ab1b5672f616f7e105c31f78241c3&with_genres=" + this.getGenreId();
    fetch(searchUrl).then(res => res.json()).then(data => {
      console.log(data.results);
      let title;
      let imgUrl;
      for (var i = 0; i < data.results.length; ++i)
      {
        title = data.results[i].title;
        imgUrl = "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path;
        (document.getElementById('main') as HTMLElement).innerHTML += 
        "<div class='movie'> <img class='movie-img' src='" + imgUrl + "'alt= '" + title + "' </div> </div>";
      }
    })
  }

  nextPage() {
    if (this.currentPage <= 40) {
      this.currentPage++;
      let searchUrl = "https://api.themoviedb.org/3/discover/movie?api_key=c61ab1b5672f616f7e105c31f78241c3&with_genres=" + this.getGenreId() + "&page=" + this.currentPage;
      fetch(searchUrl).then(res => res.json()).then(data => {
        console.log(data.results);
        let title;
        let imgUrl;
        (document.getElementById('main') as HTMLElement).innerHTML = "";
        for (var i = 0; i < data.results.length; ++i) {
          title = data.results[i].title;
          imgUrl = "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path;
          (document.getElementById('main') as HTMLElement).innerHTML +=
            "<div class='movie'> <img class='movie-img' src='" + imgUrl + "'alt= '" + title + "' </div> </div>";
        }
      })
    }
  }

  prevPage() {
    if (this.currentPage != 1) {
      this.currentPage--;
      let searchUrl = "https://api.themoviedb.org/3/discover/movie?api_key=c61ab1b5672f616f7e105c31f78241c3&with_genres=" + this.getGenreId() + "&page=" + this.currentPage;
      fetch(searchUrl).then(res => res.json()).then(data => {
        console.log(data.results);
        let title;
        let imgUrl;
        (document.getElementById('main') as HTMLElement).innerHTML = "";
        for (var i = 0; i < data.results.length; ++i) {
          title = data.results[i].title;
          imgUrl = "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path;
          (document.getElementById('main') as HTMLElement).innerHTML +=
            "<div class='movie'> <img class='movie-img' src='" + imgUrl + "'alt= '" + title + "' </div> </div>";
        }
      })
    }
  }

  scrollDown()
  {
    window.scrollBy({
      top: 250,
      left: 0,
      behavior: 'smooth'
    });
  }

  scrollUp()
  {
    window.scrollBy({
      top: -250,
      left: 0,
      behavior: 'smooth'
    });
  }

  prediction(event: PredictionEvent) {
    this.gesture = event.getPrediction();
    console.log(this.gesture);
    if (this.gesture == 'Open Hand') {
      (document.getElementById('menu') as HTMLElement).style.width = "300px";
      this.openMenu = true;
    }
    else if (this.gesture == 'Closed Hand') {
      (document.getElementById('menu') as HTMLElement).style.width = "0px";
      this.openMenu = false;
      (document.getElementById('trending') as HTMLElement).focus();
      this.menuIndex = -1;
    }
    else if (this.gesture == 'Pointing Open') {
      this.nextPage();
    }
    else if (this.gesture == 'Pointing Closed') {
      this.prevPage();
    }
    else if (this.gesture == 'Two Closed Hands')
    { 
      this.scrollUp();
    }
    else if (this.gesture == 'Two Hands Pointing')
    { 
      this.scrollDown();
    }
    else if (this.gesture == 'Hand Pointing') {
      if (this.openMenu) {
        this.menuIndex++;
        this.menuIndex = this.menuIndex % 11;
        switch (this.menuIndex) {
          case 0:
            (document.getElementById('trending') as HTMLElement).focus();
            break;
          case 1:
            (document.getElementById('action') as HTMLElement).focus();
            break;
          case 2:
            (document.getElementById('adventure') as HTMLElement).focus();
            break;
          case 3:
            (document.getElementById('animation') as HTMLElement).focus();
            break;
          case 4:
            (document.getElementById('commedy') as HTMLElement).focus();
            break;
          case 5:
            (document.getElementById('drama') as HTMLElement).focus();
            break;
          case 6:
            (document.getElementById('fantasy') as HTMLElement).focus();
            break;
          case 7:
            (document.getElementById('horror') as HTMLElement).focus();
            break;
          case 8:
            (document.getElementById('mystery') as HTMLElement).focus();
            break;
          case 9:
            (document.getElementById('romance') as HTMLElement).focus();
            break;
          case 10:
            (document.getElementById('thriller') as HTMLElement).focus();
            break;
          default:
            (document.getElementById('trending') as HTMLElement).focus();
        }
      }
    }
    else if (this.gesture == 'Two Open Hands') {
      if (this.openMenu) {
        this.menuIndex = this.menuIndex % 11;
        switch (this.menuIndex) {
          case 0:
            window.location.href = "http://localhost:4200/";
            break;
          case 1:
            window.location.href = "http://localhost:4200/search/action";
            break;
          case 2:
            window.location.href = "http://localhost:4200/search/adventure";
            break;
          case 3:
            window.location.href = "http://localhost:4200/search/animation";
            break;
          case 4:
            window.location.href = "http://localhost:4200/search/commedy";
            break;
          case 5:
            window.location.href = "http://localhost:4200/search/drama";
            break;
          case 6:
            window.location.href = "http://localhost:4200/search/fantasy";
            break;
          case 7:
            window.location.href = "http://localhost:4200/search/horror";
            break;
          case 8:
            window.location.href = "http://localhost:4200/search/mystery";
            break;
          case 9:
            window.location.href = "http://localhost:4200/search/romance";
            break;
          case 10:
            window.location.href = "http://localhost:4200/search/thriller";
            break;
          default:
            window.location.href = "http://localhost:4200/";
        }
      }
    }
  }

  getGenreId(): string {
    if (this.searchGenre == 'action') {
      return '28';
    }
    else if (this.searchGenre == 'adventure') {
      return '12';
    }
    else if (this.searchGenre == 'animation') {
      return '16';
    }
    else if (this.searchGenre == 'commedy') {
      return '35';
    }
    else if (this.searchGenre == 'drama') {
      return '18';
    }
    else if (this.searchGenre == 'fantasy') {
      return '14';
    }
    else if (this.searchGenre == 'horror') {
      return '27';
    }
    else if (this.searchGenre == 'mystery') {
      return '9648';
    }
    else if (this.searchGenre == 'romance') {
      return '10749';
    }
    else if (this.searchGenre == 'thriller') {
      return '53';
    }
    else {
      return '0';
    }
  }


}
