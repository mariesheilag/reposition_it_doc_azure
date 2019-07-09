variable "client_id" {
    description = "Client ID for Application Created in Azure AD"
}
variable "client_secret" {
    description = "Client secret for Application Created in Azure AD"
}
variable "tenant_id" {
    description = "Tenant ID for Application Created in Azure AD"
}
variable "subscription_id" {
    description = "Subscription ID (ING) for Application Created in Azure AD"
}
variable "resource_prefix" {
    description = "Resource Prefix that will be used for the name"
}
variable "dev_subnet_cidr" {
    description = "Subnet Range for K8s Cluster"
}
variable "vnet_name" {
    description = "Virtual Network of K8s Cluster"
}
variable "location" {
    description = "Kubernetes Location"
}
variable "dns_prefix" {
    description = "DNS of the Cluster"
}
variable "node_count" {
    description = "Cluster Node Count"
}
variable "log_analytics_workspace_location" {
    description = "Log Analytic Workspace Location"
}
variable log_analytics_workspace_sku {
    default = "PerGB2018"
}
variable "ssh_public_key" {
    default = "~/.ssh/id_rsa.pub"
}


