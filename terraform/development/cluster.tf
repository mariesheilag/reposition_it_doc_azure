provider "azurerm" {
    version         = "1.28.0"
    client_id       = "${var.client_id}"
    client_secret   = "${var.client_secret}"
    tenant_id       = "${var.tenant_id}"
    subscription_id = "${var.subscription_id}"
}

resource "azurerm_resource_group" "ing_reposition_rg_dev"{

    name            = "${var.resource_prefix}-dev-rg"
    location        = "${var.location}"
}

resource "azurerm_subnet" "ing_reposition_subnet_k8s_dev" {
    name                 = "${var.resource_prefix}-dev-k8s-subnet"
    resource_group_name  = "${var.resource_prefix}"
    virtual_network_name = "${var.vnet_name}"
    address_prefix       = "${var.dev_subnet_cidr}"
}
resource "azurerm_kubernetes_cluster" "ing_reposition_it_dev_k8s" {
    name                = "${var.resource_prefix}-dev"
    location            = "${var.location}"
    resource_group_name = "${azurerm_resource_group.ing_reposition_rg_dev.name}"
    dns_prefix          = "${var.dns_prefix}"

    linux_profile {
        admin_username = "ubuntu"
        ssh_key {
            key_data = "${file("${var.ssh_public_key}")}"
        }
    }

    agent_pool_profile {
        name            = "agentpool"
        count           = "${var.node_count}"
        vm_size         = "Standard_B2s"
        os_type         = "Linux"
        os_disk_size_gb = 30
        vnet_subnet_id  = "${azurerm_subnet.ing_reposition_subnet_k8s_dev.id}"
    }

    service_principal {
        client_id     = "${var.client_id}"
        client_secret = "${var.client_secret}"
    }   

    network_profile {
        network_plugin = "azure"

    }

    role_based_access_control {
        enabled = true
    }

    addon_profile {
        oms_agent {
        enabled                    = true
        log_analytics_workspace_id = "${azurerm_log_analytics_workspace.ing_reposition_it_dev_logs_analytics_workspace.id}"
        }
    }
}

resource "azurerm_log_analytics_workspace" "ing_reposition_it_dev_logs_analytics_workspace" {
    name                = "${var.resource_prefix}-analytics-workspace"
    location            = "${var.log_analytics_workspace_location}"
    resource_group_name = "${azurerm_resource_group.ing_reposition_rg_dev.name}"
    sku                 = "${var.log_analytics_workspace_sku}"
}

resource "azurerm_log_analytics_solution" "ing_reposition_it_dev_log_solution" {
    solution_name         = "ContainerInsights"
    location              = "${azurerm_log_analytics_workspace.ing_reposition_it_dev_logs_analytics_workspace.location}"
    resource_group_name   = "${azurerm_resource_group.ing_reposition_rg_dev.name}"
    workspace_resource_id = "${azurerm_log_analytics_workspace.ing_reposition_it_dev_logs_analytics_workspace.id}"
    workspace_name        = "${azurerm_log_analytics_workspace.ing_reposition_it_dev_logs_analytics_workspace.name}"

    plan {
        publisher = "Microsoft"
        product   = "OMSGallery/ContainerInsights"
    }
}
resource "azurerm_container_registry" "ing_reposition_it_dev_acr" {
  name                     = "ingrepositiondev"
  resource_group_name      = "${azurerm_resource_group.ing_reposition_rg_dev.name}"
  location                 = "${var.location}"
  sku                      = "Standard"
  admin_enabled            = true
}

