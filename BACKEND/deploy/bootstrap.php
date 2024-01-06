<?php
	use Doctrine\ORM\Tools\Setup;
	use Doctrine\ORM\EntityManager;
	date_default_timezone_set('America/Lima');
	require_once "vendor/autoload.php";
	$isDevMode = true;
	$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
	$conn = array(
	'host' => 'dpg-cm23hgq1hbls73bu4430-a.frankfurt-postgres.render.com',

	'driver' => 'pdo_pgsql',
	'user' => 'wrkt_db_user',
	'password' => '7QkgP3UmH3KcqAKcoW82FGslW4gusIZt',
	'dbname' => 'wrkt_db',
	'port' => '5432'
	);


	$entityManager = EntityManager::create($conn, $config);



