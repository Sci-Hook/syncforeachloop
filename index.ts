export {};

declare global {
    interface Array<T> {
        syncForEach(any,ending_function?): Array<T>;
    }
}

Array.prototype.syncForEach = function<T>(this: T[], callback: any,ending_function?:any): any {
    return new Promise<any>((resolve, reject) => {
        let index = -1;
        let resolved = false

        const next = () => {
            index++;     
            if (this.length > index) {
                if (this.length > 0) {
                    callback(this[index], next, index+1, this.length,finish);
                }
            }else{
                if (!resolved) {
                    resolve(ending_function ? ending_function : true);
                    if (ending_function) ending_function();
                }
            }
        }

        const finish = () => {
            resolved = true;
            index = this.length;
            resolve(ending_function ? ending_function : true);
            if (ending_function) ending_function();
        }

        next();
    });
}


let test = ['a','b','c','d'];

async function main() {
    await test.syncForEach(function (item,next,i,l,finish) {
        console.log(item);
        if (i == 2) {
            finish();  
        }
        next();
    },() => {
        console.log('ben');
    });
}


main();
