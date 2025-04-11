variable "resource_group_name" {}
variable "location" {}
variable "storage_account_name" {}

# Nova variável para o subscription_id
variable "subscription_id" {
  description = "ID da assinatura do Azure"
  type        = string
}