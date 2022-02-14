<?php

namespace App\Controller;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as FOS;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class TestController extends AbstractFOSRestController
{
    /**
     * @FOS\Get("/ping/")     
     */
    public function pingAction(Request $request)
    {
        return new JsonResponse(["pong" => true], JsonResponse::HTTP_OK);
    }
}
