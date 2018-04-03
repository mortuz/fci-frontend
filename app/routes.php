<?php


$app->get('/', function ($request, $response) {
  return $this->view->render($response, 'home.twig');
})->setName('home');

$app->get('/about', function ($request, $response) {
  return $this->view->render($response, 'about.twig');
})->setName('about');

$app->get('/services', function ($request, $response) {
  return $this->view->render($response, 'services.twig');
})->setName('services');

$app->get('/contact', function ($request, $response) {
  return $this->view->render($response, 'contact.twig');
})->setName('contact');

$app->get('/mutual-fund', function ($request, $response) {
  return $this->view->render($response, 'mutualFund.twig');
})->setName('mutual.fund');

$app->get('/finarc-institution', function ($request, $response) {
  return $this->view->render($response, 'finarc.twig');
})->setName('finarc.institution');

$app->get('/insurance', function ($request, $response) {
  return $this->view->render($response, 'insurance.twig');
})->setName('insurance');