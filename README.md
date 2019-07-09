# reposition_it_doc_azure

AZURE VIRTUAL NETWORK:

Run Terraform to spin up Virtual Network:
  
  -- terraform init
  -- terraform plan -var-file vnet.tfvars
  -- terraform apply -var-file vnet.tfvars

AZURE KUBERNETES SERVICE:

Run Terraform to spin up infrastructure for Kubernetes Cluster.

  -- terraform init
  -- terraform plan -var-file cluster.tfvars
  -- terraform apply -var-file cluster.tfvars
 
AZURE DEVOPS:

Setup Azure DevOps to deploy application to AKS: 
  Check pipeline code.
 

  
