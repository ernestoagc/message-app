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
      

        stage ('K8S Deploy') {
          steps{
                script {     
                    sh "pwd"
                   sh "whoami" 
                    echo "Updating image version in deployment file"
                    sh "chmod +x changeTag.sh" 
                    sh "./changeTag.sh ${BUILD_NUMBER}" 
                }
                
                sshagent(['k8s-ubuntu']) {
                    sh "scp -oStrictHostKeyChecking=no deployment-frontend.yaml ubuntu@12.0.133.16:/home/ubuntu/"
                    echo "ejecuto bien remoto"
                    sh "ssh ubuntu@12.0.133.16 pwd"
                    sh "ssh ubuntu@12.0.133.16 kubectl apply -f deployment-frontend.yaml"
                }
            }
        }

    }
}