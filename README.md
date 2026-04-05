
# vg-hc-store-react
Example FrontEnd with Node 22.15.0 and React VITE v6.4.1

# Build the image 
    docker build --no-cache -t vg-hc-store-react:v1 .

# Init Minikube
    minikube start --driver=docker

# View images uploaded to minikube
    minikube image ls

# Upload the image directly to the cluster (without registry)
    minikube image load vg-hc-store-react:v1  # Si usas Minikube
    
    kind load docker-image vg-hc-store-react:v1 # Si usas Kind

# Create Deployment, Service and Ingress
    kubectl apply -f k8s-configmap.yaml
    kubectl apply -f k8s-deployment.yaml
    kubectl apply -f k8s-service.yaml
    kubectl apply -f k8s-ingress.yaml

# Activar el Ingress Controller (minikube)
    minikube addons enable ingress

