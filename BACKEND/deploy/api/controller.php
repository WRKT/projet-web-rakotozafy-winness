<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

function optionsCatalogue(Request $request, Response $response, $args)
{

	// Evite que le front demande une confirmation à chaque modification
	$response = $response->withHeader("Access-Control-Max-Age", 600);

	return addHeaders($response);
}

function hello(Request $request, Response $response, $args)
{
	$array = [];
	$array["nom"] = $args['name'];
	$response->getBody()->write(json_encode($array));
	return $response;
}

function getSearchCatalogue(Request $request, Response $response, $args)
{
    global $entityManager;

    $payload = getJWTToken($request);
    $login  = $payload->userid;

    $queryParams = $request->getQueryParams();

    $nom = $queryParams['nom'] ?? null;
    $description = $queryParams['description'] ?? null;
    $categorie = $queryParams['categorie'] ?? null;

    $produitRepository = $entityManager->getRepository(Produits::class);

    $criteria = [];

    if ($nom !== null) {
        $criteria['nom'] = $nom;
    }

    if ($description !== null) {
        $criteria['description'] = $description;
    }

    if ($categorie !== null) {
        $criteria['categorie'] = $categorie;
    }

    $produits = $produitRepository->findBy($criteria);

    if ($produits) {
        $data = array();
        foreach ($produits as $produit) {
            $data[] = array(
                'id' => $produit->getId(),
                'nom' => $produit->getNom(),
                'description' => $produit->getDescription(),
                'prix' => $produit->getPrix(),
                'categorie' => $produit->getCategorie()
            );
        }

        $response = addHeaders($response);
        $response = createJwT($response);
        $response->getBody()->write(json_encode($data));
    } else {
        $response = $response->withStatus(404);
    }

    return addHeaders($response);
}


// API Nécessitant un Jwt valide
function getCatalogue(Request $request, Response $response, $args)
{
	global $entityManager;

	$payload = getJWTToken($request);
	$login  = $payload->userid;

	$produitRepository = $entityManager->getRepository('Produits');
	$produits = $produitRepository->findAll();
	if ($produits) {
		$data = array();
		foreach ($produits as $produit) {
			$data[] = array(
				'id' => $produit->getId(),
				'nom' => $produit->getNom(),
				'description' => $produit->getDescription(),
				'prix' => $produit->getPrix(),
				'categorie' => $produit->getCategorie()
			);
		}
		$response = addHeaders($response);
		$response = createJwT($response);
		$response->getBody()->write(json_encode($data));
	} else {
		$response = $response->withStatus(404);
	}

	return addHeaders($response);
}

function optionsUtilisateur(Request $request, Response $response, $args)
{
	// Evite que le front demande une confirmation à chaque modification
	$response = $response->withHeader("Access-Control-Max-Age", 600);
	return addHeaders($response);
}

// API Nécessitant un Jwt valide
function getUtilisateur(Request $request, Response $response, $args)
{
	global $entityManager;

	$payload = getJWTToken($request);
	$login  = $payload->userid;

	$utilisateurRepository = $entityManager->getRepository('Utilisateurs');
	$utilisateur = $utilisateurRepository->findOneBy(array('login' => $login));
	if ($utilisateur) {
		$data = array('nom' => $utilisateur->getNom(), 'prenom' => $utilisateur->getPrenom());
		$response = addHeaders($response);
		$response = createJwT($response);
		$response->getBody()->write(json_encode($data));
	} else {
		$response = $response->withStatus(404);
	}

	return addHeaders($response);
}

// API qui nécéssite pas de JwT
function creerUtilisateur(Request $request, Response $response, $args)
{
    global $entityManager;

    $error = false;
    $requestBody = $request->getBody();
    $body = json_decode($requestBody, true);

    $nom = $body['nom'] ?? "";
    $prenom = $body['prenom'] ?? "";
    $adresse = $body['adresse'] ?? "";
    $codepostal = $body['codepostal'] ?? "";
    $ville = $body['ville'] ?? "";
    $email = $body['email'] ?? "";
    $sexe = $body['sexe'] ?? "";
    $login = $body['login'] ?? "";
    $password = $body['password'] ?? "";
    $telephone = $body['telephone'] ?? "";

	// Hachage du mot de passe !!
	$password = password_hash($password, PASSWORD_BCRYPT);

    if (empty($nom) || empty($prenom) || empty($login) || empty($password)) {
        $error = true;
    }

    if (!$error) {
        $utilisateur = new Utilisateurs();
        $utilisateur->setNom($nom);
        $utilisateur->setPrenom($prenom);
        $utilisateur->setAdresse($adresse);
        $utilisateur->setCodepostal($codepostal);
        $utilisateur->setVille($ville);
        $utilisateur->setEmail($email);
        $utilisateur->setSexe($sexe);
        $utilisateur->setLogin($login);
        $utilisateur->setPassword($password);
		$utilisateur->setTelephone($telephone);

        $entityManager->persist($utilisateur);
        $entityManager->flush();

        $response = addHeaders($response);
        $data = array(
            'nom' => $utilisateur->getNom(),
            'prenom' => $utilisateur->getPrenom(),
            'adresse' => $utilisateur->getAdresse(),
            'codepostal' => $utilisateur->getCodepostal(),
            'ville' => $utilisateur->getVille(),
            'email' => $utilisateur->getEmail(),
            'sexe' => $utilisateur->getSexe(),
            'login' => $utilisateur->getLogin(),
			'password' => $utilisateur->getPassword(),
            'telephone' => $utilisateur->getTelephone()
        );
        $response->getBody()->write(json_encode($data));
    } else {
        $response = $response->withStatus(500);
    }

    return $response;
}


// APi d'authentification générant un JWT
function postLogin(Request $request, Response $response, $args)
{
    global $entityManager;
    $error = false;
    $body = $request->getParsedBody();
    $login = $body['login'] ?? "";
    $password = $body['password'] ?? "";

    if (!preg_match("/[a-zA-Z0-9]{1,20}/", $login)) {
        $error = true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,20}/", $password)) {
        $error = true;
    }

    if (!$error) {
        $utilisateurRepository = $entityManager->getRepository('Utilisateurs');
        $utilisateur = $utilisateurRepository->findOneBy(array('login' => $login));

        if ($utilisateur && password_verify($password, $utilisateur->getPassword())) {
            $response = addHeaders($response);
            $response = createJwT($response);
            $data = array('nom' => $utilisateur->getNom(), 'prenom' => $utilisateur->getPrenom());
            $response->getBody()->write(json_encode($data));
        } else {
            $response = $response->withStatus(403);
        }
    } else {
        $response = $response->withStatus(500);
    }

    return addHeaders($response);
}


