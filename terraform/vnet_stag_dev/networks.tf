provider "azurerm" {
    version         = "1.28.0"
    client_id       = "${var.client_id}"
    client_secret   = "${var.client_secret}"
    tenant_id       = "${var.tenant_id}"
    subscription_id = "${var.subscription_id}"
}
### resource group
resource "azurerm_resource_group" "ing_reposition_rg"{

    name            = "${var.resource_group_name}"
    location        = "${var.location}"
}

### virtual network
resource "azurerm_virtual_network" "ing_reposition_dev_vnet" {
    name                = "${var.resource_prefix}-vnet"
    location            = "${var.location}"
    resource_group_name = "${azurerm_resource_group.ing_reposition_rg.name}"
    address_space       = ["${var.vnet_cidr}"]
}