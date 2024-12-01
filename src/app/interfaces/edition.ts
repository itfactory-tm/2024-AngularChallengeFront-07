export interface Edition {
    editieId: string;
    editieNaam: string;
    adres: string;
    postcode: string;
    gemeente: string;
    telNr: string;
    email: string;
    jaar: number;
    ticketCount: number;
    artiestNamen: string[];
    fotos: string[];
    artikelNamen: string[]; 
    sponsorNamen: string[]; 
    foodtruckNamen: string[]; 
}