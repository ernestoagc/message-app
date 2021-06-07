pipeline {
    agent any
    tools {
        maven 'Maven'
        jdk 'Java'
    }
    environment {
        registry = "880382163732.dkr.ecr.us-east-1.amazonaws.com"
        repository_image="onlock-app"
        container_name="message-app"
    }

    stages {       
        
        stage('Git Clone') {
            steps{
                echo "Build number is ${currentBuild.number}"
                echo "cleaning..."
                cleanWs()
                echo "cloning"
                git branch: 'main', credentialsId: 'GIT_HUB_CREDENTIALS', url: 'https://github.com/ernestoagc/message-app'    
            }
            
        }
        
        
        // Building Docker images
        stage('Building image') {
          steps{
            script {
                sh "pwd"
                echo "Inicia Build" 
                     sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${registry}'
					sh 'docker build -t ${registry}/${repository_image}:${BUILD_NUMBER} .'
          
            }
          }
        }
        
        // Uploading Docker images into AWS ECR
        stage('Pushing to ECR') {
         steps{  
             script {
                      sh '''
                      docker push ${registry}/${repository_image}:${BUILD_NUMBER}
                      '''
             }
            }
        }


        stage('stop previous containers') {
         steps {
            sh 'docker ps -f name=${container_name} -q | xargs --no-run-if-empty docker container stop'
            sh 'docker container ls -a -fname=${container_name} -q | xargs -r docker container rm'
         }
       }

        stage('Docker Run') {
            steps{
                script {
                        sh 'docker run -p 8082:80 -d  --name=${container_name} ${registry}/${repository_image}:${BUILD_NUMBER}'
                    }
            }
        }

        stage ('K8S Deploy') {
            kubernetesDeploy(configs: 'deployment-frontend.yaml',kubeconfigId: 'K8S',enableConfigSubstitution: true)           
        }

    }
}