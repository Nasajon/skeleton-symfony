<?php

namespace Nasajon\AppBundle\Controller;

use FOS\RestBundle\Controller\Annotations as FOS;
use Nasajon\LoginBundle\Security\Authorization\Annotation\FuncaoProvisao;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * 
 * @FuncaoProvisao({"USUARIO", "ADMIN"})
 */
class IndexController extends Controller {

  /**
   * @FOS\Get("/{tenant}/globals",  defaults={ "_format" = "json" })
   */
  public function globalsAction(Request $request, $tenant) {
    $response = new \Symfony\Component\HttpFoundation\JsonResponse(array(
        "tenant" => $tenant
    ));
    $response->setCallback('nsj.globals.setGlobals');
    return $response;
  }

  /**
   *
   * @FOS\Get("/{tenant}/{html5mode}")
   */
  public function indexAction(Request $request) {
    return $this->render('@NasajonMDABundle/Resources/js/index.html', []);
  }

}

