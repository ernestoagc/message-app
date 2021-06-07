# FORM APP - ANGULAR

#### **1.  Docker Image**
I build the image docker: docker build -t ernestoagc/message-app:0.1 .

#### **2. Running frontend application**
I going to use a docker container, to create this we can do with this command:
docker run -p 8082:80 -d  --network fplusf-net  --name=app-message ernestoagc/message-app:0.1

Finally, we can use the application with the url: http://localhost:8082/

![](https://i.imgur.com/4IBq83M.jpg)



#### **5. demo**
I've deploy these application on firebase. you can visit the demo: 
https://messageapp-b7aa7.web.app