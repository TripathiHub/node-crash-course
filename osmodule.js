const os = require("os");
console.log(os.freemem());
console.log(os.homedir());
console.log(os.hostname());
console.log(os.platform());    // win32, linux, darwin
console.log(os.arch());        // x64, arm64
console.log(os.type());        // Operating system type
console.log(os.uptime());      // Seconds since system started
console.log(os.cpus());        // CPU information
