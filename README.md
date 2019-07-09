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
 
 
 References:
  -- https://www2.linuxacademy.com/howtoguides/20146-a-complete-azure-environment-with-terraform/
  -- https://blogs.msdn.microsoft.com/wushuai/2018/12/02/get-started-with-aks-ci-cd-in-azure-devops/
  -- https://vincentlauzon.com/2018/09/06/aks-with-kubenet-vs-azure-networking-plug-in/
  -- https://docs.microsoft.com/en-us/azure/aks/static-ip
  -- https://medium.com/@aulin/letsencrypt-tls-certificates-on-aks-azure-kubernetes-service-cluster-using-cert-manager-and-6ee445e7ff9
  -- https://github.com/fbeltrao/aks-letsencrypt/blob/master/setup-wildcard-certificates-with-azure-dns.md
  -- https://medium.com/@matthewleak/deploying-a-static-website-to-azure-storage-using-azure-devops-fa0bed457d07
  -- https://microsoft.github.io/PartsUnlimited/configmgmt/200.4x-ConfigMgmt-CDwithWindowsContainersandVSTS.html
  -- https://github.com/dotnet-architecture/eShopModernizing/wiki/06.-Deploying-your-Windows-Containers-based-app-into-Azure-VMs-(Including-CI-CD)
  -- https://azure.microsoft.com/en-us/solutions/architecture/cicd-for-azure-vms/
  -- https://docs.microsoft.com/en-us/azure/virtual-machines/linux/build-image-with-packer
  -- https://devblogs.microsoft.com/devops/deploying-applications-to-azure-vm-scale-sets/
  -- https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/tutorial-use-custom-image-cli
  -- https://developercommunity.visualstudio.com/content/problem/326433/no-artifacts-are-available-in-the-build.html
  -- https://docs.microsoft.com/en-us/azure/virtual-machines/windows/network-overview
