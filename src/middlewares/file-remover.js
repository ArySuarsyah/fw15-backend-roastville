import fs from "fs"

const fileRemover = (file) => {
    if(file){
        const filename = `upload/${file.filename}`
        fs.unlink(filename, (err)=>{
            if(err){
                throw Error(err.message)
            }
        })
    }
}

export default fileRemover;
