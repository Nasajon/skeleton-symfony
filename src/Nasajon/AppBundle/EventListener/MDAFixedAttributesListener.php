<?php

namespace Nasajon\AppBundle\EventListener;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBag;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 *
 * @author rodrigodirk
 *
 */
class MDAFixedAttributesListener {

    /**
     *
     * @var TokenStorageInterface 
     */
    private $tokenStorage;
    private $fixedAttributes;

    public function __construct(TokenStorageInterface $tokenStorage, ParameterBag $fixedAttributes) {
        $this->tokenStorage = $tokenStorage;
        $this->fixedAttributes = $fixedAttributes;
    }

    public function onKernelController(FilterControllerEvent $event) {
        if (!is_array($event->getController())) {
            return;
        }

        $controller = $event->getController()[0];

        if ($controller instanceof \Symfony\Bundle\WebProfilerBundle\Controller\ExceptionController || $controller instanceof \FOS\RestBundle\Controller\ExceptionController || $controller instanceof \Symfony\Bundle\TwigBundle\Controller\ExceptionController) {
            return;
        }
        if ($this->tokenStorage->getToken() && !($this->tokenStorage->getToken() instanceof \Symfony\Component\Security\Core\Authentication\Token\AnonymousToken)) {
            if ($this->tokenStorage->getToken()->getUser() instanceof \Nasajon\LoginBundle\Security\User\ContaUser) {
                $logged_user = [
                    "nome" => $this->tokenStorage->getToken()->getUser()->getNome(),
                    "email" => $this->tokenStorage->getToken()->getUser()->getUsername()
                ];
                $this->fixedAttributes->set('logged_user', $logged_user);
            }
        }
    }

}
