<?php

use Mailgun\Mailgun;

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

// $app->get('/finarc-institution', function ($request, $response) {
//   return $this->view->render($response, 'finarc.twig');
// })->setName('finarc.institution');

$app->get('/insurance', function ($request, $response) {
  return $this->view->render($response, 'insurance.twig');
})->setName('insurance');

$app->post('/send', function ($request, $response, $args) {
    $name = $request->getParam('name');
    $email = $request->getParam('email');
    $phone = $request->getParam('phone');
    $message = $request->getParam('message');

    $data = array(
      'name' => $name,
      'email' => $email,
      'phone' => $phone,
      'message' => $message
    );
    $mg = Mailgun::create('key-9793adf968a4fb57cc6f619b58b98d4c');

    # Now, compose and send your message.
    # $mg->messages()->send($domain, $params);
    $mg->messages()->send('idevia.in', [
      'from'    => "FCI Mailer <no-reply@flipcoininvestment.com>",
      // 'to'      => 'mortuzalam@gmail.com',
      'to'      => 'flipcoininvestments@gmail.com',
      'subject' => 'Website Contact Form',
      'text'    => "Hello FCI, My name is " . $name . " . Contact ph: " . $phone . " & email: " . $email . "I want to say: " . $message
    ]);

    // $arr = array('send' => 'true');
    return $response->withJson($data);
})->setName('send');

$app->post('/subscribe', function ($request, $response, $args) {
  $email = $request->getParam('email');

  $mg = Mailgun::create('key-9793adf968a4fb57cc6f619b58b98d4c');

    # Now, compose and send your message.
    # $mg->messages()->send($domain, $params);
    $mg->messages()->send('idevia.in', [
      'from'    => "FCI Mailer <no-reply@flipcoininvestment.com>",
      // 'to'      => 'mortuzalam@gmail.com',
      'to'      => 'flipcoininvestments@gmail.com',
      'subject' => 'FCI Newsletter subscription',
      'text'    => "Hi FCI, Want to subscribe your news letters. My email address is " . $email
    ]);

  return $response->write($email);
});