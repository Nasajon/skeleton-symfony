<?php

namespace Helper;

// here you can define custom actions
// all public methods declared in helper class will be available in $I

class Functional extends \Codeception\Module {

    public function amSamlLoggedInAs($username) {
        $container = $this->getModule('Symfony')->grabService('kernel')->getContainer();


        $tenant = new \Nasajon\LoginBundle\Entity\Tenant([
            'id' => 47,
            'codigo' => 'gednasajon',
            'nome' => 'Nasajon',
            'sistemas' => [
                [
                    'id' => 278,
                    'codigo' => 'multinotas',
                    'nome' => 'Multinotas',
                    'funcoes' => [
                        [
                            'codigo' => 'admin',
                            'id' => 1,
                            'nome' => 'Admin'
                        ],
                        [
                            'codigo' => 'usuario',
                            'id' => 2,
                            'nome' => 'Usuário'
                        ]
                    ]
                ]
            ]
        ]);
        $user = (new \Nasajon\LoginBundle\Security\User\ContaUser($username, 'Usuário logado.'))
                ->setTenants([$tenant])
                ->addRole('ROLE_TENANTS')
                ->addRole('ROLE_CONTAS')
                ->setSistemaAtual(278, 'provisao');


        $firewall = 'secured_area';

        $token = new \LightSaml\SpBundle\Security\Authentication\Token\SamlSpToken($user->getRoles(), $firewall, [], $user);

        $session = $container->get('session');

        $session->set('main_saml_request_state_', []);
        $session->set('samlsso', new \LightSaml\State\Sso\SsoState());

        $session->set('_security_' . $firewall, serialize($token));
        $session->save();

        $this->getModule('Symfony')->setCookie($session->getName(), $session->getId());
    }

    public function amLoggedInAs($username) {

        $container = $this->getModule('Symfony')->grabService('kernel')->getContainer();

        $token = [
            'tipo' => 'conta',
            'conta' => [
                'nome' => 'Nome',
                'email' => $username,
                'tenants' => [],
                'permissoes' => [
                    'tenants' => true
                ]
            ]
        ];
        $diretorio = \Codeception\Util\Stub::make(\Nasajon\SDK\Diretorio\DiretorioClient::class, ['validateApiKey' => $token]);
        $container->set('nasajon_sdk.diretorio', $diretorio);
    }

    public function amLoggedInAsSistema($sistema) {

        $secret = $this->getModule('Symfony')->grabService('kernel')->getContainer()->getParameter('kernel.secret');

        $token = \JWT::encode([
                    'tipo' => 'sistema',
                    'sistema' => $sistema
                        ], $secret, 'HS256');
        $this->getModule('REST')->haveHttpHeader('apikey', $token);
    }

    public function sendRaw($method, $uri, $parameters, $files, $server, $content) {

        return json_decode($this->getModule('Symfony')->_request($method, $uri, $parameters, $files, $server, $content), true);
    }

}
