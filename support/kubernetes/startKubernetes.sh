kind delete cluster --name=kind
kind create cluster --config=kind-cluster.yaml
kind load docker-image production_frontend
kind load docker-image production_backend
kind load docker-image mysql:8.0.29
kubectl apply -f front.yaml
kubectl apply -f database.yaml
echo Waiting 60 seconds for db to set up...
ping -n 60 127.0.0.1 >nul
kubectl apply -f back.yaml