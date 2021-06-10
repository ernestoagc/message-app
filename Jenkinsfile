pipeline {
    agent any
    tools {
        maven 'Maven'
        jdk 'Java'
    }
    environment {
        ecr_registry = "880382163732.dkr.ecr.us-east-1.amazonaws.com"
		ecr_cred ="us-east-1:ecr-jenkins"
		k8s_host_remote ="ubuntu@12.0.133.16"
        repository_image="onlock-app"
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
        
        
        
        // Uploading Docker images into AWS ECR
         stage('Pushing to ECR') {
         steps{  
             script {
						docker.withRegistry(
						"https://${ecr_registry}/${repository_image}",
						"ecr:${ecr_cred}"){
						def myImage = docker.build("${repository_image}")
        				   myImage.push("${BUILD_NUMBER}")
						}
             }
            }
        }
      

        stage ('K8S Deploy') {
          steps{

                def application_image =  "${ecr_registry}/${repository_image}:${BUILD_NUMBER}"
                
                script {    
                    echo "application_image" 
                    echo "${application_image}" 
                    sh "pwd"
                   sh "whoami" 
                    echo "Updating image version in deployment file"
                    sh "chmod +x changeTag.sh" 
                    sh "./changeTag.sh ${application_image}" 
                }
                
                sshagent(['k8s-ubuntu']) {
                    sh "scp -oStrictHostKeyChecking=no deployment-frontend.yaml ${k8s_host_remote}:/home/ubuntu/"
                    echo "ejecuto bien remoto"
                    sh "ssh ${k8s_host_remote} pwd"
                    sh "ssh ${k8s_host_remote} kubectl apply -f deployment-frontend.yaml"
                }
            }
        }

    }
}