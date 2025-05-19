pipeline {
    agent any

    stages {

        stage('Delete folder if it exists') {
            steps {
                sh '''
                    if [ -d "/var/lib/jenkins/DevOps/" ]; then
                        find "/var/lib/jenkins/DevOps/" -mindepth 1 -delete
                        echo "Contents of /var/lib/jenkins/DevOps/ have been removed."
                    else
                        echo "Directory /var/lib/jenkins/DevOps/ does not exist."
                    fi
                '''
            }
        }

        stage('Fetch code') {
            steps {
                sh 'git clone https://github.com/aliqureshi12/Curruncy-.git /var/lib/jenkins/DevOps/php/'
            }
        }
        
        stage('Clean Previous Containers') {
            steps {
                sh '''
                    docker-compose down || true
                    containers=$(docker ps -q --filter "expose=3001" --filter "publish=3001")
                    if [ ! -z "$containers" ]; then
                        docker rm -f $containers || true
                    fi
                    docker container prune -f || true
                    docker network prune -f || true
                '''
            }
        }

        stage('Rebuild App') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose build'
                sh 'docker-compose up -d'
              }
        }
        stage('Build and Start Docker Compose') {
            steps {
                dir('/var/lib/jenkins/DevOps/php/') {
                    sh 'docker compose -p thereactapp up -d'
                }
            }
        }
    }
}
