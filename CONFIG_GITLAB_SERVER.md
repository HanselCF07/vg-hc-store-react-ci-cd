# README GitLab: https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/README.md

# Installation of GitLab CE Server on Ubuntu Server:

	```bash
		sudo apt update
		sudo apt install -y curl openssh-server ca-certificates tzdata perl
		curl -s https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
		sudo apt install gitlab-ce
	```

# Configure Internal Domain (if you use ports, remember to enable them in the firewall). Edit `/etc/gitlab/gitlab.rb`  
# Do not use port 8080 since several internal GitLab services use it.

	```ruby
		external_url 'http://192.168.1.47:8181'
	```

# Configure GitLab

	```bash
		sudo gitlab-ctl reconfigure
	```

# Optional (Use Nginx as reverse proxy)
	Keep GitLab listening on an internal port (8181).  
	Configure your Nginx to serve your page at `/` and GitLab at `/gitlab` or another subdomain.

	Example Nginx block:

	```nginx
		server {
			listen 80;
			server_name 192.168.1.47; # or via DNS: gitlab.local;

			location / {
				root /var/www/html;
				index index.html;
			}

			location /gitlab {
				proxy_pass http://127.0.0.1:8181;
				proxy_set_header Host $host;
				proxy_set_header X-Real-IP $remote_addr;
				proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
				proxy_set_header X-Forwarded-Proto $scheme;
			}
		}
	```

# User Configuration
	- Admin: created at startup (root).  
	- Dev User: create from the web interface, assign Developer role in the project.

# Repository Configuration
	- Create groups, example: "front-end", "back-end"  
	- Create projects, example: "vg-hc-store-react", "vg-store-java-spring"  
	- Create branches, example: "integration-qas", "development", and "main" (production)

	- (Optional) Protect the "integration-qas" branch; "main" is protected by default.

# Register and Configure GitLab Runner (the agent that executes jobs. Docker, Kubernetes).  
# Install GitLab Runner

	```bash
		curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | sudo bash
		sudo apt-get install gitlab-runner -y
		gitlab-runner --version
	```

## Configure Runner in GitLab CE Server, obtain registration token (we’ll use shell executor to run native scripts):

	Go to GitLab → *Settings* → *CI/CD* → *Runners* → *Set up a specific runner manually*.

## Configure runner created on application server (Docker-Kubernetes):

	```bash
		gitlab-runner register
		--url http://192.168.1.47:8181  
		--token glrt-B1acjooK5VMzwZom_pvM-G86MQp0OjEKdToxCw.01.121q7oxxg
	```

	- Description, example: `minikube-runner`  
	- Tags: minikube-runner  
	- Executor: choose `shell` (so it will directly use Docker and kubectl from your server).

## Verify runner on application server

	```bash
		sudo gitlab-runner list
	```

	Remember to configure the entire environment of your application server for the `gitlab-runner` user created during installation.

	Switch to gitlab-runner user:

	```bash
		su - gitlab-runner
	```

	If it asks for a password, assign one to the `gitlab-runner` user using root.

## Verify runner access to Docker:

	```bash
		sudo -u gitlab-runner docker info
	```

	If issues arise:
	1. Check Docker group:
		```bash
			ls -l /var/run/docker.sock
		```
	Example output:
		```
			srw-rw---- 1 root docker 0 Apr  1 14:00 /var/run/docker.sock
		```
	→ Socket belongs to `docker` group.


	2. Add `gitlab-runner` to docker group:
		```bash
			sudo usermod -aG docker gitlab-runner
		```

	3. Restart service/session:
	- If installed as service:
		```bash
			sudo systemctl restart gitlab-runner
		```
	- If running as user: log out and back in.


	4. Test again:
		```bash
			sudo -u gitlab-runner docker info
		```

	Now it should show daemon info without permission errors.

## Verify runner access to Minikube (ensure Minikube is running):

	```bash
		sudo -u gitlab-runner kubectl get pods  # optional -n for specific namespace
	```

	If certificate issues occur:
		```bash
			minikube start --embed-certs
			sudo mkdir -p /home/gitlab-runner/.kube
			sudo cp ~/.kube/config /home/gitlab-runner/.kube/
			sudo chown -R gitlab-runner:gitlab-runner /home/gitlab-runner/.kube
		```

## Configure namespaces:

	```bash
		kubectl create namespace development
		kubectl create namespace integration-qas
		kubectl create namespace main
	```

# Configure Authentication Runner:
	Obtain **authentication token** in GitLab CE:  
	GitLab → *Settings* → *CI/CD* → *Runners* → *Set up a specific runner manually*.  
	(Same steps as registration token. Both runners are needed: one for registration, one for authentication.)

# Register `$CI_REGISTRY_IMAGE` variable:
	- Go to your project → **Settings → CI/CD → Variables**  
	- Create variable `CI_REGISTRY_IMAGE` with your registry image value.  

	Example:
	```
		registry-gitlab-front-end-vg-hc-store-react
	```

	- This variable defines the Docker image name for your project and must match your Kubernetes deployment.  
	- Mark as *protected* if only used in protected branches.

# Note: For these exercises we use Minikube, but for production you should use environments that guarantee high availability, security, and scalability (which Minikube cannot provide).

	1. **Managed Services (most common)**  
		- GKE: advanced autoscaling and ease of use.  
		- Amazon EKS: best if you already use AWS infrastructure.  
		- Azure AKS: preferred for Microsoft ecosystem users.

	2. **On-Premise Kubernetes**  
		- Kubeadm: official tool for production clusters.  
		- K3s: lightweight, certified, ideal for limited resources or edge computing.  
		- OpenShift: enterprise-grade with added security and support.

# In this example we use the React front-end project configured in the previous article.  
	Check pipeline configuration in:
	```
		.gitlab-ci.yml
	```

# To inject environment variables, create a file named after each branch (development, integration-qas, main) in an organized path on your application server.  
	Define variable `ENV_PATH` in the pipeline to inject the file before building the Docker image. (You can also configure a secret variable in GitLab CI/CD.)

	Example:
		```
			ENV_PATH: "/home/gitlab-runner/enviroment/front-end/vg-hc-store-react/${CI_COMMIT_REF_NAME}/.env"
		```

# Don’t forget to enable ingress in Minikube:

	```bash
		minikube addons enable ingress
	```


