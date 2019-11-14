/** 
 * @description //创建初始化模板 
*/
const fs = require('fs');
const Path = require('path');
const colors = require('colors');
const readline = require('readline');
const { spawn } = require('child_process');
const platform = require('os').platform();
const open = [].slice.apply(process.argv,[2,3])[0] === '--open';

const resolve = dir => {
    return Path.join(__dirname, dir);
};

const config = {
    projectsPath: 'src/views/',
    templatePath: 'src/views/template/template'
}

let argvPath, copyPath, createPaths, name, upperName;

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
class cPage {
    constructor() {

    }

    init() {
        rl.question("请输入创建页面（例：audit/order）：",(answer) => {
            let reg = /^\w*\/\w*$/;
            if(reg.test(answer)) {
                argvPath = answer;
                copyPath = resolve(config.projectsPath + argvPath);
                createPaths = argvPath.split('/');
                name = createPaths[createPaths.length - 1]; 
                upperName = name.charAt(0).toUpperCase() + name.slice(1);
                this.existsCreate();
                this.exists(resolve(config.templatePath), copyPath, this.copyReadDir);
                this.success();
            }else{
                console.log("错误：页面路径错误".red);
                rl.close();
            }
        });
    }

    exists(src, dst, callback) { //测试路径下文件夹是否存在
        fs.exists(dst,(exist) => {
            if(exist){ //存在
                return callback(src, dst);
            }
            //不存在
            fs.mkdir(dst,(err) => {
                if(err){
                    throw err;
                }
                callback(src, dst)
            })
        })
    }

    existsCreate() { // 创建初始文件
        let createPath = resolve(config.projectsPath);
        let length = createPaths.length;
        createPaths.forEach((item,index) => {
            createPath = Path.join(createPath,item);
            if(!fs.existsSync(createPath)) {
                fs.mkdirSync(createPath)
            }else if(index === length - 1) {
                console.log('错误：文件已存在,请重新创建'.red);
                process.exit(0); 
            }
        })
    }

    copyReadDir(src, dst) { //复制
        let paths = fs.readdirSync(src);
        paths.forEach((path,index) => {
            let _src = src + '/' + path;
            let _dst = dst + '/' + path;
            let stats = fs.statSync(_src);
            if(stats.isFile()) {
                let file = fs.readFileSync(_src,'utf8');
                let  result = file.replace(/replace-name/g, name).replace(/replace-upper-name/g,upperName);
                fs.writeFileSync(_dst, result, 'utf8');
            }else if(stats.isDirectory()){
                this.exists(_src, _dst, this.copyReadDir);
            }
        })
    }

    success() {
        if(open) {
            console.log('模板创建成功，目录为：' + copyPath.green );
            console.log('项目正在启动...'.yellow);
            spawn(platform === "win32" ? "npm.cmd" : "npm", ['run','serve'], {
                stdio: 'inherit'
            });
        }else {
            console.log('模板创建成功，目录为：' + copyPath.green );
        }
        rl.close();
    }
}

const create = new cPage();
create.init();




