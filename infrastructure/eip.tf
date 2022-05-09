resource "aws_eip" "Reddint_EIP" {
    tags = {
        Name = "Reddint_EIP"
    }
}

resource "aws_eip_association" "Reddint_EIP_Association" {
    association_id = aws_eip.Reddint_EIP.id
    instance_id = aws_instance.Reddint_Instance.id

    tags = {
        Name = "Reddint_EIP_Association"
    }
}