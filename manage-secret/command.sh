* Create secret: `kubectl create secret generic media --from-file=/opt/media.txt`
* Create pod : `kubectl apply -f pod.yaml`
* Check if pod is running: `kubectl get pod`
* Get into container: `kubectl exec --stdin --tty secret-nautilus -- /bin/bash`
* Check file contains: `cat /opt/games/media.txt`
