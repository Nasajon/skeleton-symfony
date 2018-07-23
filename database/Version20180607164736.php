<?php

declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180607164736 extends AbstractMigration {

    public function up(Schema $schema): void {
        $this->addSql('CREATE SCHEMA diretorio; ');
        $this->addSql(
                <<<'EOT'
           CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
EOT
        );
        $this->addSql("
      CREATE TABLE diretorio.tenants
      (
        tenant bigint NOT NULL,
        codigo character varying,
        nome character varying,
        logo character varying,
        CONSTRAINT tenants_pkey PRIMARY KEY (tenant)
      )
      WITH (
        OIDS=FALSE
      );
      ");
        $this->addSql("CREATE TABLE id_entry
          (
           entity_id character varying(255) NOT NULL,
           id character varying(255) NOT NULL,
           expiry_timestamp integer NOT NULL,
           CONSTRAINT id_entry_pkey PRIMARY KEY (entity_id, id)
          )
          WITH (
           OIDS=FALSE
          )"
        );
    }

    public function down(Schema $schema): void {
        // this down() migration is auto-generated, please modify it to your needs
    }

}
