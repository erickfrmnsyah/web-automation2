const path = require("path");
const fs = require("fs");

class ScreenshotPage {

    constructor(driver) {
        this.driver = driver;
        this.screenshotDir = path.join(__dirname, "..", "..", "screenshots","current");
    }

    async takeFullScreenshot(fileName) {

        // Membuat folder screenshots jika belum ada
        if (!fs.existsSync(this.screenshotDir)) {
            fs.mkdirSync(this.screenshotDir, { recursive: true });
        }

        // Mengganti karakter yang tidak boleh digunakan sebagai nama file
        const safeFileName = fileName.replace(/[<>:"/\\|?*]/g, "_");

        // Menentukan lokasi penyimpanan
        const filePath = path.join(
            this.screenshotDir,
            `${safeFileName}.png`
        );

        // Mengambil screenshot
        const image = await this.driver.takeScreenshot();

        // Menyimpan screenshot
        fs.writeFileSync(filePath, image, "base64");
    }

}

module.exports = ScreenshotPage;