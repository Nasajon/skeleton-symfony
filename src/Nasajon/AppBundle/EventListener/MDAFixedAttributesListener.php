<?php

namespace Nasajon\AppBundle\EventListener;

use Nasajon\AppBundle\Repository\Ns\TenantsRepository;
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
    private $tenantRepository;

    public function __construct(TokenStorageInterface $tokenStorage, ParameterBag $fixedAttributes, TenantsRepository $tenantRepository) {
        $this->tokenStorage = $tokenStorage;
        $this->fixedAttributes = $fixedAttributes;
        $this->tenantRepository = $tenantRepository;
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

        $request = $event->getRequest();
        $codigoTenant = $request->get('tenant');
        
        if (!empty($codigoTenant)) {

            try {

                $tenant = $this->tenantRepository->findOneByCodigo($codigoTenant);

                $this->fixedAttributes->set('tenant', $tenant['tenant']);
                $this->fixedAttributes->set('tenant_codigo', $codigoTenant);

            } catch (\Doctrine\ORM\NoResultException $e) {
                throw new \Exception(sprintf("Tenant  '%s' não encontrado.", $codigoTenant));
            }
        }
    }

}
