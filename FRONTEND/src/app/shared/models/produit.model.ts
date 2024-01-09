export class Produit {
    id: number;
    nom: string;
    description: string;
    prix: number;
    categorie: string;

    constructor(id: number, nom: string, description: string, prix: number, categorie: string) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.categorie = categorie;
    }
}
