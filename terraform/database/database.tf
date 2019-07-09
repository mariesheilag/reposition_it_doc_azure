provider "azurerm" {
    version         = "1.28.0"
    client_id       = "${var.client_id}"
    client_secret   = "${var.client_secret}"
    tenant_id       = "${var.tenant_id}"
    subscription_id = "${var.subscription_id}"
}
resource "azurerm_postgresql_server" "ing_reposition_it" {
  name                = "${var.resource_prefix}-postgresql"
  location            = "${var.location}"
  resource_group_name = "${var.resource_group_name}"

  sku {
    name     = "B_Gen5_2"
    capacity = 2
    tier     = "Basic"
    family   = "Gen5"
  }

  storage_profile {
    storage_mb            = 51200
    backup_retention_days = 7
    geo_redundant_backup  = "Disabled"
  }

  administrator_login          = "psqladmin"
  administrator_login_password = "IngRIt@123"
  version                      = "10"
  ssl_enforcement              = "Enabled"
}