<?php

namespace App\Middleware;

class HttpsMiddleware
{
  public function __invoke($request, $response, $next)
  {
    if( $request->getUri()->getScheme() !== 'https' ) {

      return $response->withStatus( 302 )->withHeader( 'Location', 'https://' . $request->getUri()->getHost() . $request->getUri()->getBasePath() . $request->getUri()->getPath() );

    }

    $response = $next($request, $response);
    return $response;
  }
}