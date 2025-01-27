<?php

use SensuDashboard\Controller\CheckResultsController;
use SensuDashboard\Controller\MockSensuClientsApiController;
use SensuDashboard\Controller\MockSensuResultsApiController;
use SensuDashboard\Service\SensuApiService;
use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/', function (Request $request, Response $response, array $args) use ($container) {
        $body = $container->get(SensuApiService::class)->getCheckResults();

        // Render index view
        return $container->get('renderer')->render($response, 'index.phtml', ['body' => $body]);
    });

    $app->get('/checkResults', CheckResultsController::class . ':getCheckResults');
    $app->get('/mock-sensu-api/results', MockSensuResultsApiController::class . ':getCheckResults');
    $app->get('/mock-sensu-api/clients', MockSensuClientsApiController::class . ':getClients');
};
