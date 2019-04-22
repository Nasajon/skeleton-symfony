<?php

namespace Nasajon\AppBundle\Repository\Ns;

use Nasajon\MDABundle\Repository\AbstractRepository as ParentRepository;

class TenantsRepository extends ParentRepository
{

    public function findOneByCodigo($codigo)
    {
        $sql = " SELECT t0_.codigo, t0_.tenant
                 FROM ns.tenants t0_
                 WHERE t0_.codigo = :codigo";

        $data = $this->getConnection()->executeQuery($sql, [
            'codigo' => $codigo,
        ])->fetch();
        if (!$data) {
            throw new \Doctrine\ORM\NoResultException();
        }

        return $data;
    }

}
