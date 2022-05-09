resource "aws_security_group" "Reddint_SG" {
  name        = "Reddint_SG"
  description = "Reddint_SG"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

}

resource "aws_instance" "Reddint_Instance" {
  ami             = "ami-09d56f8956ab235b3"
  instance_type   = "t2.micro"
  security_groups = [aws_security_group.Reddint_SG.id]

  user_data = <<-EOF
    #!/bin/bash
    apt-get update
    apt-get install ca-certificates curl gnupg lsb-release
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    sudo groupadd docker
    sudo usermod -aG docker $USER
    newgrp docker 

    docker run -d \
    --name watchtower \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower --cleanup --interval 120

    #Run backend
    docker run -d \
    --name reddint \
    -p 3000:3000 \
    mustybatz/reddint-backend:latest

    EOF

  tags = {
    Name = "Reddint_Instance"
  }
}

