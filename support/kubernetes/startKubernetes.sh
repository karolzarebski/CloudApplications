kind delete cluster --name=kind
kind create cluster --config=kind-cluster.yaml
kind load docker-image production_frontend
kind load docker-image production_backend
kind load docker-image mysql:8.0.29
kubectl apply -f database.yaml
kubectl apply -f back.yaml
kubectl apply -f front.yaml