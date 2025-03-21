class ReceiptFile {
    constructor(id, fileName, filePath, isValid, invalidReason, isProcessed, createdAt, updatedAt) {
        this.id = id;
        this.fileName = fileName;
        this.filePath = filePath;
        this.isValid = isValid;
        this.invalidReason = invalidReason;
        this.isProcessed = isProcessed;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = ReceiptFile;
