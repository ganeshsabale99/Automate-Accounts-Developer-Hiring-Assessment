class Receipt {
    constructor(id, purchasedAt, merchantName, totalAmount, filePath, createdAt, updatedAt) {
        this.id = id;
        this.purchasedAt = purchasedAt;
        this.merchantName = merchantName;
        this.totalAmount = totalAmount;
        this.filePath = filePath;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = Receipt;
