const fs = require("fs");
const path = require("path");
const pixelmatch = require("pixelmatch").default;
const { PNG } = require("pngjs");

class VisualRegression {

    constructor() {

        this.baselineDir = path.join(__dirname, "..", "screenshots", "baseline");
        this.currentDir = path.join(__dirname, "..", "screenshots", "current");
        this.diffDir = path.join(__dirname, "..", "screenshots", "diff");

        // Buat folder diff jika belum ada
        if (!fs.existsSync(this.diffDir)) {
            fs.mkdirSync(this.diffDir, { recursive: true });
        }
    }

    compareImages(fileName) {

        const baselinePath = path.join(this.baselineDir, `${fileName}.png`);
        const currentPath = path.join(this.currentDir, `${fileName}.png`);
        const diffPath = path.join(this.diffDir, `${fileName}.png`);

        const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
        const current = PNG.sync.read(fs.readFileSync(currentPath));

        const { width, height } = baseline;

        const diff = new PNG({ width, height });

        const mismatch = pixelmatch(
            baseline.data,
            current.data,
            diff.data,
            width,
            height,
            {
                threshold: 0.1
            }
        );

        if (mismatch > 0) {
            fs.writeFileSync(diffPath, PNG.sync.write(diff));
        }

        return mismatch;
    }

}

module.exports = new VisualRegression();