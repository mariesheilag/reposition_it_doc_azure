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

variable "location" {
    description = "SouthEast Asia (Singapore)"
}
variable "resource_group_name" {
    description = "Resource group name that will contain various resources"
}
variable "resource_prefix" {
    description = "Resource Prefix that will be used for the name"
}
variable "vnet_cidr" {
    description = "CIDR block for Virtual Network"
}