node {
     try{
      
        stage('Clean') {
            deleteDir()
        }
    
        stage('Fetch') {
            timeout(time: 60, unit: 'SECONDS') {
                checkout scm
            }
        }

        stage('Config'){
            sh 'touch app/logs/test.log'
            sh 'cp app/config/parameters.yml.dist app/config/parameters.yml'
            sh 'cp common.env.dist common.env'
        }
    
        stage('Composer-dev'){
            sh 'composer install --prefer-dist --optimize-autoloader --no-scripts'
        }
    
        docker.image('node:8.9.3-alpine').inside {
            stage('NodeDeps') {
                sh 'yarn install'
            }
        }
    
        docker.image('nasajon/php-node').inside("-e NODE_ENV=production") {
            stage('MDA') {
                sh 'php vendor/nasajon/mdatransformer/bin/convert nasajon:mda:builder --nocache'
            }
        }
    
        stage('Tests') {
            docker.image('postgres:9.3').withRun('-e "POSTGRES_DB=diretorio" -e "POSTGRES_USER=diretorio"') { c ->
                
                docker.image('postgres:9.3').inside("--link ${c.id}:postgres -e POSTGRES_DB=diretorio -e POSTGRES_USER=diretorio -e PGPASSWORD=mysecretpassword") {
                    sh "bash run_dump $WORKSPACE/database/dump"
                }
                docker.image('nasajon/php:7.1-fpm-symfony-dev').inside("--link ${c.id}:postgres --env-file $WORKSPACE/common.env -e SYMFONY_DEPRECATIONS_HELPER=disabled") {
                    sh 'app/console doctrine:migrations:migrate --no-interaction'
                    sh 'vendor/codeception/codeception/codecept run --no-colors'
                }
            }
    
        }
    
        stage('Metrics'){
    
        }
    
        stage('Composer'){
            sh 'composer install --prefer-dist --optimize-autoloader --no-scripts --no-dev'
        }
    
    
        stage('Docker Ship') {
            def buildName = (env.BRANCH_NAME != 'master') ? "${env.BRANCH_NAME}-${BUILD_NUMBER}" : "${BUILD_NUMBER}"
            sh "sudo docker build --no-cache --rm -t hub.nasajon.com.br/diretoriov2:${buildName} ."
            sh "sudo docker push hub.nasajon.com.br/diretoriov2:${buildName}"
            sh "sudo docker rmi -f hub.nasajon.com.br/diretoriov2:${buildName}"
        }
        
    }
    finally {
        archiveArtifacts artifacts: 'app/logs/test.log', fingerprint: true
    }

}
