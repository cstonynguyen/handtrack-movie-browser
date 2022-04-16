import { Component, OnInit } from '@angular/core';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  gesture: String = "";
  openMenu: boolean = false;
  menuIndex = -1;
  currentPage = 1;

  constructor() { }

  ngOnInit(): void {
    let searchUrl = "https://api.themoviedb.org/3/trending/movie/week?api_key=c61ab1b5672f616f7e105c31f78241c3";
    fetch(searchUrl).then(res => res.json()).then(data => {
      console.log(data.results);
      let title;
      let imgUrl;
      let voteAvg;
      for (var i = 0; i < data.results.length; ++i)
      {
        title = data.results[i].title;
        imgUrl = "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path;
        voteAvg = data.results[i].vote_average;
        (document.getElementById('main') as HTMLElement).innerHTML +=
        "<div class='movie'> " +
          "<img class ='movie-img' src ='" + imgUrl +"' alt= '" + title + "'>" +
          "<div class ='movie-info'> <h3>" + title + "</h3>" +
        "<span class = 'rating'>" + voteAvg + "</span> </div> </div>";
      }
    })
  }

  nextPage() {
    if (this.currentPage <= 40) {
      this.currentPage++;
      let searchUrl = "https://api.themoviedb.org/3/trending/movie/week?api_key=c61ab1b5672f616f7e105c31f78241c3" + "&page=" + this.currentPage;
      fetch(searchUrl).then(res => res.json()).then(data => {
        console.log(data.results);
        let title;
        let imgUrl;
        let voteAvg;
        (document.getElementById('main') as HTMLElement).innerHTML = "";
        for (var i = 0; i < data.results.length; ++i) {
          title = data.results[i].title;
          imgUrl = "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path;
          voteAvg = data.results[i].vote_average;
          (document.getElementById('main') as HTMLElement).innerHTML +=
            "<div class='movie'> " +
            "<img class ='movie-img' src ='" + imgUrl +"' alt= '" + title + "'>" +
            "<div class ='movie-info'> <h3>" + title + "</h3>" +
            "<span class = 'rating'>" + voteAvg + "</span> </div> </div>";
        }
      })
    }
  }

  prevPage() {
    if (this.currentPage != 1) {
      this.currentPage--;
      let searchUrl = "https://api.themoviedb.org/3/trending/movie/week?api_key=c61ab1b5672f616f7e105c31f78241c3" + "&page=" + this.currentPage;
      fetch(searchUrl).then(res => res.json()).then(data => {
        console.log(data.results);
        let title;
        let imgUrl;
        let voteAvg;
        (document.getElementById('main') as HTMLElement).innerHTML = "";
        for (var i = 0; i < data.results.length; ++i) {
          title = data.results[i].title;
          imgUrl = "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path;
          voteAvg = data.results[i].vote_average;
          (document.getElementById('main') as HTMLElement).innerHTML +=
          "<div class='movie'> " +
          "<img class ='movie-img' src ='" + imgUrl +"' alt= '" + title + "'>" +
          "<div class ='movie-info'> <h3>" + title + "</h3>" +
          "<span class = 'rating'>" + voteAvg + "</span> </div> </div>";
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
            window.location.href = "";
            break;
          case 1:
            window.location.href = "search/action";
            break;
          case 2:
            window.location.href = "search/adventure";
            break;
          case 3:
            window.location.href = "search/animation";
            break;
          case 4:
            window.location.href = "search/commedy";
            break;
          case 5:
            window.location.href = "search/drama";
            break;
          case 6:
            window.location.href = "search/fantasy";
            break;
          case 7:
            window.location.href = "search/horror";
            break;
          case 8:
            window.location.href = "search/mystery";
            break;
          case 9:
            window.location.href = "search/romance";
            break;
          case 10:
            window.location.href = "search/thriller";
            break;
          default:
            window.location.href = "";
        }
      }
    }
  }

}


