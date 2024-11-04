import { Injectable } from '@angular/core';
import { Artist } from '../interfaces/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private artists: Artist[] = [];

  constructor() {

  let artist1: Artist = {
    id: 1,
    name: "Roxy Dekker",
    genre: "Pop",
    biography: "Roxy Dekker is dé rising star in Nederland. Na tweede te zijn geworden op het Junior Songfesival in 2019, brengt de jonge popsensatie hit na hit uit. Haar single 'Anne-Fleur Vakantie' kwam uit in mei 2023 en groeide al snel uit tot een van dé zomerhits met binnen vier maanden een gouden plaat. Haar volgende track 'Satisfyer', die in november 2023 uitkwam, heeft de maanden erna de Nederlandse Spotify Top 10 amper verlaten. En jawel, ook voor deze hit een gouden en platina plaat.",
    imageUrl: "https://i.scdn.co/image/ab6761610000e5ebf153334656b20d5a5b1ad052",
    spotifyId: "",
  };

  let artist2: Artist = {
    id: 2,
    name: "De Bankzitters",
    genre: "Drinken",
    biography: "De Bankzitters (Koen, Raoul, Milo, Matthy en Robbie) staan ook wel bekend als de 5 heetste mannen van Nederland. Ze zijn in 2019 overgewaaid van YouTube naar de muziekwereld. Een feestje bouwen kunnen ze als geen ander, en ze doen ook nog eens een poging tot zingen!",
    imageUrl: "https://i.scdn.co/image/ab6761610000e5eb2acf5d62bb94da819d0719f4",
    spotifyId: "",
  };

  let artist3: Artist = {
    id: 3,
    name: "Katastroof",
    genre: "Zoe 'et zelf ne keer ut",
    biography: "De Antwerpse folkgroep Katastroof is al 45 jaar het marginaalste dat de Vlaamse showbizz te bieden heeft. Een obscure groep die toch iedereen kent. Hun hits worden door jong en oud meegezongen, hoewel ze van de radio worden geweerd. Ze brachten bijna 30 albums uit vol protestsongs, drinkliederen, ondeugende meezingers en zelfs serieuze ballades.",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b27372fb7ede43f4c01df45ead26",
    spotifyId: "",
  };

  let artist4: Artist = {
    id: 4,
    name: "K3",
    genre: "Pop",
    biography: "Na een nagelbijtend spannende finale van ‘K2 zoekt K3’ op 27 november is K3 weer compleet. Hanne, Marthe en Julia blijven doen waar K3 goed in is: mensen gelukkig maken, met blije, pakkende liedjes. Naast muziek, houden de K'tjes zich ook bezig met het maken van musicals, televisieprogramma's en bioscoopfilms rond hun liedjes en boeiende leven!",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b273631631e40ff9c8441898080c",
    spotifyId: "",
  };

  let artist5: Artist = {
    id: 5,
    name: "Piet Piraat",
    genre: "Pompoenen",
    biography: "Alle zeilen nog aan toe.",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b273c498e859c1958303ef208f53",
    spotifyId: "",
  };

  let artist6: Artist = {
    id: 6,
    name: "Acid",
    genre: "Pop",
    biography: "Nathan Vandergunst (also known as Acid & Acid2) is a Belgian Internet Sensation. He loves his mom very much. He is a sweet boy in a big mean world, mainly misunderstood. ALL THE LOVE, ALL THE POWER!",
    imageUrl: "https://i.scdn.co/image/ab6761610000e5eb1aad24d326afc626fd017688",
    spotifyId: "",
  };

  this.artists.push(artist1);
  this.artists.push(artist2);
  this.artists.push(artist3);
  this.artists.push(artist4);
  this.artists.push(artist5);
  this.artists.push(artist6);

}
  getArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: number) : Artist | null {
    return this.artists.find(a=>a.id === id) ?? null; //find = JavaScript method on arrays!
  }

}
