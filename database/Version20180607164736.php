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
        $this->addSql('CREATE TYPE diretorio.trecibo AS (mensagem json); ');
        $this->addSql('ALTER TYPE diretorio.trecibo OWNER TO diretorio_group;');



        $this->addSql(<<<'EOT'
            CREATE OR REPLACE FUNCTION diretorio.api_montamensagemerro(a_mensagem text)
            RETURNS json AS
            $BODY$
              DECLARE VAR_TIPO VARCHAR;
              DECLARE VAR_MENSGEM VARCHAR;
            BEGIN          
              IF STRPOS(A_MENSAGEM, '#') > 0 THEN
                  VAR_TIPO = COALESCE(SUBSTRING(a_mensagem from 1 for strpos(a_mensagem, '#')-1), '');
                  VAR_MENSGEM = SUBSTRING(a_mensagem from strpos(a_mensagem, '#')+1 for LENGTH(a_mensagem));	
              ELSE
                  VAR_TIPO = '';
                  VAR_MENSGEM = A_MENSAGEM;
              END IF;
              RETURN ('{"codigo" : "ERRO", "tipo" : "'|| VAR_TIPO ||'", "mensagem" : "' || REPLACE(COALESCE(VAR_MENSGEM, ''), '"', '"') || '"}' )::JSON; 
            END;
            $BODY$
            LANGUAGE plpgsql VOLATILE
            COST 100;
EOT
        );

        $this->addSql(<<<'EOT'
        CREATE OR REPLACE FUNCTION diretorio.api_montamensagemok(a_mensagem text)
        RETURNS json AS
            $BODY$
            BEGIN
                RETURN ('{"codigo" : "OK", "mensagem" : "' || COALESCE(a_mensagem, '') || '", "tipo": ""}' )::JSON;
            END;
            $BODY$
        LANGUAGE plpgsql VOLATILE
        COST 100;
EOT
        );

        $this->addSql('ALTER FUNCTION         diretorio.api_montamensagemerro(a_mensagem text) OWNER TO diretorio_group;');
    }

    public function down(Schema $schema): void {
        // this down() migration is auto-generated, please modify it to your needs
    }

}
