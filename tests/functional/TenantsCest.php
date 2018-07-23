<?php

use Codeception\Util\HttpCode;

class TenantsCest {

    public function _before(FunctionalTester $I) {
        $I->amSamlLoggedInAs('colaborador@empresa.com.br');
    }

    public function apiInserirTenant(FunctionalTester $I) {
        $tenant = [
            "codigo" =>  123456,
            "cliente" =>  [
                "cliente" =>  "424a6633-c89f-4179-8f32-1d58775a4d40"
            ],
            "nome" =>  "Tenant de teste",
            "logo" =>  "",
            "sistemas" =>  [
                [
                    "sistema" =>  [
                        "sistema" =>  4
                    ]
                ],
                [
                    "sistema" =>  [
                        "sistema" =>  6
                    ]
                ]
            ],
            "contas" =>  [
                [
                    "email" =>  "marcosaugustso@nasajon.com.br",
                    "situacao" =>  1,
                    "admin" =>  true,
                    "provisoes" =>  [
                        [
                            "funcao" =>  103
                        ],
                        [
                            "funcao" =>  104
                        ]
                    ]
                ]
            ]
        ];
        $I->sendRaw('POST', '/private/tenants/', $tenant, [], [], null);

        $I->seeResponseCodeIs(HttpCode::CREATED);
        $I->seeResponseMatchesJsonType([
            'tenant_id' => 'integer|!empty',
            'nome' => 'string|!empty',
            'codigo' => 'string|!empty',
            'logo' => 'string|null',
            'cliente' => [
                'cliente' => 'string|!empty',
                'nomefantasia' => 'string|!empty',
                'codigo' => 'string|!empty',
                'cnpj' => 'string|!empty',
            ]
        ]);
    }
}
