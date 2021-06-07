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

         stage ('Kubectl version') {
            steps{
                script {                    
                    sh "kubectl version"    
                }
            }
        }

        stage ('K8S Deploy') {
            steps{
                script {                    
                    kubernetesDeploy(configs: 'deployment-frontend.yaml',kubeconfigId: 'K8S',enableConfigSubstitution: true)           
                }
            }
        }

    }
}